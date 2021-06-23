import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../components/Logo.js";
import History from "../components/History.js";

const Wallet = (props) => {
  return (
    <div className="wallet">
      <div className="wLogo">
        <Logo scale={0.35} />
      </div>
      <div className="curBalance">
        <h2>Current balance</h2>
        <h1>
          {props.transactions ? props.transactions.summary.balance.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") : null}
          <span id="curency">RSD</span>
        </h1>
      </div>
      <div className="walletButtons">
        <NavLink to="/income">
          <div className="income">
            Add an income
            <button>+</button>
          </div>
        </NavLink>
        <NavLink to="/expenses">
          <div className="expenses">
            Add an expenses
            <button>+</button>
          </div>
        </NavLink>
      </div>
      <div className="history">
        <h3>History</h3>
        {props.transactions
          ? props.transactions.history
              .sort((a, b) => new Date(b.created) - new Date(a.created))
              .map((d) => <History data={d} key={d.id} outcome={props.outcome} income={props.income} />)
          : null}
      </div>
    </div>
  );
};
export default Wallet;
