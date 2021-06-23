import React from "react";
import Logout from "../icons/Hands Random Stuff.png";
import { useHistory } from "react-router-dom";
import AuthService from "../services/auth-service.js";

const More = () => {
  const btnStyle = { overflow: "hidden", position: "fixed", bottom: 100, left: 20, width: "90%" };

  let history = useHistory();
  const onLogOut = () => {
    AuthService.logout();
    localStorage.removeItem("user");
    history.push("/login");
    history.go("/login");
  };
  return (
    <div className="moreScr">
      <img src={Logout} alt="goodbay"></img>
      <h2>We hope Budget App has lived up to your expectations</h2>
      <p>Our main priority is to improve your budget</p>
      <button className="btnGreen" style={btnStyle} onClick={onLogOut}>
        Log out
      </button>
    </div>
  );
};

export default More;
