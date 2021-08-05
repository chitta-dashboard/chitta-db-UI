import React, { useRef, useState } from "react";
import Grid from "@material-ui/core/Grid";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useStyles } from "../../../assets/styles";
import { postMd } from "../../../constants/config";
import { customToast } from "../../widgets/Toast";
import { useHistory } from "react-router";
import { colors } from "../../../theme";
import { uploadFile } from "../../../constants/config";

const AddMd = () => {
  const classes = useStyles();
  const mdName = useRef("");
  const phoneNumber = useRef("");
  const description = useRef("");
  const dob = useRef("");
  const qualification = useRef("");
  const [mdPhoto, setMdPhoto] = useState(null);
  const [mdSign, setSignPhoto] = useState(null);
  const history = useHistory();

  const _onProfilePicChange = (e) => {
    const file = e.target.files[0];
    setMdPhoto(file);
  };
  const _onSignPicChange = (e) => {
    const file = e.target.files[0];
    setSignPhoto(file);
  };

  const postMdData = (e) => {
    e.preventDefault();
    const params = {
      name: mdName.current.value,
      phoneNumber: phoneNumber.current.value,
      description: description.current.value,
      dob: dob.current.value,
      qualification: qualification.current.value,
    };
    postMd(params)
      .then((res) => {
        console.log(res);
        if (mdPhoto && mdSign) {
          console.log(res.id);
          uploadFile({
            ref: "md",
            refId: res.id,
            field: "picture",
            files: mdPhoto,
          })
          uploadFile({
            ref: "md",
            refId: res.id,
            field: "signature",
            files: mdSign,
          }).then((data) => {
            customToast("success", "Form submitted successfully.");
            history.push("/mddetails");
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
                onChange={_onSignPicChange}
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
