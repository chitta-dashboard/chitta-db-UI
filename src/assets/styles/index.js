import { makeStyles } from "@material-ui/core/styles";
import { colors } from "../../theme";

const drawerWidth = 240;

export const useStyles = makeStyles((theme) => ({
  chitta_logo: {
    width: "3rem",
    marginLeft: "1rem",
  },

  chitta_logo_drawer: {
    width: "8rem",
  },
  loginContainer: {
    margin: "6rem auto 0 auto ",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "#fff",
    width: "35%",
    height: "65vh",
    borderRadius: "15px",
    padding: "2rem 2rem",
  },
  loginLogo: {
    width: "12rem",
    height: "12rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "1rem",
  },
  loginInput: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "1rem 0rem",
    height: "2.5rem",
    width: "90%",
    borderRadius: "10px",
    border: "none",
    background: "rgba(0, 0, 0, 0.09)",
    padding: "0 5%",
    "&:hover": {
      outline: "0",
      background: "rgba(0, 0, 0, 0.15)",
    },
    "&:focus": {
      outline: "0",
      background: "rgba(0, 0, 0, 0.15)",
    },
  },
  loginActions: {
    display: "flex",
    justifyContent: "center",
  },
  loginButton: {
    height: "2rem",
    width: "5rem",
    borderRadius: "10px",
    border: "none",
    background: "#36574C",
    color: "#FFFFFF",
    "&:hover": {
      cursor: "pointer",
    },
    "&:focus": {
      outline: "0",
    },
  },
  Layout_root: {
    display: "flex",
  },

  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    boxShadow: "1px 1px 7px #3333",
    background: "#085c49",
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
    // color: colors.text2,
    color: "white",
    padding: 0,
  },

  navbarContent: {
    width: "100%",
    textAlign: "right",
    fontSize: "smaller",
  },

  MainTitle: {
    margin: 0,
  },

  navbarSubContent: {
    display: "flex",
    margin: 0,
    fontSize: "small",
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
    color: colors.text1,
    border: 0,
    display: "grid",
    // gridTemplateRows: "38% 62%",
    padding: "1rem",
    maxHeight: "100vh",
  },

  drawerIconBtn: {
    background: "#fff",
    position: "absolute",
    right: 0,
    "&:hover": {
      background: "#fff",
    },
  },

  selected: {
    background: "red",
  },

  drawerHeader: {
    textAlign: "center",
    display: "grid",
    placeItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },

  HeaderTitle: {
    color: "#36574C",
    fontSize: "0.9rem",
    margin: 0,
  },
  HeaderSub: {
    color: "#36574C",
    fontSize: "0.7rem",
    fontWeight: "bold",
  },

  SidebarList: {
    background: "#36574C",
    borderRadius: "20px",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    padding: "1.5rem 0",
  },
  listContent: {
    margin: "0.5rem 0",
  },

  listText: {
    fontSize: "0.7rem",
    margin: "0",
  },

  listItemContainer: {
    display: "flex",
    alignItems: "center",
  },

  sideBarLogo: {
    marginRight: "1rem",
    width: "0.8rem",
    height: "0.8rem",
  },

  content: {
    flexGrow: 1,
    // padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
    backgroundColor: "#EEF2F5;",
    height: "100%",
    minHeight: "100vh",
    "@media (max-width: 700px)": {
      paddingTop: "80px",
    },
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
    backgroundColor: colors.bg2,
    boxShadow: "20px 20px 60px #0e1725,-20px -20px 60px #141f31",
    height: "10vh",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  btnContainer_custom: {
    display: "flex",
    justifyContent: "space-around",
    width: "100%",
  },
  editDetails_btn: {
    textAlign: "right",
    border: 0,
    backgroundColor: colors.primary,
    opacity: 0.8,
    color: colors.text1,
    height: "2rem",
    width: "5rem",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "600",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    "&:hover": {
      backgroundColor: colors.bg3,
      border: `1px solid ${colors.primary}`,
      color: colors.text2,
      textDecoration: "none",
    },
  },

  farmerdetails_subheader: {
    padding: "2rem 1.5rem 0rem 1.5rem",
    height: "15vh",
    width: "100%",
    // marginBottom: "1rem",
    display: "Grid",
    gridTemplateColumns: "70% 30%",
    "@media (max-width: 700px)": {
      padding: "0.5rem ",
      gridTemplateColumns: "1fr",
      marginBottom: "2rem",
    },
    alignItems: "center",
  },
  searchIcon: {
    position: "relative",
    top: "0.8rem",
    left: "-16rem",
    width: "1rem",
    height: "1rem",
  },
  _search: {
    height: "2.5rem",
    padding: "0 50px",
    width: "100%",
    maxWidth: "310px",
    background: "rgba(0, 0, 0, 0.09)",
    border: "none",
    color: colors.text2,
    borderRadius: "30px",
    "&:hover": {
      background: "rgba(0, 0, 0, 0.15)",
    },
    "&:focus": {
      background: "rgba(0, 0, 0, 0.15))",
    },
    "&:focus-visible": {
      outline: "none",
    },
  },

  farmerdetails_boxcontainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    "@media (max-width: 700px)": {
      justifyContent: "space-around",
    },
  },

  farmerdetails_searchcontainer: {
    display: "flex",
    justifyContent: "flex-start",
    "@media (max-width: 700px)": {
      justifyContent: "flex-end",
      marginBottom: "1rem",
    },
  },

  searchBox: {
    display: "flex",
  },
  closeIcon: {
    height: "1.3rem",
    width: "1.3rem",
    position: "relative",
    top: "0.2rem",
    right: "30px",
    zIndex: "10",
    "&:hover": {
      cursor: "pointer",
    },
  },

  addDetails_btn: {
    border: 0,
    backgroundColor: colors.primary,
    opacity: 0.8,
    color: colors.text1,
    height: "2rem",
    width: "5rem",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "600",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    "&:hover": {
      backgroundColor: colors.bg3,
      border: `1px solid ${colors.primary}`,
      color: colors.text2,
    },
  },

  exportDetails_btn: {
    border: 0,
    backgroundColor: colors.primary,
    opacity: 0.8,
    color: colors.text1,
    height: "2rem",
    width: "8rem",
    borderRadius: "5px",
    cursor: "pointer",
    marginRight: "1rem",
    fontWeight: "600",

    "&:hover": {
      backgroundColor: colors.bg3,
      border: `1px solid ${colors.primary}`,

      color: colors.text2,
    },
    "&:disabled": {
      opacity: "0.5",
    },
  },

  addDetails_link: {
    textDecoration: "none",
  },

  //table
  tab_container: {
    margin: "1.5rem 1.5rem 0rem 1.5rem",
    padding: "1rem",
    paddingBottom: "3rem",
    height: "80vh",
    backgroundColor: colors.bg1,
    borderRadius: "20px",
    // boxShadow: "1px 1px 7px 0px #3333334a",
  },

  tab_cell: {
    color: colors.text2,
    border: "none",
    overflow: "auto",
  },

  tab_headercell: {
    backgroundColor: "#F3F6F9",
    color: "#B5B5C3",
    overflow: "auto",
    border: "none",
    padding: "0.2rem 1rem",
  },

  tab_headericoncell: {
    backgroundColor: colors.bg3,
    color: colors.text2,
    width: "50px",
    textAlign: "center",
    borderBottom: "0",
    padding: "0.2rem 1rem",
  },

  icontab_cell: {
    color: colors.text2,
    width: "50px",
    textAlign: "center",
    border: "none",
  },

  tab_user_logo: {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
  },

  tab_user_signature: {
    width: "auto",
    height: "35px",
  },

  tab_row: {
    border: "none",
    backgroundColor: colors.bg1,
    color: colors.text2,
    textDecoration: "none",
    "&:hover": {
      cursor: "pointer",
      backgroundColor: colors.bg1,
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
    color: colors.text2,

    fontSize: "2rem",
  },

  addDetailbtn_container: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    color: colors.text2,
    textDecoration: "none",
  },

  form_container: {
    display: "flex",
    flexDirection: "column",
  },

  form: {
    padding: "20px",
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
    backgroundColor: colors.bg3,
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
    marginBottom: "7vh",
  },

  submit_btn: {
    border: 0,
    backgroundColor: colors.primary,
    color: colors.text1,
    height: "3rem",
    width: "12rem",
    borderRadius: "5px",
    cursor: "pointer",

    "&:hover": {
      backgroundColor: colors.bg3,
      border: `1px solid ${colors.primary}`,

      color: colors.text2,
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
    backgroundColor: colors.bg1,
    color: colors.text2,
    height: "842px",
    paddingTop: "2rem",
    padding: 30,
    borderRadius: "10px",
    boxShadow: "1px 1px 7px 0px #3333334a",
    margin: "0 20px",
  },

  user_btncontainer: {
    // display: "flex",
    display: "grid",
    gridTemplateColumns: "60% 40%",
    justifyContent: "space-between",
    // marginBottom: "1rem",
    // marginRight: "2rem",
    // marginTop: "1rem",
    margin: "1rem 2rem",
  },

  export_btn: {
    height: "2rem",
    width: "5rem",
    border: 0,
    backgroundColor: colors.primary,
    color: colors.text1,
    borderRadius: "5px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textDecoration: "none!important",
    fontWeight: "600",

    "&:hover": {
      // backgroundColor: colors.bg3,
      // border: "1px solid #6CCDFE",
      // color: colors.primary,
      // textDecoration: "none",
      backgroundColor: colors.bg3,
      border: `1px solid ${colors.primary}`,

      color: colors.text2,
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
    fontSize: "20px",
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
  decision: {
    margin: "10%",
  },
  footer: {
    minHeight: "2rem",
    color: "#5A776E",
    width: "calc(100% - 240px)",
    fontSize: "0.8rem",
    bottom: "0",
    position: "fixed",
    padding: "0rem 0.5rem",
    background: "#FAFAFA",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    "@media (max-width: 700px)": {
      // gridTemplateColumns: "1fr",
      width: "100%",
    },
  },
  t_Footer: {
    position: "absolute",
    bottom: "0",
    width: "93%",
    background: "white",
    display: "flex !important",
    justifyContent: "flex-end",
  },
  footercontent: {
    display: "flex",
  },
  footeractions: {
    display: "flex",
    // justifyContent: "flex-end",
    alignItems: "center",
    justifyContent: "space-around",
  },
  footeractions_list: {
    // listStyleType: "none",
    // padding: 10,
    // borderRight: "1px solid",
  },
  adminCardContainer: {
    weight: "100vw",
    height: "100vh",
    display: "grid",
    placeContent: "start",
  },
  adminCardRoot: {
    maxWidth: "500px",
    margin: "0px 20px",
  },
  adminCardImage: {
    width: "100px",
    height: "111px",
    paddingBottom: "0.7rem",
  },
  adminDetails: {
    float: "right",
    padding: "10px",
  },
  adminContent: {
    justifyContent: "space-around",
    display: "flex",
  },
  adminHeaderTitle: {
    color: "#36574C",
  },
  admin_btncontainer: {
    margin: "3rem 2rem",
    display: "grid",
    justifyContent: "space-between",
    gridTemplateColumns: "60% 40%",
  },
}));
