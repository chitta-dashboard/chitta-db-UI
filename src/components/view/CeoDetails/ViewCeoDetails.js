import React, { useContext} from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
// import { customToast } from "../../widgets/Toast";
// import axios from "axios";
import config, { getAdminUser } from "../../../constants/config";
import Container from "@material-ui/core/Container";
import tempImg from "../../../assets/images/male.svg";
import Nerkathirlogo from "../../../assets/images/nerkathir_logo.png";
import { useStyles } from "../../../assets/styles";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import QRCode from "qrcode.react";
import { UserLoginContext } from "../../context/UserLoginContext";
import { useQuery } from "react-query";
import CustomButton  from "../../widgets/CustomButton";
import { Loader } from "../../widgets/Loader";
import { Error } from "../../widgets/Error";

const ViewCeoDetails = (props) => {
  const { loginType } = useContext(UserLoginContext);
  const classes = useStyles();
  const { match, history } = props;

  const { isLoading,isError, data, error } = useQuery(["getCeo", match.params.id], () =>
    getAdminUser(match.params.id)
  );

  function addDefaultSrc(ev) {
    ev.target.src = tempImg;
  }
  return (
    <>
      <div className={classes.admin_btncontainer}>
        <div style={{ textDecoration: "none" }}>

          <CustomButton className={classes.addDetailbtn_container} 
                icon={<ChevronLeftIcon className={classes.iconbtn} />}
                value="Back" onClick={() => history.goBack()}
            />
        </div>
        {loginType === "Administrator" && (
          <div className={classes.btnContainer_custom}>
            <CustomButton value="Edit" className={classes.export_btn}
              onClick={() => history.push(`/editCeo/${match.params.id}`)}
            />
          </div>
        )}
      </div>
      <Container fixed className={classes.adminCardContainer}>
        <Card className={classes.adminCardRoot}>
          <CardActionArea>
            {isLoading ? (
              <Loader className={classes.no_data} />
            ) : isError ? (
              <Error className={classes.no_data} 
                error={error.message.toString()}/>
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
export default ViewCeoDetails;
