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
        <div className={classes.footeractions_list}>About </div>
        <div>|</div>
        <div className={classes.footeractions_list}>Help </div>
        <div>|</div>

        <div className={classes.footeractions_list}>Blog </div>
        <div>|</div>
        <div className={classes.footeractions_list}>Terms & Conditions</div>
      </div>
    </div>
  );
}
