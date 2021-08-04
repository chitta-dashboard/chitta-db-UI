import React, { useRef, useState } from "react";
import Grid from "@material-ui/core/Grid";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useStyles } from "../../../assets/styles";
import { customToast } from "../../widgets/Toast";
import { postCeo } from "../../../constants/config";
import { useHistory } from "react-router";
import { colors } from "../../../theme";
import { uploadFile } from "../../../constants/config";

const AddCeo = () => {
  const classes = useStyles();
  const ceoName = useRef("");
  const phoneNumber = useRef("");
  const description = useRef("");
  const dob = useRef("");
  const qualification = useRef("");
  const [ceoPhoto, setCeoPhoto] = useState(null);
  const history = useHistory();

  const _onProfilePicChange = (e) => {
    const file = e.target.files[0];
    setCeoPhoto(file);
  };

  const postCeoData = (e) => {
    e.preventDefault();
    const params = {
      name: ceoName.current.value,
      phoneNumber: phoneNumber.current.value,
      description: description.current.value,
      dob: dob.current.value,
      qualification: qualification.current.value,
    };
    postCeo(params)
      .then((res) => {
        console.log(res);
        if (ceoPhoto) {
          console.log(res.id);
          uploadFile({
            ref: "ceo",
            refId: res.id,
            field: "picture",
            files: ceoPhoto,
          }).then((data) => {
            customToast("success", "Form submitted successfully.");
            history.push("/ceodetails");
          });
        }
      })
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
            <Grid className={classes.forminput_container} item xs={12}>
              <input
                className="farmer-input tamil"
                type="file"
                accept="image/*"
                autoComplete="off"
                style={{
                  padding: "1rem",
                  color: "#111B2B",
                  backgroundColor: "#131e2f0d",
                }}
                onChange={_onProfilePicChange}
              />
            </Grid>
            <Grid item xs={4}>
              <input
                className="farmer-input"
                type="date"
                placeholder="பிறந்த தேதி"
                autoComplete="off"
                ref={dob}
                style={{ color: colors.text2 }}
              />
            </Grid>
            <Grid item xs={8}>
              <input
                className="farmer-input"
                type="text"
                placeholder="Qualification"
                autoComplete="off"
                ref={qualification}
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
