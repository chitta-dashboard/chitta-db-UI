import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 240;

export const useStyles = makeStyles((theme) => ({
  chitta_logo: {
    width: "6rem",
  },

  Layout_root: {
    display: "flex",
  },

  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: "#111B2B",
    boxShadow: "none",
  },

  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },

  menuButton: {
    marginRight: theme.spacing(2),
  },

  hide: {
    display: "none",
  },

  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },

  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#111B2B",
    border: 0,
  },

  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },

  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
    backgroundColor: "#111B2B",
    height: "100%",
    minHeight: "100vh",
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },

  //   farmerdetails page
  farmerdetails_root: {
    flexGrow: 1,
    width: "95%",
    position: "relative",
    marginLeft: "auto",
    marginRight: "auto",
  },

  add_btn_container: {
    backgroundColor: "#111E2F",
    boxShadow: "20px 20px 60px #0e1725,-20px -20px 60px #141f31",
    height: "10vh",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },

  farmerdetails_subheader: {
    height: "10vh",
    width: "100%",
    marginBottom: "1rem",
    display: "Grid",
    gridTemplateColumns: "70% 30%",
    "@media (max-width: 700px)": {
      gridTemplateColumns: "1fr",
      marginBottom: "2rem",
    },
    alignItems: "center",
    marginTop: "1rem",
  },

  _search: {
    height: "2.2rem",
    padding: "0 12px",
    width: "20rem",
    background: "#131E2F",
    border: "none",
    color: "#E8FCFF",
    borderRadius: "4px",
    "&:hover": {
      background: "rgba(0, 0, 0, 0.13)",
    },
    "&:focus": {
      background: "rgba(0, 0, 0, 0.13))",
    },
    "&:focus-visible": {
      outline: "none",
    },
  },

  farmerdetails_boxcontainer: {
    display: "flex",
    justifyContent: "flex-end",
  },

  farmerdetails_searchcontainer: {
    display: "flex",
    justifyContent: "flex-start",
    "@media (max-width: 700px)": {
      justifyContent: "flex-end",
      marginBottom: "1rem",
    },
  },

  addDetails_btn: {
    border: 0,
    backgroundColor: "#6CCDFE",
    opacity: 0.8,
    color: "#111B2B",
    height: "2rem",
    width: "8rem",
    borderRadius: "5px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#131E2F",
      border: "1px solid #6CCDFE",
      color: "#6CCDFE",
    },
  },

  exportDetails_btn: {
    border: 0,
    backgroundColor: "#6CCDFE",
    opacity: 0.8,
    color: "#111B2B",
    height: "2rem",
    width: "8rem",
    borderRadius: "5px",
    cursor: "pointer",
    marginRight: "1rem",
    "&:hover": {
      backgroundColor: "#131E2F",
      border: "1px solid #6CCDFE",
      color: "#6CCDFE",
    },
  },

  addDetails_link: {
    textDecoration: "none",
  },

  //table
  tab_container: {
    maxHeight: 440,
    height: "65vh",
    backgroundColor: "#111B2B",
  },

  tab_cell: {
    color: "white",
    border: "none",
    width: "150px",
    minWidth: "150px",
    maxWidth: "150px",
    overflow: "auto",
    borderBottom: " 0.5px solid rgba(86, 105, 132, 0.2)",
  },

  tab_headercell: {
    backgroundColor: "#111E2F",
    color: "#E8FCFF",
    width: "150px",
    minWidth: "150px",
    maxWidth: "150px",
    overflow: "auto",
    borderBottom: "0.5px solid rgba(86, 105, 132, 0.8)",
  },

  tab_headericoncell: {
    backgroundColor: "#111E2F",
    color: "#E8FCFF",
    width: "50px",
    textAlign: "center",
    borderBottom: "0.5px solid rgba(86, 105, 132, 0.8)",
  },

  icontab_cell: {
    color: "white",
    width: "50px",
    textAlign: "center",
    borderBottom: "0.5px solid rgba(86, 105, 132, 0.2)",
  },

  tab_user_logo: {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
  },

  tab_row: {
    backgroundColor: "#111E2F",
    textDecoration: "none",
    "&:hover": {
      cursor: "pointer",
      backgroundColor: "#111B2B",
    },
  },

  tr: {
    backgroundColor: "red",
  },

  td: {
    backgroundColor: "red",
    width: "200px",
    color: "white",
  },

  //Add details
  addDetails_root: {
    flexGrow: 1,
  },

  iconbtn: {
    color: "white",
    fontSize: "2rem",
  },

  addDetailbtn_container: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    color: "white",
    textDecoration: "none",
  },

  form_container: {
    display: "flex",
    flexDirection: "column",
  },

  adddetails_header: {
    display: "flex",
    width: "80%",
    alignSelf: "center",
    justifyContent: "flex-start",
    color: "white",
  },

  forminput_container: {
    width: "80%",
    position: "relative",
    margin: "0 auto",
  },

  drpdown: {
    color: "#606365",
    border: 0,
    backgroundColor: "#131E2F",
    "&:hover": {
      backgroundColor: "red",
    },
  },

  option_container: {
    backgroundColor: "red",
  },

  forminput_container_btn: {
    width: "80%",
    position: "relative",
    margin: "0 auto",
    display: "flex",
    justifyContent: "center",
    marginTop: "1rem",
  },

  submit_btn: {
    border: 0,
    backgroundColor: "#6CCDFE",
    color: "#131E2E",
    height: "3rem",
    width: "12rem",
    borderRadius: "5px",
    cursor: "pointer",

    "&:hover": {
      backgroundColor: "#131E2F",
      border: "1px solid #6CCDFE",
      color: "#6CCDFE",
    },
  },

  forminput_containerrow: {
    width: "80%",
    display: "flex",
    position: "relative",
    margin: "0 auto",
  },

  addDetails_input: {
    width: "100%",
    color: "white",
    fontSize: "1rem",
    backgroundColor: "#202b3a",
    flexDirection: "column-reverse",
  },

  //user details
  userdetail_container: {
    backgroundColor: "#111E2F",
    color: "#E8FCFF",
    height: "842px",
    paddingTop: "2rem",
    padding: 30,
  },

  user_btncontainer: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "1rem",
    marginRight: "2rem",
  },

  export_btn: {
    height: "2rem",
    width: "5rem",
    border: 0,
    backgroundColor: "#6CCDFE",
    color: "#131E2F",
    borderRadius: "5px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textDecoration: "none!important",

    "&:hover": {
      backgroundColor: "#131E2F",
      border: "1px solid #6CCDFE",
      color: "#6CCDFE",
      textDecoration: "none",
    },
  },

  user_header: {
    width: "100%",
    position: "relative",
    marginLeft: "auto",
    marginRight: "auto",
    display: "flex",
    justifyContent: "center",
    gridTemplateColumns: "80% 25%",
    height: "100px",
  },

  user_title: {
    width: "100%",
  },

  main_title: {
    margin: 0,
    fontSize: "1.3em",
    textAlign: "center",
    "@media (max-width: 700px)": {
      fontSize: "1.2em",
    },
    "@media (max-width: 560px)": {
      fontSize: "1em",
    },
  },

  nabard_title: {
    marginTop: "0.5rem",
    fontSize: "0.8em",
    margin: 0,
    textAlign: "center",
  },

  district_title: {
    fontSize: "0.8em",
    margin: 0,
    textAlign: "center",
  },

  formtitle_title: {
    fontSize: "0.8em",
    margin: 0,
    textAlign: "center",
  },

  user_profilepic: {
    height: "100px",
    maxHeight: "100px",
    display: "flex",
    justifyContent: "center",
    alignItems: "Center",
    position: "absolute",
    right: 0,
  },

  user_profile: {
    height: "100px",
    width: "110px",
  },

  user_subheader: {
    width: "100%",
    position: "relative",
  },

  user_subheadermain: {
    fontSize: "0.6rem",
    margin: 0,
    textAlign: "left",
    display: "flex",
    justifyContent: "flex-start",
    width: "100%",
  },

  user_subheadersubmain: {
    fontSize: "0.7em",
    margin: 0,
    textAlign: "center",
  },

  user_subheadersubmainbelow: {
    fontSize: "0.7em",
    margin: 0,
    textAlign: "center",
    paddingLeft: "2rem",
    paddingRight: "1.6rem",
  },

  formnum_container: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },

  formnum_text: {
    fontSize: "0.6em",
  },

  user_border: {
    width: "100%",
    backgroundColor: "white",
  },

  user_formcontent: {
    width: "100%",
    position: "relative",
    overflow: "scroll",
  },

  contentrow_container: {
    width: "100%",
    display: "flex",
    height: "35px",
    justifyContent: "space-around",
    alignItems: "Center",
    fontSize: "0.7em",
  },

  content_key: {
    textAlign: "left",
    width: "100%",
  },

  content_value: {
    textAlign: "left",
    width: "100%",
    paddingLeft: "1rem",
    overflow: "auto",
  },

  loading: {
    cursor: "not-allowed",
    textDecoration: "none",
  },

  loader: {
    width: "100%",
    height: "10vh",
    display: "grid",
    placeItems: "center",
    fontSize: "1rem",
  },

  no_data: {
    width: "100%",
    display: "grid",
    placeItems: "center",
  },
}));
