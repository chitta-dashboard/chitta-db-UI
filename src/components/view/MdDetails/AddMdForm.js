import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useStyles } from "../../../assets/styles";
import {
  postAdmin,
  putAdmin,
  postNotification,
  getAdminUser,
} from "../../../constants/config";
import { customToast } from "../../widgets/Toast";
import { useHistory } from "react-router";
import { colors } from "../../../theme";
import { uploadFile } from "../../../constants/config";
import axios from "axios";
import config from "../../../constants/config";
import { useMutation, useQuery } from "react-query";
import Button from "../../widgets/Button";
import { FieldError } from "../Common/FieldError";
import { useForm } from "react-hook-form";

const AddMd = (Props) => {
  const classes = useStyles();

  const { match } = Props;
  const [mdPhoto, setMdPhoto] = useState(null);
  const [mdSign, setSignPhoto] = useState(null);
  const history = useHistory();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { data } = useQuery("editMd", () => getAdminUser(match.params.id));
  useEffect(() => {
    if (match.params.id) {
      setValue("name", data?.name ?? null);
      setValue("phoneNumber", data?.phoneNumber ?? null);
      setValue("dob", data?.DOB ?? null);
      setValue("qualification", data?.qualification ?? null);
    }
  }, [data, match.params.id, setValue]);

  const postMutation = useMutation((data) => postAdmin(data), {
    onSuccess: (data) => mdUploadHandler(data),
    onError: (err) => {
      customToast("error", err.message);
    },
  });
  const putMutation = useMutation((data) => putAdmin(data, match.params.id), {
    onSuccess: (data) => mdUploadHandler(data),
    onError: (err) => {
      customToast("error", err.message);
    },
  });

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

  const mdUploadHandler = (res) => {
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
        Promise.all([uploadProfilePic(res.id), uploadSignature(res.id)]).then(
          () => {
            success();
          }
        );
      }
    } else {
      success();
    }
  };

  const postMdData = (data) => {
    const params = {
      name: data.name,
      phoneNumber: data.phoneNumber,
      DOB: data.dob === "" ? null : data.dob,
      qualification: data.qualification,
      adminType: "md",
    };
    match.params.id ? putMutation.mutate(params) : postMutation.mutate(params);
    const Notification = {
      notification: match.params.id
        ? `MD "${params.name}" Details Has been Updated`
        : `New MD "${params.name}" Has been Registered`,
    };
    postNotification(Notification).catch((err) =>
      customToast("error", err.message)
    );
  };

  return (
    <div className={classes.form}>
      <form
        onSubmit={handleSubmit((data) => {
          postMdData(data);
        })}
      >
        <Grid className={classes.form_container} container spacing={3}>
          <Grid className={classes.adddetails_header} item xs={12}>
            <Link to="/mddetails" style={{ textDecoration: "none" }}>
              <Button
                className={classes.addDetailbtn_container}
                icon={<ChevronLeftIcon className={classes.iconbtn} />}
                value={match.params.id ? "Edit MD Details" : "Add MD Details"}
              />
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
                  minLength: 10,
                  maxLength: 10,
                })}
                autoComplete="off"
              />
              {errors.phoneNumber?.type === "required" && (
                <FieldError>required</FieldError>
              )}
              {errors.phoneNumber?.type === "maxLength" && (
                <FieldError className={classes.requiredWarningText}>
                  Invalide Phone Number
                </FieldError>
              )}
              {errors.phoneNumber?.type === "minLength" && (
                <FieldError className={classes.requiredWarningText}>
                  Invalide Phone Number
                </FieldError>
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
                {...register("dob", {
                  required: true,
                })}
                style={{ color: colors.text2 }}
              />
              {errors.dob && <FieldError>required</FieldError>}
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
            <button
              type="submit"
              className={classes.submit_btn}
              // onClick={postMdData}
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
