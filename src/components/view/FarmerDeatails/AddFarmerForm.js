import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useStyles } from "../../../assets/styles";
import SurveyInput from "./SurveyInput";
import { customToast } from "../../widgets/Toast";
import { uuid } from "../../../constants";
import config, { uploadFile } from "../../../constants/config";
import { colors } from "../../../theme";

const initialFormValue = {
  surveyNoList: {
    "38997518-1bdc-28b5-2781-98baec87ffcd": { id: "", value: "" },
  },
  gender: "male",
  landType: "WETLAND",
  irrigationType: "TRIPIRRIGATION",
  farmerType: "SMALL",
};

const AddFarmerForm = () => {
  const history = useHistory();
  const classes = useStyles();
  const fatherName = useRef("");
  const husbandName = useRef("");
  const farmerName = useRef("");
  const aadharNumber = useRef("");
  const DOB = useRef("");
  const phoneNumber = useRef("");
  const voterIdNumber = useRef("");
  const acre = useRef("");
  const education = useRef("");
  const address = useRef("");
  const village = useRef("");
  const circle = useRef("");
  const district = useRef("");
  const pincode = useRef("");
  // const landType = useRef("");
  // const irrigationType = useRef("");
  // const farmerType = useRef("");
  const cropType = useRef("");
  const cattle = useRef("");
  const [formValue, setFormValue] = useState(initialFormValue);
  const [farmerPhoto, setFarmerPhoto] = useState(null);
  const [farmerGroups, setFarmerGroups] = useState([]);
  const [farmerGroupId, setFarmerGroupId] = useState();

  useEffect(() => {
    axios
      .get(`${config.app.APP_API_URL}/farmer-groups`)
      .then((res) => {
        setFarmerGroups(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const _onProfilePicChange = (e) => {
    const file = e.target.files[0];
    setFarmerPhoto(file);
  };

  // const isExistSurveyNumber = (surveyUuid, cb) => {
  //   const surveyNo = formValue.surveyNoList[surveyUuid].value;
  //   console.log();
  //   if (formValue.surveyNoList[surveyUuid]?.value?.length)
  //     axios
  //       .post(`${config.app.APP_API_URL}/survey-numbers`, { surveyNo })
  //       .then((res) => {
  //         if (cb) cb(surveyUuid, res.data.id);
  //       })
  //       .catch((err) => {
  //         customToast("error", "Survey number already exist.");
  //       });
  //   else if (cb) cb(surveyUuid);
  // };

  // const handleSurveyChange = (surveyUuid, e) => {
  //   setFormValue({
  //     ...formValue,
  //     surveyNoList: {
  //       ...formValue.surveyNoList,
  //       [surveyUuid]: {
  //         ...formValue.surveyNoList[surveyUuid],
  //         value: e.target.value,
  //       },
  //     },
  //   });
  // };

  // const handleAddSurveyNumber = (surveyUuid) => {
  //   const addRow = (surveyId, resId) =>
  //     setFormValue({
  //       ...formValue,
  //       surveyNoList: {
  //         ...formValue.surveyNoList,
  //         [surveyId]: { ...formValue.surveyNoList[surveyId], id: resId },
  //         [uuid()]: { id: "", value: "" },
  //       },
  //     });

  //   isExistSurveyNumber(surveyUuid, addRow);
  // };

  // const handleRemoveSurveyNumber = (surveyUuid) => {
  //   const surveyList = formValue.surveyNoList;
  //   delete surveyList[surveyUuid];
  //   setFormValue({ ...formValue, surveyNoList: surveyList });
  // };

  const handleActions = (isAddable, id, e) => {
    e.preventDefault();
    console.log(id);
    console.log(e);
    // if (isAddable) handleAddSurveyNumber(id);
    // else handleRemoveSurveyNumber(id);
    console.log(isAddable);
    if (isAddable) {
      //addrow
    } else {
      //remmove row
    }
  };

  const postFarmerData = (e) => {
    e.preventDefault();
    // const lastSurveyUuid = Object.keys(formValue.surveyNoList).reverse()[0];

    const postData = () => {
      // let finalSurveyList = formValue.surveyNoList;
      // if (resId)
      //   finalSurveyList[lastSurveyUuid] = {
      //     ...finalSurveyList[lastSurveyUuid],
      //     id: resId,
      //   };

      // const FinalSurveyNoIds = Object.values(finalSurveyList)
      //   .filter((e1) => e1.id)
      //   .map((e2) => e2.id);

      const params = {
        name: farmerName.current.value,
        fatherName: fatherName.current.value,
        husbandName: husbandName.current.value,
        farmer_group: farmerGroupId,
        DOB: DOB.current.value,
        phoneNumber: phoneNumber.current.value,
        aadharNumber: aadharNumber.current.value,
        voterIdNumber: voterIdNumber.current.value,
        // surveyArray: [{ survey_numbers: FinalSurveyNoIds }],
        acre: +acre.current.value,
        gender: formValue.gender,
        education: education.current.value,
        address: address.current.value,
        village: village.current.value,
        circle: circle.current.value,
        district: district.current.value,
        pincode: pincode.current.value,
        landType: formValue.landType,
        irrigationType: formValue.irrigationType,
        farmerType: formValue.farmerType,
        cropType: cropType.current.value,
        cattle: cattle.current.value,
      };

      axios
        .post(`${config.app.APP_API_URL}/farmers`, params, {
          headers: { "content-type": "application/json" },
        })
        .then((res) => {
          console.log(res);
          if (farmerPhoto) {
            console.log(res.data.id);
            uploadFile({
              ref: "farmer",
              refId: res.data.id,
              field: "userImg",
              files: farmerPhoto,
            })
              .then((data) => {
                setFormValue(initialFormValue);
                customToast("success", "Form submitted successfully.");
                history.push("/farmersdetails");
              })
              .catch((_err) => {
                console.log(_err);
              });
          } else {
            setFormValue(initialFormValue);
            customToast("success", "Form submitted successfully.");
          }
        })
        .catch((err) => customToast("error", err.message));
    };

    // isExistSurveyNumber(lastSurveyUuid, postData);
  };
  return (
    <div>
      <form>
        <Grid className={classes.form_container} container spacing={3}>
          <Grid className={classes.adddetails_header} item xs={12}>
            <Link to="/farmersdetails" style={{ textDecoration: "none" }}>
              <Typography
                variant="h5"
                className={classes.addDetailbtn_container}
                style={{ textDecoration: "none" }}
              >
                <ChevronLeftIcon className={classes.iconbtn} />
                Add farmer Details
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
                ref={farmerName}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={6}>
              <input
                className="farmer-input tamil"
                type="text"
                placeholder="தந்தையின் பெயர்"
                ref={fatherName}
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
                placeholder="கணவரின் பெயர்"
                ref={husbandName}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={6}>
              <select
                name="குழு"
                id="குழு"
                className="farmer-input"
                style={{ color: "#111B2B" }}
                value={formValue.farmer_group}
                onChange={(e) => setFarmerGroupId(e.target.value)}
              >
                <option value="" disabled selected hidden>
                  குழு
                </option>
                {farmerGroups.map((farmerGroup) => {
                  return (
                    <option
                      key={farmerGroup.id}
                      value={farmerGroup.groupName}
                      className={classes.drpdown}
                    >
                      {farmerGroup.groupName}
                    </option>
                  );
                })}
              </select>
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
                ref={DOB}
                autoComplete="off"
                style={{ color: colors.text2 }}
              />
            </Grid>
            <Grid item xs={8}>
              <input
                className="farmer-input"
                type="number"
                placeholder="கைபேசி எண்"
                ref={phoneNumber}
                autoComplete="off"
              />
            </Grid>
          </Grid>
          <Grid className={classes.forminput_container} item xs={12}>
            <input
              className="farmer-input"
              type="number"
              placeholder="ஆதார் எண்"
              ref={aadharNumber}
              autoComplete="off"
            />
          </Grid>
          <Grid className={classes.forminput_container} item xs={12}>
            <input
              className="farmer-input"
              type="text"
              placeholder="வாக்காளர் அடையாள எண்"
              autoComplete="off"
              ref={voterIdNumber}
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
                  // value={numberList[id].value}
                  // handleChange={(id, e) => handleSurveyChange(id, e)}
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
              ref={acre}
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
                value={formValue.gender}
                onChange={(e) =>
                  setFormValue({ ...formValue, gender: e.target.value })
                }
              >
                <option value="male" className={classes.drpdown}>
                  ஆண்
                </option>
                <option value="female" className={classes.drpdown}>
                  பெண்
                </option>
              </select>
            </Grid>
            <Grid item xs={8}>
              <input
                id="id"
                placeholder="கல்வி"
                className="farmer-input"
                type="text"
                autoComplete="off"
                ref={education}
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
              ref={address}
              style={{ padding: "15px" }}
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
                ref={village}
              />
            </Grid>
            <Grid item xs={6}>
              <input
                className="farmer-input tamil"
                type="text"
                autoComplete="off"
                ref={circle}
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
                ref={district}
                placeholder="மாவடஂடமஂ"
              />
            </Grid>

            <Grid item xs={4}>
              <input
                className="farmer-input"
                type="number"
                placeholder="பினஂகோடு"
                ref={pincode}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={4}>
              <select
                name="நில வகை"
                id="நில வகை"
                className="farmer-input"
                style={{ color: "#111B2B" }}
                value={formValue.landType}
                onChange={(e) =>
                  setFormValue({ ...formValue, landType: e.target.value })
                }
              >
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
                value={formValue.irrigationType}
                onChange={(e) =>
                  setFormValue({ ...formValue, irrigationType: e.target.value })
                }
              >
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
                value={formValue.farmerType}
                onChange={(e) =>
                  setFormValue({ ...formValue, farmerType: e.target.value })
                }
              >
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
                ref={cropType}
                placeholder="
                பயிர் வகை"
              />
            </Grid>
            <Grid item xs={6}>
              <input
                className="farmer-input tamil"
                type="number"
                ref={cattle}
                autoComplete="off"
                placeholder="கால்நடைகள்"
              />
            </Grid>
          </Grid>
          <Grid className={classes.forminput_container_btn} container>
            <button
              type="submit"
              className={classes.submit_btn}
              onClick={postFarmerData}
            >
              SUBMIT
            </button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddFarmerForm;
