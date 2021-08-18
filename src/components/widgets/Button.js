import React from "react";

const Button = (props) => {
  const { value,onClick,className,icon} = props;
  return (
    <button
      className={className??null}
      style={{ textDecoration: "none" }}
      onClick={onClick??null}
    > 
      {icon??null}
      {value??null}
    </button>
  );
};
export default Button;