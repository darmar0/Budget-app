import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Logo from "../components/Logo.js";
import AuthService from "../services/auth-service.js";

const LogIn = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  let history = useHistory();

  const onLogin = () => {
    const payload = {
      username: username,
      password: password,
    };
    AuthService.login(payload).then(
      (res) => {
        localStorage.setItem("user", JSON.stringify(res.data));
        history.push("/");
        history.go("/");
      },
      (error) => {
        console.log(error.message);
      }
    );
  };
  return (
    <div className="logIn">
      <Logo scale={0.6} />
      <h2>Welcome to Budget App</h2>
      <h4>Fill in the fields to continue</h4>
      <div className="inputForm">
        <input placeholder="Username*" type="text" onChange={(e) => setUsername(e.target.value)}></input>
        <input placeholder="Password*" type="password" onChange={(e) => setPassword(e.target.value)}></input>
      </div>
      <div className="left">
        <h5 id="pass">Forgot password?</h5>
      </div>
      <button className="btnGreen" onClick={onLogin}>
        Log in
      </button>
      <h5>
        Don’t have an account? <span id="reg">Register</span>
      </h5>{" "}
    </div>
  );
};

export default LogIn;
