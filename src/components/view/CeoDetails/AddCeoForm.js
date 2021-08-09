import React, { useEffect, useRef, useState } from "react";
import Grid from "@material-ui/core/Grid";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useStyles } from "../../../assets/styles";
import { customToast } from "../../widgets/Toast";
import { postCeo, putCeo } from "../../../constants/config";
import { useHistory } from "react-router";
import { colors } from "../../../theme";
import { uploadFile } from "../../../constants/config";
import config from "../../../constants/config";
import axios from "axios";

const AddCeo = (Props) => {
  const { match } = Props;
  const classes = useStyles();
  const ceoName = useRef("");
  const phoneNumber = useRef("");
  const description = useRef("");
  const dob = useRef(null);
  const qualification = useRef("");
  const [ceoPhoto, setCeoPhoto] = useState(null);
  const [ceoSign, setCeoSign] = useState(null);
  const history = useHistory();

  useEffect(() => {
    if (match.params.id) {
      axios
        .get(`${config.app.APP_API_URL}/ceos/${match.params.id}`)
        .then((res) => {
          if (res && res.status === 200) {
            ceoName.current.value = res.data?.name ?? null;
            phoneNumber.current.value = res.data?.phoneNumber ?? null;
            description.current.value = res.data?.description ?? null;
            qualification.current.value = res.data?.qualification ?? null;
            dob.current.value = res.data?.DOB ?? null;
          }
        })
        .catch((err) => customToast("error", err.message));
    }
  }, [match.params.id]);

  const _onProfilePicChange = (e) => {
    const file = e.target.files[0];
    setCeoPhoto(file);
  };
  const _onSignPicChange = (e) => {
    const file = e.target.files[0];
    setCeoSign(file);
  };

  const uploadProfilePic = (id) => {
    return uploadFile({
      ref: "ceo",
      refId: id,
      field: "picture",
      files: ceoPhoto,
    });
  };

  const uploadSignature = (id) => {
    return uploadFile({
      ref: "ceo",
      refId: id,
      field: "signature",
      files: ceoSign,
    });
  };

  const postCeoData = (e) => {
    e.preventDefault();
    console.log("DATE", dob.current.value);
    const params = {
      name: ceoName.current.value,
      phoneNumber: phoneNumber.current.value,
      description: description.current.value,
      DOB: dob.current.value === "" ? null : dob.current.value,
      qualification: qualification.current.value,
    };
    (match.params.id ? putCeo(params, match.params.id) : postCeo(params))
      .then((res) => {
        const success = () => {
          customToast("success", "Form submitted successfully.");
          history.goBack();
        };

        if (ceoPhoto || ceoSign) {
          console.log(ceoPhoto, ceoSign);
          if (ceoPhoto && !ceoSign) {
            uploadProfilePic(res.id).then((data) => {
              success();
            });
          } else if (ceoSign && !ceoPhoto) {
            uploadSignature(res.id).then((data) => {
              success();
            });
          } else if (ceoSign && ceoPhoto) {
            Promise.all([
              uploadProfilePic(res.id),
              uploadSignature(res.id),
            ]).then((data) => {
              success();
            });
          }
        } else {
          success();
        }
      })
      .catch((err) => customToast("error", err.message));
  };

  return (
    <div className={classes.form}>
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
                {match.params.id ? "Edit CEO Details" : "Add CEO Details"}
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
                placeholder="பெயர்"
                ref={ceoName}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={6}>
              <input
                className="farmer-input tamil"
                type="text"
                placeholder="கைபேசி எண்"
                ref={phoneNumber}
                autoComplete="off"
              />
            </Grid>
            <Grid className={classes.forminput_container} item xs={12}>
              <textarea
                className="farmer-input tamil"
                placeholder="விளக்கம்"
                rows="4"
                cols="50"
                type="text"
                autoComplete="off"
                ref={description}
                style={{ padding: "15px", height: "6rem" }}
              />
            </Grid>
            <Grid className={classes.forminput_container} item xs={12}>
              <label>புகைப்படம்</label>
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
            <label>கையொப்பம்</label>
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
                placeholder="தகுதி"
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
