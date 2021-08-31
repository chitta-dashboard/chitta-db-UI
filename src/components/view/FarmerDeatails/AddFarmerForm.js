import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useStyles } from "../../../assets/styles";
import SurveyInput from "./SurveyInput";
import { customToast } from "../../widgets/Toast";
import {
  getFarmerById,
  getFarmersGroup,
  postFarmer,
  putFarmer,
  uploadFile,
  postNotification,
  getFarmers,
} from "../../../constants/config";
import { colors } from "../../../theme";
import { uuid } from "../../../constants";
import { useMutation, useQuery } from "react-query";
import { useForm } from "react-hook-form";
import { UserLoginContext } from "../../context/UserLoginContext";
import { FieldError } from "../Common/FieldError";

const initialFormValue = {
  surveyNoList: {
    "38997518-1bdc-28b5-2781-98baec87ffcd": { id: "", value: "" },
  },
};
const AddFarmerForm = (Props) => {
  const history = useHistory();
  const classes = useStyles();
  const [formValue, setFormValue] = useState(initialFormValue);
  const [farmerPhoto, setFarmerPhoto] = useState(null);
  const [farmerGroupId, setFarmerGroupId] = useState();
  const [surveyArr, setSurveyArr] = useState([]);
  const [makeAdmin, setMakeAdmin] = useState(false);
  const [farmerGroupValue, setFarmerGroupValue] = useState();
  const { loginType } = useContext(UserLoginContext);
  const { match } = Props;

  const { data: farmerData } = useQuery(
    ["getFarmerEdit", match.params.id],
    () => match.params.id && getFarmerById(match.params.id)
  );
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    if (match.params.id) {
      getFarmerById(match.params.id)
        .then((res) => {
          const dob = res.DOB.split("/").join("-");
          setValue("farmerName", res?.name ?? null);
          setValue("fatherName", res?.fatherName ?? null);
          setValue("husbandName", res?.husbandName ?? null);
          setValue("farmerGroup", res?.farmerGroup ?? null);
          setValue("DOB", dob ?? null);
          setValue("phoneNumber", res?.phoneNumber ?? null);
          setValue("aadharNumber", res?.aadharNumber ?? null);
          setValue("voterIdNumber", res?.voterIdNumber ?? null);
          setValue("acre", res?.acre ?? null);
          setValue("gender", res?.gender ?? null);
          setValue("education", res?.education ?? null);
          setValue("address", res?.address ?? null);
          setValue("village", res?.village ?? null);
          setValue("circle", res?.circle ?? null);
          setValue("district", res?.district ?? null);
          setValue("pincode", res?.pincode ?? null);
          setValue("landType", res?.landType ?? null);
          setValue("irrigationType", res?.irrigationType ?? null);
          setValue("farmerType", res?.farmerType ?? null);
          setValue("cropType", res?.cropType ?? null);
          setValue("cattle", res?.cattle ?? null);
          setFarmerGroupId(res?.farmerGroup ?? "");
          let surveyArr = res.surveyNo.split(",");
          let surveyList = {};
          surveyArr.forEach((item) => {
            let _id = uuid();
            surveyList[_id] = {
              id: _id,
              value: item,
            };
          });
          setFormValue((prev) => {
            return {
              ...prev,
              surveyNoList: surveyList,
            };
          });
        })
        .catch((err) => customToast("error", err.message));
    }
  }, [match.params.id, farmerData]);
  const { data: farmerGroups } = useQuery("getFarmerGroups", () =>
    getFarmersGroup()
  );

  useEffect(() => {
    getFarmers()
      .then((res) =>
        res.filter((data) => {
          return data.farmerGroup === farmerGroupValue;
        })
      )
      .then((data) =>
        data.some((data) => {
          return data.isGroupAdmin === true;
        })
      )
      .then((data) => setMakeAdmin(data));
  }, [farmerGroupValue]);

  const _onProfilePicChange = (e) => {
    const file = e.target.files[0];
    setFarmerPhoto(file);
  };
  const handleSurveyChange = (surveyUuid, e) => {
    setFormValue({
      ...formValue,
      surveyNoList: {
        ...formValue.surveyNoList,
        [surveyUuid]: {
          ...formValue.surveyNoList[surveyUuid],
          value: e.target.value,
        },
      },
    });
  };

  const handleAddSurveyNumber = (surveyUuid) => {
    const addRow = (surveyId, resId) => {
      setFormValue({
        ...formValue,
        surveyNoList: {
          ...formValue.surveyNoList,
          [surveyId]: { ...formValue.surveyNoList[surveyId], id: resId },
          [uuid()]: { id: "", value: "" },
        },
      });
    };
    addRow(surveyUuid);
  };

  const handleRemoveSurveyNumber = (surveyUuid) => {
    const surveyList = formValue.surveyNoList;
    delete surveyList[surveyUuid];
    setFormValue({ ...formValue, surveyNoList: surveyList });

    const tempArr = surveyArr.filter(function (value, index, arr) {
      return surveyUuid !== value.id;
    });
    setSurveyArr(tempArr);
  };

  const handleActions = (isAddable, id, e) => {
    e.preventDefault();
    if (isAddable) handleAddSurveyNumber(id);
    else handleRemoveSurveyNumber(id);
  };

  const SurveyNoArray = Object.values(formValue.surveyNoList).map((item) => {
    return item.value;
  });
  const farmerPicHandler = (data) => {
    const success = () => {
      customToast("success", "Form submitted successfully.");
      history.goBack();
    };
    if (farmerPhoto) {
      uploadFile({
        ref: "farmer",
        refId: data.id,
        field: "userImg",
        files: farmerPhoto,
      })
        .then((data) => {
          setSurveyArr([]);
          setFormValue(initialFormValue);
          success();
        })
        .catch((_err) => {
          console.log(_err);
        });
    } else {
      setSurveyArr([]);
      setFormValue(initialFormValue);
      success();
    }
  };
  const addFarmer = useMutation((data) => postFarmer(data), {
    onSuccess: (data) => farmerPicHandler(data),
    onError: (error) => console.log("error", error.message),
  });
  const editFarmer = useMutation((data) => putFarmer(data, match.params.id), {
    onSuccess: (data) => farmerPicHandler(data),
    onError: (error) => console.log("error", error.message),
  });

  const postFarmerData = (data) => {
    const params = {
      name: data.farmerName,
      fatherName: data.fatherName,
      husbandName: data.husbandName,
      farmerGroup: farmerGroupValue,
      DOB: data.DOB !== "" ? data.DOB : null,
      phoneNumber: data.phoneNumber,
      aadharNumber: data.aadharNumber,
      voterIdNumber: data.voterIdNumber,
      surveyNo:
        SurveyNoArray[0].length === 0
          ? farmerData.surveyNo
          : SurveyNoArray.toString(),
      acre: data.acre,
      gender: data.gender,
      education: data.education,
      address: data.address,
      village: data.village,
      circle: data.circle,
      district: data.district,
      pincode: data.pincode,
      landType: data.landType,
      irrigationType: data.irrigationType,
      farmerType: data.farmerType,
      cropType: data.cropType,
      cattle: data.cattle,
      isGroupAdmin: !makeAdmin && data.groupAdmin === "true" ? true : false,
    };

    // console.log(params);
    match.params.id ? editFarmer.mutate(params) : addFarmer.mutate(params);
    const Notification = {
      notification: `New Farmer has been added to "${params.farmerGroup}" group`,
    };
    postNotification(Notification).catch((err) =>
      customToast("error", err.message)
    );
  };

  console.log(farmerGroupValue);
  console.log(makeAdmin);
  return (
    <div className={classes.form}>
      <form onSubmit={handleSubmit((data) => postFarmerData(data))}>
        <Grid className={classes.form_container} container spacing={3}>
          <Grid className={classes.adddetails_header} item xs={12}>
            <Link to="/farmersdetails" style={{ textDecoration: "none" }}>
              <Typography
                variant="h5"
                className={classes.addDetailbtn_container}
                style={{ textDecoration: "none" }}
              >
                <ChevronLeftIcon className={classes.iconbtn} />
                {match.params.id ? "Edit" : "ADD"} farmer Details
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
                {...register("farmerName")}
                autoComplete="off"
              />
              {errors?.farmerName?.type === "required" && (
                <FieldError>Required</FieldError>
              )}
            </Grid>
            <Grid item xs={6}>
              <input
                className="farmer-input tamil"
                type="text"
                placeholder="தந்தையின் பெயர்"
                {...register("fatherName")}
                autoComplete="off"
              />
            </Grid>
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
                placeholder="கணவரின் / மனைவியின் பெயர்"
                {...register("husbandName")}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={6}>
              <select
                name="குழு"
                id="குழு"
                className="farmer-input"
                style={{ color: "#111B2B" }}
                onChange={(e) => setFarmerGroupValue(e.target.value)}
              >
                <option selected value="" disabled hidden>
                  குழு
                </option>
                {farmerGroups &&
                  farmerGroups.map((farmerGroup) => {
                    return (
                      <option
                        selected={farmerGroupId === farmerGroup.groupName}
                        key={farmerGroup.id}
                        value={farmerGroup.groupName}
                        className={classes.drpdown}
                      >
                        {farmerGroup.groupName}
                      </option>
                    );
                  })}
              </select>
              {errors?.farmerGroup?.type === "required" && (
                <FieldError>Required</FieldError>
              )}
            </Grid>
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
          <Grid
            className={classes.forminput_containerrow}
            container
            spacing={3}
          >
            <Grid item xs={4}>
              <input
                className="farmer-input"
                type="date"
                placeholder="பிறந்த தேதி"
                {...register("DOB")}
                autoComplete="off"
                style={{ color: colors.text2 }}
              />
              {errors?.DOB?.type === "required" && (
                <FieldError>Required</FieldError>
              )}
            </Grid>
            <Grid item xs={8}>
              <input
                className="farmer-input"
                type="number"
                placeholder="கைபேசி எண்"
                // ref={phoneNumber}
                {...register("phoneNumber", {
                  required: true,
                  maxLength: 10,
                  minLength: 10,
                })}
                autoComplete="off"
              />
              {errors?.phoneNumber?.type === "required" && (
                <FieldError>Required</FieldError>
              )}
              {errors?.phoneNumber?.type === "maxLength" && (
                <FieldError>Invalid Phone number</FieldError>
              )}
              {errors?.phoneNumber?.type === "minLength" && (
                <FieldError>Invalid Phone number</FieldError>
              )}
            </Grid>
          </Grid>
          <Grid className={classes.forminput_container} item xs={12}>
            <input
              className="farmer-input"
              type="text"
              placeholder="ஆதார் எண்"
              {...register("aadharNumber")}
              autoComplete="off"
            />
          </Grid>
          <Grid className={classes.forminput_container} item xs={12}>
            <input
              className="farmer-input"
              type="text"
              placeholder="வாக்காளர் அடையாள எண்"
              autoComplete="off"
              {...register("voterIdNumber")}
            />
          </Grid>
          <Grid
            className={classes.forminput_containerrow}
            container
            spacing={3}
          >
            {Object.keys(formValue.surveyNoList).map((id, i) => {
              const numberList = formValue.surveyNoList;
              const isAddable = Object.keys(numberList).length === i + 1;
              return (
                <SurveyInput
                  key={`${id}_${i}`}
                  id={id}
                  isAddable={isAddable}
                  value={numberList[id].value}
                  handleChange={(id, e) => handleSurveyChange(id, e)}
                  handleActions={(e) => handleActions(isAddable, id, e)}
                />
              );
            })}
          </Grid>
          <Grid className={classes.forminput_container} item xs={12}>
            <input
              className="farmer-input"
              type="number"
              placeholder="சென்ட் "
              {...register("acre")}
              autoComplete="off"
            />
          </Grid>
          <Grid
            className={classes.forminput_containerrow}
            container
            spacing={3}
          >
            <Grid item xs={4}>
              <select
                name="பாலினம்"
                id="பாலினம்"
                className="farmer-input"
                style={{ color: "#111B2B" }}
                {...register("gender")}
              >
                <option value="male" className={classes.drpdown}>
                  ஆண்
                </option>
                <option value="female" className={classes.drpdown}>
                  பெண்
                </option>
              </select>
              {errors?.gender?.type === "required" && (
                <FieldError>Required</FieldError>
              )}
            </Grid>
            <Grid item xs={8}>
              <input
                id="id"
                placeholder="கல்வி"
                className="farmer-input"
                type="text"
                autoComplete="off"
                {...register("education")}
              />
            </Grid>
          </Grid>
          <Grid className={classes.forminput_container} item xs={12}>
            <textarea
              className="farmer-input tamil"
              placeholder="முகவரி"
              rows="4"
              cols="50"
              type="text"
              autoComplete="off"
              {...register("address")}
              style={{ padding: "15px", height: "auto" }}
            />
          </Grid>
          <Grid
            className={classes.forminput_containerrow}
            container
            spacing={3}
          >
            <Grid item xs={6}>
              <input
                placeholder="ஊர்"
                className="farmer-input tamil"
                type="text"
                autoComplete="off"
                {...register("village")}
              />
            </Grid>
            <Grid item xs={6}>
              <input
                className="farmer-input tamil"
                type="text"
                autoComplete="off"
                {...register("circle")}
                placeholder="வட்டம்"
              />
            </Grid>
          </Grid>
          <Grid
            className={classes.forminput_containerrow}
            container
            spacing={3}
          >
            <Grid item xs={8}>
              <input
                className="farmer-input tamil"
                type="text"
                autoComplete="off"
                {...register("district")}
                placeholder="மாவடஂடமஂ"
              />
            </Grid>

            <Grid item xs={4}>
              <input
                className="farmer-input"
                type="number"
                placeholder="பினஂகோடு"
                {...register("pincode")}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={4}>
              <select
                name="நில வகை"
                id="நில வகை"
                className="farmer-input"
                style={{ color: "#111B2B" }}
                {...register("landType")}
              >
                <option value="" disabled selected hidden>
                  நில வகை
                </option>
                <option value="WETLAND" className={classes.drpdown}>
                  ஈரமான நிலம்
                </option>
                <option value="RAINFED" className={classes.drpdown}>
                  மானாவாரி
                </option>
                <option value="WELL" className={classes.drpdown}>
                  கிணறு
                </option>
                <option value="DRYLAND" className={classes.drpdown}>
                  வறண்ட நிலம்
                </option>
              </select>
            </Grid>
            <Grid item xs={4}>
              <select
                name="நீர்ப்பாசன வகை"
                id="நீர்ப்பாசன வகை"
                className="farmer-input"
                style={{ color: "#111B2B" }}
                {...register("irrigationType")}
              >
                <option value="" disabled selected hidden>
                  நீர்ப்பாசன வகை
                </option>
                <option value="TRIPIRRIGATION" className={classes.drpdown}>
                  சொட்டு நீர் பாசனம்
                </option>
                <option value="RAINFED" className={classes.drpdown}>
                  மானாவாரி
                </option>
                <option value="WELL" className={classes.drpdown}>
                  கிணறு
                </option>
              </select>
            </Grid>
            <Grid item xs={4}>
              <select
                name="விவசாயி வகை"
                id="விவசாயி வகை"
                className="farmer-input"
                style={{ color: "#111B2B" }}
                {...register("farmerType")}
              >
                <option value="" disabled selected hidden>
                  விவசாயி வகை
                </option>
                <option value="SMALL" className={classes.drpdown}>
                  சிறிய
                </option>
                <option value="MARGINAL" className={classes.drpdown}>
                  ஓரளவு
                </option>
              </select>
            </Grid>
            <Grid item xs={6}>
              <input
                className="farmer-input tamil"
                type="text"
                autoComplete="off"
                {...register("cropType")}
                placeholder="
                பயிர் வகை"
              />
            </Grid>
            <Grid item xs={6}>
              <input
                className="farmer-input tamil"
                type="number"
                {...register("cattle")}
                autoComplete="off"
                placeholder="கால்நடைகள்"
              />
            </Grid>
            {loginType === "Administrator" && !makeAdmin && (
              <Grid item xs={12}>
                <select
                  name="குழு நிர்வாகி"
                  id="குழு நிர்வாகி"
                  className="farmer-input"
                  style={{ color: "#111B2B" }}
                  {...register("groupAdmin")}
                >
                  <option value="" disabled selected hidden>
                    குழு நிர்வாகி
                  </option>
                  <option value="true" className={classes.drpdown}>
                    ஆம்
                  </option>
                  <option value="false" className={classes.drpdown}>
                    இல்லை
                  </option>
                </select>
              </Grid>
            )}
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

export default AddFarmerForm;
