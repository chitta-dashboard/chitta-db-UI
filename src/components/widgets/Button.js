import React from "react";

const Button = (props) => {
  const { value,onClick,className } = props;
  return (
    <button
      className={className}
      style={{ textDecoration: "none" }}
      onClick={onClick}
    >
      {value}
    </button>
  );
};
export default Button;