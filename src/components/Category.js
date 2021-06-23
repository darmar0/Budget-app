import React, { useState } from "react";

const Category = (props) => {
  const [radio, setRadio] = useState();

  const eventHandeler = (e) => {
    setRadio(e.target.value);
    props.reciveProps(e.target.value);
  };

  return (
    <div className="itemCat">
      <div className="descIcon">
        <div className="iconCat">
          <img src={`https://budgetapp.digitalcube.rs/assets/icons/categories/${props.data.icon_png}`} alt={props.data.name}></img>
        </div>
        <div className="desc">
          <h2>{props.data.name}</h2>
          <h6 style={{ color: "rgba(0, 0, 0, 0.55)" }}>{props.data.description}</h6>
        </div>
      </div>
      <div className="radioBtn">
        <label>
          <input
            value={props.data.id}
            type="radio"
            name="radio"
            onChange={(e) => eventHandeler(e)}
            checked={radio === props.data.id ? true : false}
          ></input>
          <span className="checkmark"></span>
        </label>
      </div>
    </div>
  );
};

export default Category;
