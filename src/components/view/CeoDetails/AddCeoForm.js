import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useStyles } from "../../../assets/styles";
import { customToast } from "../../widgets/Toast";
import {
  postAdmin,
  putAdmin,
  postNotification,
  getAdminUser,
} from "../../../constants/config";
import { useHistory } from "react-router";
import { colors } from "../../../theme";
import { uploadFile } from "../../../constants/config";
import config from "../../../constants/config";
import axios from "axios";
import { useQuery, useMutation } from "react-query";
import { useForm } from "react-hook-form";

const AddCeo = (Props) => {
  const { match } = Props;
  const classes = useStyles();
  const [ceoPhoto, setCeoPhoto] = useState(null);
  const [ceoSign, setCeoSign] = useState(null);
  const history = useHistory();
  const { data: ceoData } = useQuery(
    ["editCeo", match.params.id],
    () => match.params.id && getAdminUser(match.params.id)
  );
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const updateCeo = useMutation((data) => putAdmin(data, match.params.id), {
    onSuccess: (data) => {
      ceoPicHandler(data);
    },
    onError: (error) => {
      customToast("error", error.message);
    },
  });
  const addCeo = useMutation((data) => postAdmin(data), {
    onSuccess: (data) => {
      ceoPicHandler(data);
    },
    onError: (error) => {
      customToast("error", error.message);
    },
  });

  useEffect(() => {
    if (match.params.id) {
      setValue("name", ceoData?.name ?? null);
      setValue("phoneNumber", ceoData?.phoneNumber ?? null);
      setValue("dob", ceoData?.DOB ?? null);
      setValue("qualification", ceoData?.qualification ?? null);
    }
  }, [match.params.id, ceoData, setValue]);

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
      ref: "adminuser",
      refId: id,
      field: "picture",
      files: ceoPhoto,
    });
  };

  const uploadSignature = (id) => {
    return uploadFile({
      ref: "adminuser",
      refId: id,
      field: "signature",
      files: ceoSign,
    });
  };

  const ceoPicHandler = (res) => {
    const success = () => {
      customToast("success", "Form submitted successfully.");
      history.goBack();
    };

    if (ceoPhoto || ceoSign) {
      if (ceoPhoto && !ceoSign) {
        uploadProfilePic(res.id).then((data) => {
          success();
        });
      } else if (ceoSign && !ceoPhoto) {
        uploadSignature(res.id).then((data) => {
          success();
        });
      } else if (ceoSign && ceoPhoto) {
        Promise.all([uploadProfilePic(res.id), uploadSignature(res.id)]).then(
          (data) => {
            success();
          }
        );
      }
    } else {
      success();
    }
  };

  const postCeoData = (data) => {
    const params = {
      name: data.name,
      phoneNumber: data.phoneNumber,
      DOB: data.dob === "" ? null : data.dob,
      qualification: data.qualification,
      adminType: "ceo",
    };
    const Notification = {
      notification: match.params.id
        ? `CEO "${params.name}" Details Has been Updated`
        : `New CEO "${params.name}" Has been Registered`,
    };

    match.params.id ? updateCeo.mutate(params) : addCeo.mutate(params);

    postNotification(Notification).catch((err) =>
      customToast("error", err.message)
    );
  };

  return (
    <div className={classes.form}>
      <form
        onSubmit={handleSubmit((data) => {
          postCeoData(data);
        })}
      >
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
                {...register("name")}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={6}>
              <input
                className="farmer-input tamil"
                type="text"
                placeholder="கைபேசி எண்"
                {...register("phoneNumber", {
                  required: true,
                  maxLength: 10,
                  minLength: 10,
                })}
                autoComplete="off"
              />
              {errors?.phoneNumber?.type === "required" && (
                <p className={classes.requiredWarningText}>required</p>
              )}
              {errors?.phoneNumber?.type === "maxLength" && (
                <p className={classes.requiredWarningText}>
                  Invalid Phone number
                </p>
              )}
              {errors?.phoneNumber?.type === "minLength" && (
                <p className={classes.requiredWarningText}>
                  Invalid Phone number
                </p>
              )}
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
                {...register("dob", { required: true })}
                style={{ color: colors.text2 }}
              />
              {errors?.dob && (
                <p className={classes.requiredWarningText}>required</p>
              )}
            </Grid>
            <Grid item xs={8}>
              <input
                className="farmer-input"
                type="text"
                placeholder="தகுதி"
                autoComplete="off"
                {...register("qualification")}
              />
            </Grid>
          </Grid>
          <Grid className={classes.forminput_container_btn} container>
            <button type="submit" className={classes.submit_btn}>
              SUBMIT
            </button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddCeo;
