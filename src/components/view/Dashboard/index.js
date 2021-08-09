import React from "react";
import {
  Container,
  Grid,
  Typography,
  Button,
  Card,
  Box,
  CardContent,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { NotificationSubCardData } from "../../../constants";

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
    background: "#36574C",
    color: "white",
    fontSize: "0.8rem",
    textTransform: "none",
  },
  dashboard_AlertContainer: {
    background: "#36574C",
    display: "flex",
    alignItems: "center",
    color: "white",
    padding: "0.8rem 1rem",
  },
  dashboard_topbarContainer: {
    height: "20vh",
    display: "flex",
    alignItems: "center",
  },
  dashboard_nameContainer: {
    padding: "1rem",
    "&:before": {
      width: "20px",
      height: "10px",
      background: "gray",
      position: "absolute",
      right: 0,
    },
  },
  dashboard_NotificationAndSummaryContainer: {
    display: "grid",
    gridTemplateColumns: "55% 45%",
  },
  dashboard_summaryContainer: {},
  dashboard_notificationSummaryTitle: {
    margin: "0.5rem 0",
  },
  dashboard_notificationCardTitle: {
    margin: "0.5rem 0",
  },
  dashboard_NotificationContainer: {},
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
}));

const Dashboard = () => {
  const classes = useStyles();
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

      <Grid container className={classes.dashboard_AlertContainer}>
        <Typography variant="p">
          Certification upload success : Remember to settle VAT before September
          14th, 2 days left for Submission Go to Certificates
        </Typography>
      </Grid>

      <Grid container className={classes.dashboard_topbarContainer}>
        <Grid item xs={3} className={classes.dashboard_nameContainer}>
          <Typography>HI,Mikeal</Typography>
          <Typography>Here's Your current stats</Typography>
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
            <CardContent>graph container</CardContent>
          </Card>
        </Grid>
        <Grid item className={classes.dashboard_NotificationContainer}>
          <Typography className={classes.dashboard_notificationCardTitle}>
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
