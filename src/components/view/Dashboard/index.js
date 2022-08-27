import React, { useContext, useState, useEffect } from "react";
import {
  Container,
  Grid,
  Typography,
  Card,
  Box,
  CardContent,
} from "@material-ui/core";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import { Chart } from "react-charts";
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
  getNotification,
} from "../../../constants/config";
import moment from "moment";
import { useQuery } from "react-query";
import { Loader } from "../../widgets/Loader";
import { Error } from "../../widgets/Error";
import { useDashboardStyles } from "../../../assets/styles/dashboard";

const Dashboard = () => {
  const classes = useDashboardStyles();
  // const [alertIsopen, setAlertIsOpen] = useState(true);
  const { loginType } = useContext(UserLoginContext);
  const [userName, setUserName] = useState("");
  const [farmersGroupCount, setFarmersGroupCount] = useState(0);
  const [farmerCount, setFarmerCount] = useState(0);

  const {
    isLoading,
    isError,
    data: notification,
    error,
  } = useQuery("notification", () => getNotification());

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
  }, [loginType]);

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
        <Grid
          item
          xs={6}
          className={classes.dashboard_AdminBtnContainer}
        ></Grid>
      </Grid>

      {/* {alertIsopen && (
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
      )} */}

      <Grid container className={classes.dashboard_topbarContainer}>
        <Grid item xs={6} className={classes.dashboard_welcomeContainer}>
          <img
            src={WavingHand}
            draggable="false"
            className={classes.dashboard_wavingIcon}
            alt="wavinghand Logo"
          />
          <div>
            {/* <div className={classes.intro_container}> */}
            <Typography>HI,{userName}</Typography>
            {/* </div> */}
            <Typography className={classes.dashboard_name}>
              Here's Your current stats
            </Typography>
            <div className={classes.dashboard_AdminBtn}>{loginType}</div>
          </div>
        </Grid>
        <Grid item xs={3} className={classes.dashboard_nameContainer}>
          <Typography>Group Count</Typography>
          <Typography>{farmersGroupCount}</Typography>
        </Grid>
        <Grid item xs={3} className={classes.dashboard_nameContainer}>
          <Typography>
            {loginType === "Administrator"
              ? "Farmers Count"
              : "Farmers Count in your group"}
          </Typography>
          <Typography>{farmerCount}</Typography>
        </Grid>
        {/* <Grid item xs={2} className={classes.dashboard_nameContainer}>
          <Typography>Award Generated</Typography>
          <Typography>5</Typography>
        </Grid>
        <Grid item xs={3} className={classes.dashboard_nameContainer}>
          <Typography>Certificate Verified</Typography>
          <Typography>10000</Typography>
        </Grid> */}
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
            {isLoading ? (
              <Loader className={classes.no_data} />
            ) : isError ? (
              <Error
                className={classes.no_data}
                error={error.message.toString()}
              />
            ) : (
              <>
                <CardContent>
                  {notification.map((data) => {
                    return (
                      <Box key={data.id} className={classes.dashboard_notificationSubCard}>
                        <Typography variant="p">*</Typography>
                        <Typography variant="p" spacing="2">
                          {data.notification}
                        </Typography>
                        <Typography variant="p"></Typography>
                        <Typography variant="p">
                          {moment(data.updatedAt).format("DD.MM.YYYY")}
                        </Typography>
                      </Box>
                    );
                  })}
                  {!notification.length && <NoRecordsFound />}
                </CardContent>
              </>
            )}
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
