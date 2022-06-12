import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import Logo from "../components/Logo.js";
import AuthService from "../services/auth-service.js";
import LoadingSpinner from "../shared/LoadingSpinner";
import toast, { Toaster } from 'react-hot-toast';


const Register = () => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState({});
    const [loaded, isLoading] = useState(false)
    let history = useHistory();

    const notify = () => {
        toast('Account successfully created')
    };
    const getUsername = (e) => {
        setUsername(e.target.value)
        setError({username: ""})
    }
    const getPassword = (e) => {
        setPassword(e.target.value)
        setError({password: ""})
    }
    const onRegister = () => {


        if (username && password) {
            const payload = {
                username: username,
                password: password,
            };
            AuthService.register(payload).then(
                (res) => {
                    localStorage.setItem("user", JSON.stringify(res.data));
                    notify()
                    setTimeout(()=>{
                        history.push("/login");
                    }, 800)

                    // history.go("/login");
                },
                (error) => {
                    setError({error: "Username or password has been already taken"})
                }
            );
        } else if (!username) {
            setError({username: "Please fill all required fields"})
        } else if (!password) {
            setError({password: "Please fill all required fields"})
        }

    };
    useEffect(() => {
        setTimeout(() => {
            isLoading(true)

        }, 500)
    }, [])
    return (

        <div className="logIn">
            {loaded ?
                <>
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
                    <button className="btnGreen" onClick={onRegister}>
                        Register
                    </button>
                    {" "}</> : <LoadingSpinner/>
            }
            <Toaster />

        </div>


    );
};

export default Register;
