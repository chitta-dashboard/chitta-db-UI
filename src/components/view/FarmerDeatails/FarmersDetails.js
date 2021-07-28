import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import FarmerList from "./FarmerList";
import config from "../../../constants/config";
import { useStyles } from "../../../assets/styles";

const FarmersDetails = (props) => {
  const classes = useStyles();
  const [farmersData, setFarmersData] = useState([]);

  useEffect(() => {
    axios
      .get(`${config.app.APP_API_URL}/farmers`)
      .then((res) => {
        setFarmersData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={classes.farmerdetails_root}>
      <Grid container spacing={3} className={classes.Detailscard_container}>
        <FarmerList farmersData={farmersData} history={props.history} />
      </Grid>
    </div>
  );
};

export default FarmersDetails;
