import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import FormInput from "./InputForm";

function Login() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      label: "Username",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      label: "Password",
      required: true,
    },
  ];

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");

    AuthService.login(values.username, values.password).then(
      () => {
        navigate("/posts");
        window.location.reload();
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(resMessage);
      }
    );
  };

  return (
    <div className="background standard-card">
      <div className="col-md-12">
        {message && (
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
            {inputs.map((input) => (
              <FormInput
                key={input.id}
                {...input}
                value={values[input.name]}
                onChange={onChange}
              />
            ))}

            <div className="form-group login-button">
              <button
                onClick={handleLogin}
                type="submit"
                className="btn btn-dark shadow-none border-0 form-control mt-4"
              >
                Login
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;