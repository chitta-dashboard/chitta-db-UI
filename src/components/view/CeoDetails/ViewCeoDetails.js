import React, { useContext, useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { customToast } from "../../widgets/Toast";
import { useHistory } from "react-router-dom";
import axios from "axios";
import config, { getAdminUser } from "../../../constants/config";
import Container from "@material-ui/core/Container";
import tempImg from "../../../assets/images/male.svg";
import Nerkathirlogo from "../../../assets/images/nerkathir_logo.png";
import { useStyles } from "../../../assets/styles";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import QRCode from "qrcode.react";
import { UserLoginContext } from "../../context/UserLoginContext";
import { useQuery } from "react-query";

const CeoDetailsCard = (props) => {
  const { loginType } = useContext(UserLoginContext);
  const classes = useStyles();
  const { match, history } = props;

  const { status, data, error } = useQuery(["getCeo", match.params.id], () =>
    getAdminUser(match.params.id)
  );

  const goBackAdmin = () => {
    history.goBack();
  };
  function addDefaultSrc(ev) {
    ev.target.src = tempImg;
  }
  return (
    <>
      <div className={classes.admin_btncontainer}>
        <div style={{ textDecoration: "none" }}>
          <Button
            onClick={goBackAdmin}
            className={classes.addDetailbtn_container}
          >
            <ChevronLeftIcon className={classes.iconbtn} />
            Back
          </Button>
        </div>
        {loginType === "Administrator" && (
          <div className={classes.btnContainer_custom}>
            <button
              className={classes.export_btn}
              style={{ textDecoration: "none" }}
              onClick={() => props.history.push(`/editCeo/${match.params.id}`)}
            >
              Edit
            </button>
          </div>
        )}
      </div>
      <Container fixed className={classes.adminCardContainer}>
        <Card className={classes.adminCardRoot}>
          <CardActionArea>
            {status === "loading" ? (
              <p className={classes.no_data}>Loading...</p>
            ) : status === "error" ? (
              customToast("error", error.message)
            ) : (
              <>
                <CardContent>
                  <img
                    src={Nerkathirlogo}
                    alt="Nerkathir logo"
                    className={classes.watermark}
                  />
                  <div className={classes.adminContent}>
                    <div>
                      <img
                        className={classes.adminCardImage}
                        src={
                          data?.picture
                            ? `${config.app.APP_API_URL}${data.picture.url}`
                            : tempImg
                        }
                        alt="Ceo Profile Picture"
                        onError={addDefaultSrc}
                      />
                    </div>
                    <div className={classes.details}>
                      <h2 className={classes.adminHeaderTitle}>
                        Nerkathir Farmer Producer <br />
                        Company Limited
                      </h2>
                      <div className={classes.HeaderSub}>
                        <p>
                          Reg No:139086 &nbsp;&nbsp; CIN:UO1409TN2020PTC139086
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className={classes.adminContent}>
                    <div className={classes.adminDetails}>
                      <Typography variant="body1" color="textSecondary">
                        பெயர் : {data.name}{" "}
                      </Typography>
                      <Typography variant="body1" color="textSecondary">
                        கைபேசி எண் : {data.phoneNumber}{" "}
                      </Typography>
                      <Typography variant="body1" color="textSecondary">
                        பிறந்த தேதி : {data.DOB}{" "}
                      </Typography>
                      <Typography variant="body1" color="textSecondary">
                        தகுதி : {data.qualification}{" "}
                      </Typography>
                    </div>
                    <div>
                      <QRCode
                        value={JSON.stringify(
                          {
                            id: data.id,
                            name: data.name,
                            phoneNumber: data.phoneNumber,
                          },
                          null,
                          2
                        )}
                        className={classes.adminCardImage}
                      />
                    </div>
                  </div>
                </CardContent>
              </>
            )}
          </CardActionArea>
        </Card>
      </Container>
    </>
  );
};
export default CeoDetailsCard;
