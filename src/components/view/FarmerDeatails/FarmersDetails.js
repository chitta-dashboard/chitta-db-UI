import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import FarmerList from "./FarmerList";
import { getFarmers } from "../../../constants/config";
import { useStyles } from "../../../assets/styles";

const FarmersDetails = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.farmerdetails_root}>
      <Grid container spacing={3} className={classes.Detailscard_container}>
        <FarmerList history={props.history} />
      </Grid>
    </div>
  );
};

export default FarmersDetails;
