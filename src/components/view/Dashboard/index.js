import React, { useState } from "react";
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
import WavingHand from "../../../assets/images/wavingHand.svg";

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
  },
  dashboard_wavingIcon: {
    height: "40px",
    width: "40px",
    marginRight: "0.5rem",
  },

  dashboard_NotificationAndSummaryContainer: {
    display: "grid",
    gridTemplateColumns: "55% 45%",
    "@media only screen and (max-width: 900px)" :{
      gridTemplateColumns: "100%"
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
    gridTemplateColumns: "10% 70% 20%",
    fontSize: "0.8rem",
  },
  dashboard_graphSubContainer: {
    width: "500px",
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
          <Button className={classes.dashboard_AdminBtn}>Administrator</Button>
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
            <Typography>HI,Mikeal</Typography>
            <Typography>Here's Your current stats</Typography>
          </div>
        </Grid>
        <Grid item xs={2} className={classes.dashboard_nameContainer}>
          <Typography>Org.Registered</Typography>
          <Typography>200</Typography>
        </Grid>
        <Grid item xs={2} className={classes.dashboard_nameContainer}>
          <Typography>Certificate Issued</Typography>
          <Typography>1250</Typography>
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
              {NotificationSubCardData.map((notification) => {
                return (
                  <Box className={classes.dashboard_notificationSubCard}>
                    <Box>.</Box>
                    <Box>{notification.notificationTitle}</Box>
                    <Box>{notification.date}</Box>
                  </Box>
                );
              })}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
