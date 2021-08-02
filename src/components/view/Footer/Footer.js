import React from "react";
import { useStyles } from "../../../assets/styles";

export default function Footer() {
  const classes = useStyles();
  return (
    <div className={classes.footer}>
      {/* <p className="address">Reg No:139086 | CIN:UO1409TN2020PTC139086</p> */}
      {/* <ul>
        <li>Reg No:139086 | CIN:UO1409TN2020PTC139086</li>
        <li>About | </li>
        <li>Help | </li>
        <li>Blog | </li>
        <li>Terms & Conditions </li>
      </ul> */}
      <p>Reg No:139086 | CIN:UO1409TN2020PTC139086</p>
      <div className={classes.footercontent}>
        <p>About | </p>
        <p>Help | </p>
        <p>Blog | </p>
        <p>Terms & Conditions</p>
      </div>
    </div>
  );
}
