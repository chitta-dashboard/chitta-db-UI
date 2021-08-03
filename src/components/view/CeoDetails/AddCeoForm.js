import React, { useRef } from "react";
import Grid from "@material-ui/core/Grid";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useStyles } from "../../../assets/styles";
import { customToast } from "../../widgets/Toast";
import { postCeo } from "../../../constants/config";
import { useHistory } from "react-router";

const AddCeo = () => {
  const classes = useStyles();
  const ceoName = useRef("");
  const phoneNumber = useRef("");
  const description = useRef("");
  const history = useHistory();

  const postCeoData = (e) => {
    e.preventDefault();
    const params = {
      name: ceoName.current.value,
      phoneNumber: phoneNumber.current.value,
      description: description.current.value,
    };
    postCeo(params)
      .then(customToast("success", "Form submitted successfully."))
      .then(history.push("/ceodetails"))
      .catch((err) => customToast("error", err.message));
  };

  return (
    <div>
      <form>
        <Grid className={classes.form_container} container spacing={3}>
          <Grid className={classes.adddetails_header} item xs={12}>
            <Link to="/ceodetails" style={{ textDecoration: "none" }}>
              <Typography
                variant="h5"
                className={classes.addDetailbtn_container}
                style={{ textDecoration: "none" }}
              >
                <ChevronLeftIcon className={classes.iconbtn} />
                Add CEO Details
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
                ref={ceoName}
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
            <Grid className={classes.forminput_container} item xs={12}>
              <textarea
                className="farmer-input tamil"
                placeholder="Description"
                rows="4"
                cols="50"
                type="text"
                autoComplete="off"
                ref={description}
                style={{ padding: "15px", height: "6rem" }}
              />
            </Grid>
          </Grid>
          <Grid className={classes.forminput_container_btn} container>
            <button
              type="submit"
              className={classes.submit_btn}
              onClick={postCeoData}
            >
              SUBMIT
            </button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddCeo;
