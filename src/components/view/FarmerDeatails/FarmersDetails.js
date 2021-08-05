import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import FarmerList from "./FarmerList";
import { getFarmers } from "../../../constants/config";
import { useStyles } from "../../../assets/styles";

const FarmersDetails = (props) => {
  const classes = useStyles();
  const [farmersData, setFarmersData] = useState([]);
  const [filterGroup, setFilterGroup] = useState();
  useEffect(() => {
    getFarmers()
      .then((res) => {
        setFarmersData(res);
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
