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
import config, {
  getFarmerById,
  postFarmer,
  putFarmer,
  uploadFile,
} from "../../../constants/config";
import { colors } from "../../../theme";
import { uuid } from "../../../constants";

const initialFormValue = {
  surveyNoList: {
    "38997518-1bdc-28b5-2781-98baec87ffcd": { id: "", value: "" },
  },
  // gender: "male"
};
const AddFarmerForm = (Props) => {
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
  const cropType = useRef("");
  const cattle = useRef("");
  const [formValue, setFormValue] = useState(initialFormValue);
  const [farmerPhoto, setFarmerPhoto] = useState(null);
  const [farmerGroups, setFarmerGroups] = useState([]);
  const [farmerGroupId, setFarmerGroupId] = useState();
  const [farmerData, setFarmerData] = useState({});
  const [surveyArr, setSurveyArr] = useState([]);
  const { match } = Props;
  const dateOfBirth = farmerData.DOB?.split("/").join("-");

  useEffect(() => {
    if (match.params.id) {
      getFarmerById()
        .then((res) => {
          if (res && res.status === 200) {
            setFarmerData(res.data);
          }
        })
        .catch((err) => customToast("error", err.message));
    }
  }, [match.params.id]);
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

  const postFarmerData = (e) => {
    e.preventDefault();
    const params = {
      name: farmerName.current.value,
      fatherName: fatherName.current.value,
      husbandName: husbandName.current.value,
      farmerGroup: farmerGroupId,
      DOB: DOB.current.value !== "" ? DOB.current.value : null,
      phoneNumber: phoneNumber.current.value,
      aadharNumber: aadharNumber.current.value,
      voterIdNumber: voterIdNumber.current.value,
      // surveyArray: [{ survey_numbers: FinalSurveyNoIds }],
      surveyNo:
        SurveyNoArray[0].length === 0
          ? farmerData.surveyNo
          : SurveyNoArray.toString(),
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
    console.log(params);
    (farmerData.id ? putFarmer(params, farmerData.id) : postFarmer(params))
      .then((res) => {
        console.log(res);
        if (farmerPhoto) {
          uploadFile({
            ref: "farmer",
            refId: res.id,
            field: "userImg",
            files: farmerPhoto,
          })
            .then((data) => {
              setSurveyArr([]);
              setFormValue(initialFormValue);
              customToast("success", "Form submitted successfully.");
              history.goBack();
            })
            .catch((_err) => {
              console.log(_err);
            });
        } else {
          setSurveyArr([]);
          setFormValue(initialFormValue);
          customToast("success", "Form submitted successfully.");
          history.goBack();
        }
      })
      .catch((err) => customToast("error", err.message));
  };

  return (
    <div className={classes.form}>
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
                ref={farmerName}
                autoComplete="off"
                defaultValue={farmerData.name}
              />
            </Grid>
            <Grid item xs={6}>
              <input
                className="farmer-input tamil"
                type="text"
                placeholder="தந்தையின் பெயர்"
                ref={fatherName}
                autoComplete="off"
                defaultValue={farmerData.fatherName}
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
                defaultValue={farmerData.husbandName}
              />
            </Grid>
            <Grid item xs={6}>
              <select
                name="குழு"
                id="குழு"
                className="farmer-input"
                style={{ color: "#111B2B" }}
                value={formValue.farmerGroup}
                onChange={(e) => setFarmerGroupId(e.target.value)}
              >
                <option value="" disabled hidden>
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
                defaultValue={dateOfBirth}
              />
            </Grid>
            <Grid item xs={8}>
              <input
                className="farmer-input"
                type="number"
                placeholder="கைபேசி எண்"
                ref={phoneNumber}
                autoComplete="off"
                defaultValue={farmerData.phoneNumber}
              />
            </Grid>
          </Grid>
          <Grid className={classes.forminput_container} item xs={12}>
            <input
              className="farmer-input"
              type="text"
              placeholder="ஆதார் எண்"
              ref={aadharNumber}
              autoComplete="off"
              defaultValue={farmerData.aadharNumber}
            />
          </Grid>
          <Grid className={classes.forminput_container} item xs={12}>
            <input
              className="farmer-input"
              type="text"
              placeholder="வாக்காளர் அடையாள எண்"
              autoComplete="off"
              ref={voterIdNumber}
              defaultValue={farmerData.voterIdNumber}
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
              ref={acre}
              autoComplete="off"
              defaultValue={farmerData.acre}
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
                defaultValue={farmerData.education}
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
              defaultValue={farmerData.address}
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
                defaultValue={farmerData.village}
              />
            </Grid>
            <Grid item xs={6}>
              <input
                className="farmer-input tamil"
                type="text"
                autoComplete="off"
                ref={circle}
                placeholder="வட்டம்"
                defaultValue={farmerData.circle}
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
                defaultValue={farmerData.district}
              />
            </Grid>

            <Grid item xs={4}>
              <input
                className="farmer-input"
                type="number"
                placeholder="பினஂகோடு"
                ref={pincode}
                autoComplete="off"
                defaultValue={farmerData.pincode}
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
                defaultValue={farmerData.landType}
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
                value={formValue.irrigationType}
                onChange={(e) =>
                  setFormValue({ ...formValue, irrigationType: e.target.value })
                }
                defaultValue={farmerData.irrigationType}
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
                value={formValue.farmerType}
                onChange={(e) =>
                  setFormValue({ ...formValue, farmerType: e.target.value })
                }
                defaultValue={farmerData.farmerType}
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
                ref={cropType}
                placeholder="
                பயிர் வகை"
                defaultValue={farmerData.cropType}
              />
            </Grid>
            <Grid item xs={6}>
              <input
                className="farmer-input tamil"
                type="number"
                ref={cattle}
                autoComplete="off"
                placeholder="கால்நடைகள்"
                defaultValue={farmerData.cattle}
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
