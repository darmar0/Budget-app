import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Wallet from "../icons/account_balance_wallet_black_24dp 1.png";
import Stats from "../icons/query_stats_black_24dp 1.png";
import More from "../icons/menu_black_24dp 1.png";
import WalletG from "../icons/green account_balance_wallet_black_24dp 2.png";
import StatsG from "../icons/green stats.png";
import MoreG from "../icons/green more.png";

const Navigation = () => {
  const [path, setPath] = useState("/");

  return (
    <div className="nav">
      <NavLink to="/" onClick={() => setPath("/")}>
        <div className="navItem">
          <img src={path === "/" ? WalletG : Wallet} alt="wallet"></img>
          <p style={path === "/" ? { color: "#5E9C60" } : null}>Wallet</p>
        </div>
      </NavLink>
      <NavLink to="/stats" onClick={() => setPath("/stats")}>
        <div className="navItem">
          <img src={path === "/stats" ? StatsG : Stats} alt="stats"></img>
          <p style={path === "/stats" ? { color: "#5E9C60" } : null}>Stats</p>
        </div>
      </NavLink>
      <NavLink to="/more" onClick={() => setPath("/more")}>
        <div className="navItem">
          <img src={path === "/more" ? MoreG : More} alt="more"></img>
          <p style={path === "/more" ? { color: "#5E9C60" } : null}>More</p>
        </div>
      </NavLink>
    </div>
  );
};

export default Navigation;
