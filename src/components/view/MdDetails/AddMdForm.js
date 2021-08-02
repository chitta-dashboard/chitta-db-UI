import React, { useRef } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useStyles } from "../../../assets/styles";
import config from "../../../constants/config";

const AddMd = () => {
  const classes = useStyles();
  const mdName = useRef("");
  const phoneNumber = useRef("");

  const postMdData = (e) => {
    e.preventDefault();
    const params = {
      name: mdName.current.value,
      phoneNumber: phoneNumber.current.value,
    };
    axios
      .post(`${config.app.APP_API_URL}/mds`, params, {
        headers: { "content-type": "application/json" },
      })
      .then(console.log(params));
  };

  return (
    <div>
      <form>
        <Grid className={classes.form_container} container spacing={3}>
          <Grid className={classes.adddetails_header} item xs={12}>
            <Link to="/mddetails" style={{ textDecoration: "none" }}>
              <Typography
                variant="h5"
                className={classes.addDetailbtn_container}
                style={{ textDecoration: "none" }}
              >
                <ChevronLeftIcon className={classes.iconbtn} />
                Add MD Details
              </Typography>
            </Link>
          </Grid>
          <Grid
            className={classes.forminput_containerrow}
            container
            spacing={3}
          >
            <Grid item xs={6}>
              <input
                className="farmer-input tamil"
                type="text"
                placeholder="name"
                ref={mdName}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={6}>
              <input
                className="farmer-input tamil"
                type="text"
                placeholder="Phone number"
                ref={phoneNumber}
                autoComplete="off"
              />
            </Grid>
          </Grid>
          <Grid className={classes.forminput_container_btn} container>
            <button
              type="submit"
              className={classes.submit_btn}
              onClick={postMdData}
            >
              SUBMIT
            </button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddMd;
