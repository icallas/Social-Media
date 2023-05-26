import React, { useState } from "react";
import FormInput from "./InputForm";
import { isEmail } from "validator";
import AuthService from "../services/auth.service";

function Register() {
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
      label: "Username",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 3,
      name: "password",
      type: "password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&|*])[a-zA-Z0-9!@#$%^&|*]{8,20}$`,
      required: true,
    },
    {
      id: 4,
      name: "confirmPassword",
      type: "password",
      errorMessage: "Passwords don't match!",
      label: "Confirm Password",
      pattern: values.password,
      required: true,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  function handleRegister() {
    if (/[A-Za-z0-9]{3,16}/.test(values.username)
      && isEmail(values.email)
      && /(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&|*])[a-zA-Z0-9!@#$%^&|*]{8,20}/.test(values.password)
      && values.confirmPassword === values.password) {

      AuthService.register(values.username, values.email, values.password).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        });
    }
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="background standard-card">
      <div className="col-md-12">
        {message && !successful && (
          <div className="alertFrame">
            <div className="error_alert">
              <div className="closebtn" onClick={() => setMessage("")}>&times;</div>
              {message}
            </div>
          </div>
        )}
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <form onSubmit={handleSubmit} autoComplete="off">

            {!successful && (
              <div>
                {inputs.map((input) => (
                  <FormInput
                    key={input.id}
                    {...input}
                    value={values[input.name]}
                    onChange={onChange}
                  />
                ))}

                <div className="form-group">
                  <button
                    onClick={handleRegister}
                    type="submit"
                    className="btn btn-dark shadow-none border-0 form-control mt-4"
                  >
                    Register
                  </button>
                </div>
              </div>
            )}

            {message && successful && (
              <div className="form-group">
                <div className="alert alert-success">
                  {message}
                </div>
              </div>
            )}

          </form>
        </div>
      </div>
    </div>
  )
}

export default Register;