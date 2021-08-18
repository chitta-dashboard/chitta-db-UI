import React from "react";
import { NavLink } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import { useStyles } from "../../assets/styles";

const AddButton = (props) => {
  const classes = useStyles();
  const { link } = props;
  return (
    <NavLink to={link} className={classes.addDetails_link}>
      <button className={classes.addDetails_btn}>
        <AddIcon />
        Add
      </button>
    </NavLink>
  );
};
export default AddButton;
