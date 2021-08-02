import React from "react";
import { useStyles } from "../../../assets/styles";

export default function Footer() {
  const classes = useStyles();
  return (
    <div className={classes.footer}>
      <div className={classes.footercontent}>
        <p>Reg No:139086 | </p>
        <p>CIN:UO1409TN2020PTC139086</p>
      </div>
      <div className={classes.footeractions}>
        <p>About | </p>
        <p>Help | </p>
        <p>Blog | </p>
        <p>Terms & Conditions</p>
      </div>
    </div>
  );
}
