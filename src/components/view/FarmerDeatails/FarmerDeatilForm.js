import React, { useContext, useState } from "react";
// import clsx from "clsx";
import { pdf,  } from "@react-pdf/renderer";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { useStyles } from "../../../assets/styles";
import {
  FarmerDetailsList,
  getFormattedDate,
  toGetTamilGender,
} from "../../../constants";
import config, { deleteFarmer, getFarmerById, putFarmer, uploadFile } from "../../../constants/config";
import { customToast } from "../../widgets/Toast";
import { useHistory } from "react-router-dom";
import { UserLoginContext } from "../../context/UserLoginContext";
import { useMutation, useQuery } from "react-query";
import CustomButton from "../../widgets/CustomButton";
import { Error } from "../../widgets/Error";
import Nerkathirlogo from "../../../assets/images/nerkathir_logo.png";
// import CardToPdf from "../../widgets/CardToPdf";
import FarmerDetailsToPdf from "./FarmerDetailsToPdf";
import { saveAs } from "file-saver";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";

const FarmerDeatilForm = (Props) => {
  const { loginType } = useContext(UserLoginContext);
  const { match } = Props;
  const history = useHistory();
  const classes = useStyles();
  const [farmerPhoto, setFarmerPhoto] = useState(null);

  let initialObj = {};
  const {
    data = initialObj,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery(
    ["getFarmer", match.params.id],
    () => match.params.id && getFarmerById(match.params.id)
  );
  const editFarmer = useMutation((data) => putFarmer(data, match.params.id), {
    onSuccess: (data) => farmerPicHandler(data),
    onError: (error) => customToast("error", "Former image upload failed."),
  });

  const d = new Date();
  const getFarmerData = (type) => {
    switch (type) {
      case "gender":
        return toGetTamilGender(data[type]);
      case "DOB":
        return data[type] ? getFormattedDate(data[type]) : "";
      case "surveyArray": {
        const surveyNoList =
          data[type] && data[type].length
            ? data[type][0].survey_numbers.map((e) => e.surveyNo)
            : [];

        return surveyNoList.join();
      }
      default:
        return data[type];
    }
  };

  const formerDeleteHandler = (id) => {
    deleteFarmer(id).then((data) => {
      customToast("success", "Former Deleted successfully.");
      history.goBack();
    });
  };

  const _onProfilePicChange =(e) => {
     e.preventDefault();
    let file = e.target.files[0];
    setFarmerPhoto(file);
    getFarmerById(match.params.id).then((val)=>{
      editFarmer.mutate(val);
    }).catch((e)=>{
      console.log("err",e)
    });
  };

  const farmerPicHandler = (data) => {
    const success = () => {
      customToast("success", "Former image upload successfully ");
      refetch();
    };
    if (farmerPhoto) {
      uploadFile({
        ref: "farmer",
        refId: data.id,
        field: "userImg",
        files: farmerPhoto,
      })
        .then((data) => {
          success();
        })
        .catch((_err) => {
          console.log(_err);
        });
    }
  };

  return (
    <>
      <div className={classes.farmerDetail_root}>
        <div className={classes.user_btncontainer}>
          <div>
            <CustomButton
              className={classes.addDetailbtn_container}
              icon={<ChevronLeftIcon className={classes.iconbtn} />}
              value="Back"
              onClick={() => history.goBack()}
            />
          </div>
          <div className={classes.btnContainer_custom}>
            <button
              className={classes.export_btn}
              style={{ textDecoration: "none" }}
              onClick={() =>
                Props.history.push(`/farmerCard/${match.params.id}`)
              }
            >
              Id Card
            </button>
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
            {/* <PDFDownloadLink
              document={
                <FarmerDetailsToPdf
                  getFarmerData={getFarmerData}
                  farmerData={data}
                />
              }
              fileName={`${data.name}.pdf`}
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
                  </button>
                );
              }}
            </PDFDownloadLink> */}
            <CustomButton
              value={"Download"}
              className={classes.export_btn}
              onClick={async () => {
                const doc = (
                  <FarmerDetailsToPdf
                    getFarmerData={getFarmerData}
                    farmerData={data}
                  />
                );
                const asPdf = pdf([]); // {} is important, throws without an argument
                asPdf.updateContainer(doc);
                const blob = await asPdf.toBlob();
                saveAs(blob, `${data.name}.pdf`);
              }}
            />
          </div>
        </div>
        <div className={classes.userdetail_container}>
          <div className={classes.user_header}>
            <div className={classes.user_title}>
              <h1 className={classes.main_title}>
                நெற்கதிர் உழவர் உற்பத்தியாளர் நிறுவனம்
              </h1>
              <h4 className={classes.nabard_title}>நபார்டு </h4>
              <h4 className={classes.district_title}>
                கள்ளக்குறிச்சி மாவட்டம்{" "}
              </h4>
              <h4 className={classes.formtitle_title}>
                உறுப்பினர் விண்ணப்பம்{" "}
              </h4>
            </div>
            <div className={classes.user_profilepic}>
              <img
                src={
                  data?.userImg?.url
                    ? `${config.app.APP_API_URL}${data.userImg.url}`
                    : data.gender === "female"
                    ? require("../../../assets/images/female.svg").default
                    : require("../../../assets/images/male.svg").default
                }
                alt=""
                draggable="false"
                className={classes.user_profile}
              ></img>
              <div
                className={classes.user_profile_upload}
              >
                <input
                  style={{ display: "none" }}
                  accept="image/*"
                  id="contained-button-file"
                  onChange={_onProfilePicChange}
                  type="file"
                />
                <label htmlFor="contained-button-file">
                  <IconButton
                    style={{ color: "white", height: "25px", width: "25px" }}
                    aria-label="upload picture"
                    component="span"
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                </label>
              </div>
            </div>
          </div>
          <div className={classes.user_subheader}>
            <p className={classes.user_subheadersubmain}>
              ஒருங்கிணைப்பாளர்:மஹிமா பசுமை அறக்கட்டளை, எண்.66/c, கிழக்கு தெரு,
              கச்சிராயப்பாளையம் - 606207
            </p>
            <p className={classes.user_subheadersubmainbelow}>
              நிர்வாக அலுவலகம்:எண்.6, காந்திரோடு, கள்ளக்குறிச்சி - 606202
            </p>
            <div
              className={classes.formnum_container}
              style={{ marginTop: "1rem" }}
            >
              <p className={classes.formnum_text}>
                உறுப்பினர் எண் <span>: NER-FPC-{data.membershipId}</span>
              </p>
              <p className={classes.formnum_text}>
                நாள் :{" "}
                <span>
                  {`${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`}
                </span>
              </p>
            </div>
          </div>
          <hr className={classes.user_border} />
          {!isLoading ? (
            <div className={classes.user_formcontent}>
              <div className={classes.farmerDetailWatermark}>
                <img
                  src={Nerkathirlogo}
                  alt="Nerkathir logo"
                  draggable="false"
                  className={classes.farmerDetailWatermark_img}
                />
              </div>
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
          {isError && (
            <Error
              className={classes.no_data}
              error={error.message.toString()}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default FarmerDeatilForm;
