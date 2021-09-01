import React, { useContext, useState, useLayoutEffect } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import config, { getFarmerById } from "../../../constants/config";
import Container from "@material-ui/core/Container";
import tempImg from "../../../assets/images/male.svg";
import Nerkathirlogo from "../../../assets/images/nerkathir_logo.png";
import { useStyles } from "../../../assets/styles";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import QRCode from "qrcode.react";
import { UserLoginContext } from "../../context/UserLoginContext";
import { useQuery } from "react-query";
import CustomButton from "../../widgets/CustomButton";
import { Loader } from "../../widgets/Loader";
import { Error } from "../../widgets/Error";
import CardToPdf from "../../widgets/CardToPdf";
import { saveAs } from "file-saver";
import { pdf } from "@react-pdf/renderer";

const ViewFarmerCard = (props) => {
  const { loginType } = useContext(UserLoginContext);
  const classes = useStyles();
  const { match, history } = props;

  const { data, isLoading, isError, error } = useQuery(
    ["getFarmer", match.params.id],
    () => match.params.id && getFarmerById(match.params.id)
  );
  console.log("match.params.id", match.params.id);
  const [qrImage, setQrImage] = useState();

  useLayoutEffect(() => {
    if (data) {
      setTimeout(() => {
        const qrCodeCanvas = document.querySelector("canvas");
        const qrCodeDataUri = qrCodeCanvas?.toDataURL("image/jpg", 0.3);
        setQrImage(qrCodeDataUri);
      }, 2000);
    }
  }, [data]);

  function addDefaultSrc(ev) {
    ev.target.src = tempImg;
  }

  return (
    <>
      <div className={classes.admin_btncontainer}>
        <div style={{ textDecoration: "none" }}>
          <CustomButton
            className={classes.addDetailbtn_container}
            icon={<ChevronLeftIcon className={classes.iconbtn} />}
            value="Back"
            onClick={() => history.goBack()}
          />
        </div>
        {loginType === "Administrator" && (
          <div className={classes.btnContainer_custom}>
            <CustomButton
              value={"Download"}
              className={classes.export_btn}
              onClick={async () => {
                const doc = <CardToPdf data={data} qr={qrImage} />;
                const asPdf = pdf([]);
                asPdf.updateContainer(doc);
                const blob = await asPdf.toBlob();
                saveAs(blob, `${data.name}.pdf`);
              }}
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
              <Error
                className={classes.no_data}
                error={error.message.toString()}
              />
            ) : (
              <CardContent>
                <img
                  draggable="false"
                  src={Nerkathirlogo}
                  alt="Nerkathir logo"
                  className={classes.watermark}
                  draggable={false}
                />
                <div className={classes.adminContent}>
                  <div>
                    <img
                      draggable="false"
                      className={classes.adminCardImage}
                      src={
                        data?.userImg
                          ? `${config.app.APP_API_URL}${data.userImg.url}`
                          : tempImg
                      }
                      draggable={false}
                      alt="Farmer Profile"
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
                      பெயர் : {data?.name}{" "}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                      கைபேசி எண் : {data?.phoneNumber}{" "}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                      பிறந்த தேதி : {data?.DOB}{" "}
                    </Typography>
                  </div>
                  <div>
                    <QRCode
                      value={JSON.stringify(
                        {
                          id: data?.id,
                          name: data?.name,
                          phoneNumber: data?.phoneNumber,
                        },
                        null,
                        2
                      )}
                      className={classes.adminCardQr}
                    />
                  </div>
                </div>
              </CardContent>
            )}
          </CardActionArea>
        </Card>
      </Container>
    </>
  );
};
export default ViewFarmerCard;
