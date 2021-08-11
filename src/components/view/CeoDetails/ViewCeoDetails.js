import React , { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { customToast } from "../../widgets/Toast";
import { useHistory } from "react-router-dom";
import axios from "axios";
import config from "../../../constants/config";
import Container from '@material-ui/core/Container';
import tempImg from "../../../assets/images/male.svg";
import { useStyles } from "../../../assets/styles";

const CeoDetailsCard =(Props)=> {
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
    <Container fixed className={classes.adminCardContainer}>
    <Card className={classes.adminCardRoot}> 
      <CardActionArea>
        <CardContent >
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          className={classes.adminCardImage}
          image={ adminData?.picture
            ? `${config.app.APP_API_URL}${adminData.picture.url}`
            : tempImg }
          title="Contemplative Reptile"
          onError={addDefaultSrc}
        />
        <Typography variant="body1" color="textSecondary" className={classes.adminContent}>
        பெயர் : {adminData.name} </Typography>
        <Typography variant="body1" color="textSecondary" className={classes.adminContent}>
        கைபேசி எண் : {adminData.phoneNumber} </Typography>
        <Typography variant="body1" color="textSecondary" className={classes.adminContent}>
        பிறந்த தேதி : {adminData.DOB} </Typography>
        <Typography variant="body1" color="textSecondary" className={classes.adminContent}>
        தகுதி : {adminData.qualification} </Typography>
          
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.adminCardFooter} >
        <Button size="small" color="primary" onClick={goBackAdmin}>
          Back
        </Button>
        <Button size="small" color="primary" 
                onClick={() => Props.history.push(`/editCeo/${adminData.id}`)}>
          Edit
        </Button>
      </CardActions>
    </Card>
    </Container>
  );
}
export default CeoDetailsCard 