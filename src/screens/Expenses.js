import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import Arrow from "../icons/arrow_back_ios_black_24dp 1.png";
import Category from "../components/Category.js";
import AuthService from "../services/auth-service.js";

const Expenses = (props) => {
  const [outcomeValues, setValues] = useState();
  let history = useHistory();
  const reciveProps = (props) => {
    setValues({ ...outcomeValues, category: props, currency: "RSD" });
  };
  const onSubmint = () => {
    const payload = outcomeValues;

    AuthService.fetchNewTransaction(payload).then(
      (res) => {
        console.log(res);

        history.push("/");
        history.go("/");
      },
      (error) => {
        console.log(error.message);
      }
    );
  };

  const btnStyle = { overflow: "hidden", position: "fixed", bottom: 100, left: 16, width: "90%" };

  return (
    <div className="expensesScr">
      <div className="expensesHead">
        <NavLink to="/">
          <img src={Arrow} alt="arrow"></img>
        </NavLink>
        <h2>Add an expense</h2>
      </div>
      <div className="inputForm">
        <input
          placeholder="Enter amount here"
          type="number"
          onChange={(e) => setValues({ ...outcomeValues, amount: parseInt(e.target.value) })}
          required
        ></input>
        <input
          placeholder="Enter description"
          type="text"
          onChange={(e) => setValues({ ...outcomeValues, description: e.target.value })}
          required
        ></input>
      </div>
      <div className="expCategory">
        <h2>Choose category</h2>
        {props.outcome ? props.outcome.map((d) => <Category data={d} reciveProps={reciveProps} key={d.id} />) : null}
      </div>
      {!outcomeValues ? null : Object.keys(outcomeValues).length === 4 ? (
        <button className="btnGreen" style={btnStyle} onClick={onSubmint}>
          Add an expense
        </button>
      ) : null}
    </div>
  );
};

export default Expenses;
