import React, { useRef, useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useStyles } from "../../../assets/styles";
import { postAdmin, putAdmin,postNotification } from "../../../constants/config";
import { customToast } from "../../widgets/Toast";
import { useHistory } from "react-router";
import { colors } from "../../../theme";
import { uploadFile } from "../../../constants/config";
import axios from "axios";
import config from "../../../constants/config";

const AddMd = (Props) => {
  const classes = useStyles();

  const { match } = Props;
  const mdName = useRef("");
  const phoneNumber = useRef("");
  const dob = useRef(null);
  const qualification = useRef("");
  const [mdPhoto, setMdPhoto] = useState(null);
  const [mdSign, setSignPhoto] = useState(null);
  const history = useHistory();

  useEffect(() => {
    if (match.params.id) {
      axios
        .get(`${config.app.APP_API_URL}/adminusers/${match.params.id}`)
        .then((res) => {
          if (res && res.status === 200) {
            mdName.current.value = res.data?.name ?? null;
            phoneNumber.current.value = res.data?.phoneNumber ?? null;
            qualification.current.value = res.data?.qualification ?? null;
            dob.current.value = res.data?.DOB ?? null;
          }
        })
        .catch((err) => customToast("error", err.message));
    }
  }, [match.params.id]);

  const _onProfilePicChange = (e) => {
    const file = e.target.files[0];
    setMdPhoto(file);
  };
  const _onSignPicChange = (e) => {
    const file = e.target.files[0];
    setSignPhoto(file);
  };
  const uploadProfilePic = (id) => {
    return uploadFile({
      ref: "adminuser",
      refId: id,
      field: "picture",
      files: mdPhoto,
    });
  };

  const uploadSignature = (id) => {
    return uploadFile({
      ref: "adminuser",
      refId: id,
      field: "signature",
      files: mdSign,
    });
  };
  const postMdData = (e) => {
    e.preventDefault();
    const params = {
      name: mdName.current.value,
      phoneNumber: phoneNumber.current.value,
      DOB: dob.current.value === "" ? null : dob.current.value,
      qualification: qualification.current.value,
      adminType:"md"
    };
    const Notification = {
      notification : match.params.id ?`MD "${params.name}" Details Has been Updated` : `New MD "${params.name}" Has been Registered`
    };
    (match.params.id  ? putAdmin(params, match.params.id ) : postAdmin(params))
      .then((res) => {
        const success = () => {
          customToast("success", "Form submitted successfully.");
          history.goBack();
        };

        if (mdPhoto || mdSign) {
          if (mdPhoto && !mdSign) {
            uploadProfilePic(res.id).then((data) => {
              success();
            });
          } else if (mdSign && !mdPhoto) {
            uploadSignature(res.id).then((data) => {
              success();
            });
          } else if (mdSign && mdPhoto) {
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
      postNotification(Notification)
      .catch((err) => customToast("error", err.message));
  };

  return (
    <div className={classes.form}>
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
                {!match.params.id ? "Add" : "Edit"} MD Details
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
                ref={mdName}
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
