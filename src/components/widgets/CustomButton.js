import React from "react";

const CustomButton = (props) => {
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
export default CustomButton;