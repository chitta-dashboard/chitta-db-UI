import { makeStyles } from "@material-ui/core/styles";

export const useDashboardStyles = makeStyles((theme) => ({
  dashboard_root: {
    flexGrow: 1,
    overflow: "scroll",
    height: "94vh",
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
    fontSize: "0.7rem",
    textTransform: "none",
    padding: "0.3rem",
    display: "inline",
  },
  intro_container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
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

  dashboard_summaryGraphContainer: {
    // maxHeight: "50vh",
    // minHeight: "46vh",
    height: "46vh",
    marginRight: "1rem",
    borderRadius: "10px",
    boxShadow: "none",
  },
  dashboard_notificationCardContainer: {
    // maxHeight: "50vh",
    // minHeight: "46vh",
    height: "46vh",
    borderRadius: "10px",
    overflow: "scroll",
    boxShadow: "none",
  },
  dashboard_notificationSubCard: {
    display: "grid",
    padding: "1rem",
    gridTemplateColumns: "8% 60% 5% 25%",
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
  no_data: {
    width: "100%",
    display: "grid",
    placeItems: "center",
  },
}));
