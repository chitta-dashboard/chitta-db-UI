import React, { useContext, useEffect, useState } from "react";
import clsx from "clsx";
import axios from "axios";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Typography } from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { useStyles } from "../../../assets/styles";
import {
  FarmerDetailsList,
  getFormattedDate,
  toGetTamilGender,
} from "../../../constants";
import config, { deleteFarmer, getFarmerById } from "../../../constants/config";
import { customToast } from "../../widgets/Toast";
import FarmerDetailsToPdf from "./FarmerDetailsToPdf";
import { useHistory } from "react-router-dom";
import { UserLoginContext } from "../../context/UserLoginContext";
// import BackButton from "../../widgets/BackButton";
import Button from "../../widgets/Button";
import { useQuery } from "react-query";

const FarmerDeatilForm = (Props) => {
  const { loginType } = useContext(UserLoginContext);
  const { match } = Props;
  const history = useHistory();
  const classes = useStyles();
  const [farmerData, setFarmerData] = useState({});
  const [loader, setLoader] = useState(true);

  const { data } = useQuery(
    ["getFarmer", match.params.id],
    () => match.params.id && getFarmerById(match.params.id)
  );

  console.log(data);
  useEffect(() => {
    if (match.params.id) {
      axios
        .get(`${config.app.APP_API_URL}/farmers/${match.params.id}`)
        .then((res) => {
          if (res && res.status === 200) {
            setFarmerData(res.data);
            setLoader(false);
          }
        })
        .catch((err) => customToast("error", err.message));
    }
  }, [match.params.id]);

  const getFarmerData = (type) => {
    switch (type) {
      case "gender":
        return toGetTamilGender(farmerData[type]);
      case "DOB":
        return farmerData[type] ? getFormattedDate(farmerData[type]) : "";
      case "surveyArray": {
        const surveyNoList =
          farmerData[type] && farmerData[type].length
            ? farmerData[type][0].survey_numbers.map((e) => e.surveyNo)
            : [];

        return surveyNoList.join();
      }
      default:
        return farmerData[type];
    }
  };

  const formerDeleteHandler = (id) => {
    deleteFarmer(id).then((data) => {
      customToast("success", "Former Deleted successfully.");
      history.goBack();
    });
  };

  return (
    <>
      <div className={classes.user_btncontainer}>
        <div>
          <Button
            className={classes.addDetailbtn_container}
            icon={<ChevronLeftIcon className={classes.iconbtn} />}
            value="Back"
            onClick={() => history.goBack()}
          />
        </div>
        <div className={classes.btnContainer_custom}>
          {loginType === "Administrator" ? (
            <>
              <button
                className={classes.export_btn}
                style={{ textDecoration: "none" }}
                onClick={() =>
                  Props.history.push(`editfarmer/${match.params.id}`)
                }
              >
                Edit
              </button>
              <button
                className={classes.export_btn}
                style={{ textDecoration: "none" }}
                onClick={() => formerDeleteHandler(match.params.id)}
              >
                Delete
              </button>
            </>
          ) : (
            <div style={{ width: "100%" }}></div>
          )}
          <PDFDownloadLink
            document={
              <FarmerDetailsToPdf
                getFarmerData={getFarmerData}
                farmerData={farmerData}
              />
            }
            fileName={`${farmerData.name}.pdf`}
            style={{ textDecoration: "none" }}
          >
            {({ loading }) => {
              return (
                <button
                  className={clsx(
                    classes.export_btn,
                    loading ? classes.loading : ""
                  )}
                  disabled={loading}
                >
                  Download
                  {/* {loading ? (
                    <div style={{ background: "red" }}>
                      {" "}
                      <CircularProgress size={20} />
                    </div>
                  ) : (
                    "Download"
                  )} */}
                </button>
              );
            }}
          </PDFDownloadLink>
        </div>
      </div>
      <div className={classes.userdetail_container}>
        <div className={classes.user_header}>
          <div className={classes.user_title}>
            <h1 className={classes.main_title}>உழவர் உற்பத்தியாளர் நிறுவனம்</h1>
            <h4 className={classes.nabard_title}>நபார்டு </h4>
            <h4 className={classes.district_title}>விழுப்புரம் மாவட்டம் </h4>
            <h4 className={classes.formtitle_title}>உறுப்பினர் விண்ணப்பம் </h4>
          </div>
          <div className={classes.user_profilepic}>
            <img
              src={
                farmerData?.userImg?.url
                  ? `${config.app.APP_API_URL}${farmerData.userImg.url}`
                  : farmerData.gender === "female"
                  ? require("../../../assets/images/female.svg").default
                  : require("../../../assets/images/male.svg").default
              }
              alt=""
              className={classes.user_profile}
            ></img>
          </div>
        </div>
        <div className={classes.user_subheader}>
          <p className={classes.user_subheadermain}>
            ஊர் பெயர் <span>: கோவை </span>
          </p>
          <p className={classes.user_subheadersubmain}>
            ஒருங்கிணைப்பாளர்:மஹிமா பசுமை அறக்கட்டளை, எண்.66/c, கிழக்கு தெரு,
            கச்சிராயப்பாளையம் - 606207
          </p>
          <p className={classes.user_subheadersubmainbelow}>
            நிர்வாக அலுவலகம்:எண்.6, காந்திரோடு, கள்ளக்குறிச்சி - 606202
          </p>
          <div className={classes.formnum_container}>
            <p className={classes.formnum_text}>
              விண்ணப்ப எண் <span>: 12343</span>
            </p>
            <p className={classes.formnum_text}>
              நாள் :{" "}
              <span>
                {farmerData.created_at
                  ? `${getFormattedDate(farmerData.created_at)}`
                  : "00/0/0000"}
              </span>
            </p>
          </div>
        </div>
        <hr className={classes.user_border} />
        {!loader ? (
          <div className={classes.user_formcontent}>
            {FarmerDetailsList.map((user) => {
              return (
                <div key={user.id} className={classes.contentrow_container}>
                  <div className={classes.content_key}>{user.key}</div>
                  <span>:</span>
                  <span className={classes.content_value}>
                    {getFarmerData(user.name)}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <div className={classes.loader}>சற்று காத்திருக்கவும்...</div>
        )}
      </div>
    </>
  );
};

export default FarmerDeatilForm;
