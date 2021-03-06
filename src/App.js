import React, {useState, useEffect} from "react";
import {BrowserRouter, Route} from "react-router-dom";
import Login from "./screens/LogIn.js";
import Wallet from "./screens/Wallet.js";
import Expenses from "./screens/Expenses.js";
import Income from "./screens/Income.js";
import Navigation from "./components/Navigation.js";
import More from "./screens/More.js";
import AuthService from "./services/auth-service.js";
import Stats from "./screens/Stats";
import Register from "./screens/Register";

const App = () => {
    const [authenticated, setAuthentication] = useState();
    const [outcome, setoutcome] = useState();
    const [income, setoIncome] = useState();
    const [transactions, setTransactions] = useState();

    const outcomeCat = () => {
        AuthService.fetchOutcome().then((res) => {
            setoutcome(res.data);
        });


    };
    const incomeCat = () => {
        AuthService.fetchIncome().then((res) => {
            setoIncome(res.data);
        });

    };

    const transactionsHistory = () => {
        AuthService.fetchHistory().then((res) => {
            let transactions = {history: res.data.transactions, summary: res.data.summary}
            setTransactions(transactions);
        });

    };

    useEffect(() => {
        let parsedUser = localStorage.getItem("user");
        setAuthentication(parsedUser !== null ? JSON.parse(parsedUser) : undefined);
        setTimeout(() => {
            if (parsedUser !== null ) {
                outcomeCat();
                incomeCat();
                transactionsHistory();
            }

        })

    }, []);

    return (
        <BrowserRouter>
            <div className="container">
                <Route path="/" exact>
                    {authenticated ? <Wallet transactions={transactions} outcome={outcome} income={income}/> : <Login/>}
                </Route>
                {!authenticated ? (
                    <Route path="/login">
                        <Login/>
                    </Route>
                ) : null}
                {!authenticated ? (
                    <Route path="/register">
                        <Register/>
                    </Route>
                ) : null}
                <Route path="/income">
                    <Income income={income}/>
                </Route>
                <Route path="/expenses">
                    <Expenses outcome={outcome}/>
                </Route>
                <Route path="/stats">
                    <Stats/>
                </Route>
                <Route path="/more">
                    <More/>
                </Route>
                {authenticated ? <Navigation/> : null}
            </div>
        </BrowserRouter>
    );
};

export default App;
