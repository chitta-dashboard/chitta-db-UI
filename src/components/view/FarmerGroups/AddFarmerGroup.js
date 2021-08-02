import React, { useRef } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useStyles } from "../../../assets/styles";
import config from "../../../constants/config";

const AddFarmerGroup = () => {
  const classes = useStyles();
  const groupName = useRef("");
  const Description = useRef("");

  const postGroupData = (e) => {
    e.preventDefault();
    const params = {
      groupName: groupName.current.value,
      description: Description.current.value,
    };
    axios
      .post(`${config.app.APP_API_URL}/farmer-groups`, params, {
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
                Add Farmer Group
              </Typography>
            </Link>
          </Grid>

          <Grid item xs={12} className={classes.forminput_containerrow}>
            <input
              className="farmer-input tamil"
              type="text"
              placeholder="Group name"
              ref={groupName}
              autoComplete="off"
            />
          </Grid>
          <Grid className={classes.forminput_container} item xs={12}>
            <textarea
              className="farmer-input tamil"
              placeholder="Description"
              rows="4"
              cols="50"
              type="text"
              autoComplete="off"
              ref={Description}
              style={{ padding: "15px", height: "30vh" }}
            />
          </Grid>
          <Grid className={classes.forminput_container_btn} container>
            <button
              type="submit"
              className={classes.submit_btn}
              onClick={postGroupData}
            >
              SUBMIT
            </button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddFarmerGroup;