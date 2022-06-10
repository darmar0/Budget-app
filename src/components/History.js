import React from "react";

const History = (props) => {
  const outCat = props.outcome?.filter((i) => i.id === props.data.category)[0];
  const inCat = props.income?.filter((i) => i.id === props.data.category)[0];
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const date = props.data?.created.split("")[8] + props.data.created.split("")[9];
  const month = parseInt(props.data.created.split("")[5] + props.data.created.split("")[6]) - 1;

  return (
    <div className="item">
      <div className="dateIcon">
        <div className="date">
          <h2>{date}</h2>
          <h6 style={{ color: "rgba(0, 0, 0, 0.55)" }}>{monthNames[month]}</h6>
        </div>
        <div className="icon">
          <img src={`https://budgetapp.digitalcube.rs/assets/icons/categories/${props.data.icon_png}`} alt={props.data.name}></img>
        </div>
      </div>
      <div className="amount">
        <h5>{outCat ? outCat.name : inCat.name}</h5>
        <h2>
          {props.data.amount.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}{" "}
          <span style={{ color: "rgba(0, 0, 0, 0.55)" }}>RSD</span>
        </h2>
      </div>
    </div>
  );
};

export default History;
