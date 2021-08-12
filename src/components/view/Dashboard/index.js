import React, { useContext, useState, useEffect } from "react";
import {
  Container,
  Grid,
  Typography,
  Button,
  Card,
  Box,
  CardContent,
} from "@material-ui/core";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import { Chart } from "react-charts";
import { NotificationSubCardData } from "../../../constants";
import { NoRecordsFound } from "../../widgets/NoRecordsFound";
import WavingHand from "../../../assets/images/wavingHand.svg";
import { UserLoginContext } from "../../context/UserLoginContext";
import Cookies from "js-cookie";
import {
  getAdminUser,
  getFarmerById,
  getFarmers,
  getFarmersCount,
  getFarmersGroupCount,
  getNotification
} from "../../../constants/config";

const useStyles = makeStyles((theme) => ({
  dashboard_root: {
    flexGrow: 1,
  },
  dashboard_header: {
    height: "10vh",
    padding: "1rem 0",
  },
  dashboard_TitleContainer: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    justifyContent: "center",
  },
  dashboard_AdminBtnContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  dashboard_AdminBtn: {
    color: "white",
    background: "#36574C",
    fontSize: "0.8rem",
    textTransform: "none",
    "&:hover": {
      color: "#464E5F",
      background: "085c49",
      border: "1px solid #085c49",
    },
  },
  dashboard_AlertContainer: {
    background: "#36574C",
    display: "flex",
    alignItems: "center",
    color: "white",
    padding: "0.8rem 1rem",
    justifyContent: "space-between",
  },
  dashboard_alertText: {
    display: "flex",
    alignItems: "center",
  },
  dashboard_topbarContainer: {
    height: "20vh",
    display: "flex",
    alignItems: "center",
  },
  dashboard_nameContainer: {
    borderLeft: "1px solid rgba(0, 0, 0, 0.15)",
    padding: "1rem",
    overflowWrap: "break-word",
    "&:before": {
      width: "20px",
      height: "10px",
      background: "gray",
      position: "absolute",
      right: 0,
    },
  },
  dashboard_welcomeContainer: {
    padding: "1rem",
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
  },
  dashboard_wavingIcon: {
    height: "40px",
    width: "40px",
    marginRight: "0.5rem",
  },

  dashboard_NotificationAndSummaryContainer: {
    display: "grid",
    gridTemplateColumns: "55% 45%",
    "@media only screen and (max-width: 900px)": {
      gridTemplateColumns: "100%",
    },
  },
  dashboard_summaryContainer: {},
  dashboard_notificationSummaryTitle: {
    margin: "0.5rem 0",
  },
  dashboard_notificationCardTitle: {
    margin: "0.5rem 0",
    display: "flex",
    alignItems: "center",
  },
  dashboard_NotificationContainer: {},
  graphBarHeader: {
    display: "flex",
    float: "right",
    margin: "0.7rem",
  },
  graphBarHeading: {
    margin: "0rem 0.6rem",
    fontSize: "0.8rem",
  },
  dashboard_summaryGraphContainer: {
    minHeight: "50vh",
    marginRight: "1rem",
    borderRadius: "10px",
  },
  dashboard_notificationCardContainer: {
    maxHeight: "50vh",
    minHeight: "50vh",
    borderRadius: "10px",
    overflow: "scroll",
  },
  dashboard_notificationSubCard: {
    display: "grid",
    padding: "1rem",
    gridTemplateColumns: "8% 51% 41%",
    fontSize: "0.8rem",
  },
  dashboard_graphSubContainer: {
    width: "90%",
    height: "250px",
  },
  alertLogo: {
    height: "0.9rem",
    marginBottom: "0.1rem",
  },
  notificationLogo: {
    height: "1rem",
    marginBottom: "0.1rem",
  },
  dashboard_closeIcon: {
    height: "0.9rem",
    cursor: "pointer",
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const [alertIsopen, setAlertIsOpen] = useState(true);
  const { loginType } = useContext(UserLoginContext);
  const [userName, setUserName] = useState("");
  const [farmersGroupCount, setFarmersGroupCount] = useState(0);
  const [farmerCount, setFarmerCount] = useState(0);
  const [grpCheck, setGrpCheck] = useState("");
  const [notification, setNotification] = useState([]);

  useEffect(() => {
    getFarmersGroupCount().then((res) => setFarmersGroupCount(res));
    if (loginType === "Administrator") {
      getAdminUser(Cookies.get("userId"))
        .then((res) => {
          setUserName(res.name);
        })
        .catch((err) => console.log(err));
      getFarmersCount().then((res) => setFarmerCount(res));
    } else if (loginType === "Farmer") {
      getFarmerById(Cookies.get("userId"))
        .then((res) => {
          setUserName(res.name);
          let grpCheck = res.farmerGroup;
          getFarmers()
            .then((res) => {
              let tempArr = res
                .filter((value) => value.farmerGroup === grpCheck)
                .map((value) => {
                  return value;
                });
              setFarmerCount(tempArr.length);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }
  }, []);

  useEffect(() => {
    getNotification()
      .then((res) => {
        setNotification(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const series = React.useMemo(
    () => ({
      type: "area",
    }),
    []
  );
  const axes = React.useMemo(
    () => [
      { primary: true, position: "bottom", type: "time" },
      { position: "left", type: "linear", stacked: true },
    ],
    []
  );

  const data = React.useMemo(
    () => [
      {
        label: "Series 1",
        datums: [
          {
            x: new Date("2020-03-18T11:00:00.000Z"),
            y: 60,
          },
          {
            x: new Date("2020-03-18T11:30:00.000Z"),
            y: 23,
          },
          {
            x: new Date("2020-03-18T12:00:00.000Z"),
            y: 65,
          },
          {
            x: new Date("2020-03-18T12:30:00.000Z"),
            y: 84,
          },
          {
            x: new Date("2020-03-18T13:00:00.000Z"),
            y: 87,
          },
          {
            x: new Date("2020-03-18T13:30:00.000Z"),
            y: 84,
          },
          {
            x: new Date("2020-03-18T14:00:00.000Z"),
            y: 96,
          },
          {
            x: new Date("2020-03-18T14:30:00.000Z"),
            y: 88,
          },
          {
            x: new Date("2020-03-18T15:00:00.000Z"),
            y: 63,
          },
          {
            x: new Date("2020-03-18T15:30:00.000Z"),
            y: 60,
          },
        ],
      },
    ],
    []
  );
  // console.log(adminUserId);
  return (
    <Container className={classes.dashboard_root}>
      <Grid container className={classes.dashboard_header}>
        <Grid item xs={6} className={classes.dashboard_TitleContainer}>
          <Typography variant="h6">Dashboard</Typography>
          <Typography variant="p">
            An Overview of all your activities
          </Typography>
        </Grid>
        <Grid item xs={6} className={classes.dashboard_AdminBtnContainer}>
          <Button className={classes.dashboard_AdminBtn}>{loginType}</Button>
        </Grid>
      </Grid>

      {alertIsopen && (
        <Grid container className={classes.dashboard_AlertContainer}>
          <Box className={classes.dashboard_alertText}>
            <NotificationsActiveIcon className={classes.alertLogo} />
            Certification upload success : Remember to settle VAT before
            September 14th, 2 days left for Submission Go to Certificates
          </Box>
          <CloseIcon
            className={classes.dashboard_closeIcon}
            onClick={() => setAlertIsOpen(false)}
          />
        </Grid>
      )}

      <Grid container className={classes.dashboard_topbarContainer}>
        <Grid item xs={3} className={classes.dashboard_welcomeContainer}>
          <img
            src={WavingHand}
            className={classes.dashboard_wavingIcon}
            alt="wavinghand Logo"
          />
          <div>
            <Typography>HI,{userName}</Typography>
            <Typography>Here's Your current stats</Typography>
          </div>
        </Grid>
        <Grid item xs={2} className={classes.dashboard_nameContainer}>
          <Typography>Farmer Group Count</Typography>
          <Typography>{farmersGroupCount}</Typography>
        </Grid>
        <Grid item xs={2} className={classes.dashboard_nameContainer}>
          <Typography>
            {loginType === "Administrator"
              ? "Number of Farmers"
              : "Number of Farmers in your group"}
          </Typography>
          <Typography>{farmerCount}</Typography>
        </Grid>
        <Grid item xs={2} className={classes.dashboard_nameContainer}>
          <Typography>Award Generated</Typography>
          <Typography>5</Typography>
        </Grid>
        <Grid item xs={3} className={classes.dashboard_nameContainer}>
          <Typography>Certificate Verified</Typography>
          <Typography>10000</Typography>
        </Grid>
      </Grid>

      <Grid
        container
        className={classes.dashboard_NotificationAndSummaryContainer}
      >
        <Grid item className={classes.dashboard_summaryContainer}>
          <Typography className={classes.dashboard_notificationSummaryTitle}>
            Summary
          </Typography>
          <Card className={classes.dashboard_summaryGraphContainer}>
            <div className={classes.graphBarHeader}>
              <Typography className={classes.graphBarHeading}>
                Organization
              </Typography>
              <Typography className={classes.graphBarHeading}>
                Certificate
              </Typography>
              <Typography className={classes.graphBarHeading}>Award</Typography>
            </div>
            <CardContent className={classes.dashboard_graphSubContainer}>
              <Chart data={data} series={series} axes={axes} tooltip />
            </CardContent>
          </Card>
        </Grid>
        <Grid item className={classes.dashboard_NotificationContainer}>
          <Typography className={classes.dashboard_notificationCardTitle}>
            <NotificationsActiveIcon className={classes.notificationLogo} />
            Notification
          </Typography>
          <Card className={classes.dashboard_notificationCardContainer}>
            <CardContent>
              {notification.map((data) => {
                return (
                  <Box className={classes.dashboard_notificationSubCard}>
                    <Typography variant="p">*</Typography>
                    <Typography variant="p" spacing="2">{data.notification}</Typography>
                    <Typography variant="p">{data.updatedAt}</Typography>
                  </Box>
                );
              })}
              {!notification.length && <NoRecordsFound />}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
