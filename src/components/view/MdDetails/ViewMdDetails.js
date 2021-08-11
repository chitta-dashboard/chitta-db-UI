import React , { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { customToast } from "../../widgets/Toast";
import { useHistory } from "react-router-dom";
import axios from "axios";
import config from "../../../constants/config";
import Container from '@material-ui/core/Container';
import tempImg from "../../../assets/images/male.svg";
import { useStyles } from "../../../assets/styles";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

const MdDetailsCard =(Props)=> {
  const classes = useStyles();
  const { match } = Props;
  const history = useHistory();
  const [adminData, setAdminData] = useState({});

  useEffect(() => {
    if (match.params.id) {
      axios
        .get(`${config.app.APP_API_URL}/adminusers/${match.params.id}`)
        .then((res) => {
          if (res && res.status === 200) {
            setAdminData(res.data);
          }
        })
        .catch((err) => customToast("error", err.message));
    }
  }, [match.params.id]);

  const goBackAdmin =()=>{
    history.goBack();
}
function addDefaultSrc(ev) {
  ev.target.src = tempImg;
}
  return (
    <>
    <div className={classes.admin_btncontainer}>
        <div style={{ textDecoration: "none" }}>
          <Button  onClick={goBackAdmin} className={classes.addDetailbtn_container}>
          <ChevronLeftIcon className={classes.iconbtn} />
          Back
        </Button>
        </div>
        <div className={classes.btnContainer_custom}>
          <button
            className={classes.export_btn}
            style={{ textDecoration: "none" }}
            onClick={() => Props.history.push(`/editMd/${match.params.id}`)}
          >
            Edit
          </button>
        </div>
      </div>
    <Container fixed className={classes.adminCardContainer}>
     <Card className={classes.adminCardRoot}> 
      <CardActionArea>
        <CardContent >
        <div  className={classes.adminContent}> 
        <div>
          <img
          className={classes.adminCardImage}
          alt="Md Profile Picture"
          src={ adminData?.picture
            ? `${config.app.APP_API_URL}${adminData.picture.url}`
            : tempImg }
          onError={addDefaultSrc}
          /></div>
          <div className={classes.details}>
          <h2 className={classes.adminHeaderTitle}>
              Nerkathir Farmer Producer <br />Company Limited
          </h2>
          <div className={classes.HeaderSub}>
              <p>Reg No:139086 &nbsp;&nbsp; CIN:UO1409TN2020PTC139086</p>
            </div>
        </div>
          </div>
          <div  className={classes.adminContent}> 
          <div className={classes.adminDetails}>
          <Typography variant="body1" color="textSecondary" >
        பெயர் : {adminData.name} </Typography>
        <Typography variant="body1" color="textSecondary" >
        கைபேசி எண் : {adminData.phoneNumber} </Typography>
        <Typography variant="body1" color="textSecondary" >
        பிறந்த தேதி : {adminData.DOB} </Typography>
        <Typography variant="body1" color="textSecondary" >
        தகுதி : {adminData.qualification} </Typography>
        </div>
        <div><img
          className={classes.adminCardImage}
          alt="QR Code"
          src={ tempImg }
          onError={addDefaultSrc}
          /></div>
          </div>       
        </CardContent>
      </CardActionArea>
    </Card>
    </Container>
    </>
  );
}
export default MdDetailsCard 