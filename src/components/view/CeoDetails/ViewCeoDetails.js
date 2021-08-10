import React , { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { customToast } from "../../widgets/Toast";
import { useHistory } from "react-router-dom";
import axios from "axios";
import config from "../../../constants/config";
import Container from '@material-ui/core/Container';
import tempImg from "../../../assets/images/male.svg";

const useStyles = makeStyles({
  container:{
    weight:"100vh",
    height:"100vh",
    display:"grid",
    placeContent:"center"
  },
  root: {
    minWidth: "300px",
  },
  media: {
    height: 140,
  },
  image: {
    width: 128,
    height: 128,
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  content:{
    margin: '0px 27px'
  },
  footer:{
    justifyContent:"space-evenly"
  }
});

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
  return (
    <Container fixed className={classes.container}>
    <Card className={classes.root}> 
      <CardActionArea>
            <img className={classes.image} src={ adminData?.picture
                ? `${config.app.APP_API_URL}${adminData.picture.url}`
                : tempImg } />
        <CardContent >
        <Typography variant="body1" color="textSecondary" className={classes.content}>
        பெயர் : {adminData.name} </Typography>
        <Typography variant="body1" color="textSecondary" className={classes.content}>
        கைபேசி எண் : {adminData.phoneNumber} </Typography>
        <Typography variant="body1" color="textSecondary" className={classes.content}>
        பிறந்த தேதி : {adminData.DOB} </Typography>
        <Typography variant="body1" color="textSecondary" className={classes.content}>
        தகுதி : {adminData.qualification} </Typography>
          
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.footer} >
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