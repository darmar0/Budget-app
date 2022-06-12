import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import Logo from "../components/Logo.js";
import AuthService from "../services/auth-service.js";

const LogIn = () => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState({});
    let history = useHistory();

    const getUsername = (e) => {
        setUsername(e.target.value)
        setError({username: ""})
    }
    const getPassword = (e) => {
        setPassword(e.target.value)
        setError({password: ""})
    }
    const onLogin = () => {
        if (username && password) {
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
                    setError({error: "Wrong username or password"})
                }
            );
        } else if (!username) {
            setError({username: "Please fill all required fields"})
        } else if (!password) {
            setError({password: "Please fill all required fields"})
        }

    };
    const onRegister = () => {
        history.push("/register");
    }
    return (
        <div className="logIn">
            <Logo scale={0.6}/>
            <h2>Welcome to Budget App</h2>
            <h4>Fill in the fields to continue</h4>
            <span style={{color: "red", fontSize: 10, paddingTop: 5}}>{error["error"]}</span>

            <div className="inputForm">
                <input placeholder="Username*" type="text" onChange={(e) => getUsername(e)}></input>
                <span style={{color: "red", fontSize: 10, paddingTop: 5}}>{error["username"]}</span>
                <input placeholder="Password*" type="password" onChange={(e) => getPassword(e)}></input>
                <span style={{color: "red", fontSize: 10, paddingTop: 5}}>{error["password"]}</span>
            </div>
            <div className="left">
                <h5 id="pass">Forgot password?</h5>
            </div>
            <button className="btnGreen" onClick={onLogin}>
                Log in
            </button>
            <h5>
                Don’t have an account? <span id="reg" onClick={onRegister}>Register</span>
            </h5>{" "}
        </div>
    );
};

export default LogIn;
