import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";

function Home() {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
        setLoading(false);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  if (loading) {
    return <div></div>
  }

  return (
    <div className="standard-card">
      <header className="card card-container align-center">
        <h5> {content} </h5>
      </header>
    </div>
  );
};

export default Home;