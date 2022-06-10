import React, {useEffect, useState} from "react";
import Logo from "../components/Logo";
import Arrow from "../icons/arrow_back_ios_black_24dp 1.png";
import AuthService from "../services/auth-service";

const Stats = () => {
    const [stats, setStats] = useState();
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const amountStr = (value) => {
        return value?.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
    }
    const monthNames = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'June',
        'July',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ];
    const getStats = (month) => {
        AuthService.fetchStatistics(month).then((res) => {
            setStats(res.data)
        })
    }
    const previousMonth = () => {
        setMonth(month - 1)
        getStats(month - 1);
    }
    const nextMonth = () => {
        const curMonth = new Date().getMonth();
        if (month <= curMonth) {
            setMonth(month + 1)
            getStats(month + 1);
        }

    }
    useEffect(() => {
        getStats(month);
    }, [month]);
    return (
        <div className="stats">
            <div className="wLogo">
                <Logo scale={0.35}/>
            </div>
            <div className="navStatsWrapper">
                <div className="monthStats">
                    {monthNames[month - 1]} <span className="statsYear">2022</span>
                </div>
                <div className="navStats">
                    <img src={Arrow} alt="arrow" onClick={nextMonth}></img>
                    <img src={Arrow} className="arrowRot" alt="arrow" onClick={previousMonth}></img>
                </div>
            </div>

            <div className="totalStats">
                Total in {monthNames[month - 1]}
                <div style={{marginTop: "0.5rem"}}>
                    <span style={{
                        color: "rgba(94, 156, 96, 1)",
                        fontSize: 30,
                        marginRight: 4
                    }}>{amountStr(stats?.income - stats?.outcome)}</span>
                    <span style={{color: "rgba(94, 156, 96, 1)", fontSize: 15}}>RSD</span>
                </div>

            </div>
            <div className="boxesContainer">
                <div className="expensesBox">
                    Expenses
                    <span
                        style={{fontSize: 20}}>{amountStr(stats?.outcome)}
                        <span style={{fontSize: 12}}>RSD</span></span>
                </div>
                <div className="incomeBox">
                    Income
                    <span style={{
                        color: "rgba(94, 156, 96, 1)",
                        fontSize: 20
                    }}>{amountStr(stats?.income)} <span
                        style={{fontSize: 12}}>RSD</span></span>

                </div>
            </div>
            <div className="mostSpent">
                Most spent on
                <div className="statsItemContainer">
                    {stats?.by_category.filter(n=> n.category_name !== "Salary" &&  n.category_name !== "Other").map(i =>
                        <div key={i.id_category} className="statsItem">
                            {i.category_name}
                            <span  style={{
                                color: "rgba(0, 0, 0, 1)",
                                fontSize: 16,
                                marginTop: "1rem"
                            }}>{amountStr(i.amount)}</span>
                            <span  style={{color: "rgba(0, 0, 0, 0.6)", fontSize: 10}}>RSD</span>
                            <div  className="statsIcon">
                                <img src={`https://budgetapp.digitalcube.rs/assets/icons/categories/${i.category_icon}`}
                                     alt={i.category_icon+ month+4}></img>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>

    )

};

export default Stats;
