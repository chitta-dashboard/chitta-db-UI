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
import { Chart } from "react-charts";
import { NotificationSubCardData } from "../../../constants";
import { useStyles } from "../../../assets/styles";

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
