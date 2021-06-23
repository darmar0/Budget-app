import React from "react";

const Logo = (props) => {
  return (
    <div className="logo-container" style={{ transform: `scale(${props.scale})` }}>
      <div className="element1Container">
        <div className="element1">
          <div className="elementRect"></div>
          <div className="elementTri"></div>
        </div>
        <div className="element1" style={{ transform: "scaleX(-1)" }}>
          <div className="elementRect"></div>
          <div className="elementTri"></div>
        </div>
      </div>
      <div className="element2Container">
        <div className="element2" style={{ transform: "scaleY(-1)" }}>
          <div className="elementRect"></div>
          <div className="elementTri"></div>
        </div>
        <div className="element2" style={{ transform: "rotate(180deg)" }}>
          <div className="elementRect"></div>
          <div className="elementTri"></div>
        </div>
      </div>
    </div>
  );
};

export default Logo;
