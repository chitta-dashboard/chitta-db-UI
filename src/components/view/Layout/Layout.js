import React, { useEffect } from "react";
import clsx from "clsx";
import { useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import Logo from "../../../assets/images/dashboard.svg";
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import FarmersDetails from "../FarmerDeatails/FarmersDetails";
import AddFarmerForm from "../FarmerDeatails/AddFarmerForm";
import FarmerDeatilForm from "../FarmerDeatails/FarmerDeatilForm";
import { ListItems } from "../../../constants";
import { useStyles } from "../../../assets/styles";
import Dashboard from "../Dashboard";
import { colors } from "../../../theme";
import CeoDetails from "../CeoDetails/CeoDetails";
import MdDetails from "../MdDetails/MdDetails";
import FarmerGroups from "../FarmerGroups/FarmerGroups";
import { Button } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Footer from "../Footer/Footer";
import AddMd from "../MdDetails/AddMdForm";
import AddCeo from "../CeoDetails/AddCeoForm";
import AddFarmerGroup from "../FarmerGroups/AddFarmerGroup";

const Layout = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery("(min-width:700px)");
  const [open, setOpen] = React.useState(true);

  useEffect(() => {
    !matches ? setOpen(false) : setOpen(true);
  }, [matches]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  console.log(open);

  return (
    <Router>
      <div className={classes.Layout_root}>
        <CssBaseline />
        {!open && (
          <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
              [classes.appBarShift]: open,
            })}
          >
            <Toolbar>
              <IconButton
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                disableRipple
                style={{ backgroundColor: "transparent" }}
                className={clsx(classes.menuButton, open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
        )}
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <img
              src={require("../../../assets/images/nerkathir_logo.png").default}
              alt="chitta logo"
              className={classes.chitta_logo_drawer}
            />
            {!matches && (
              <IconButton
                disableRipple
                onClick={handleDrawerClose}
                style={{ color: colors.text2 }}
                className={classes.drawerIconBtn}
              >
                {theme.direction === "ltr" ? (
                  <ChevronLeftIcon />
                ) : (
                  <ChevronRightIcon />
                )}
              </IconButton>
            )}
            <h2 className={classes.HeaderTitle}>
              Nerkathir Farmer Producer Company Limited
            </h2>
          </div>
          <List className={classes.SidebarList}>
            <div>
              {ListItems.map((list) => {
                return (
                  <>
                    <NavLink
                      activeClassName="nav-active"
                      key={list.id}
                      to={`${list.Router}`}
                      style={{
                        textDecoration: "none",
                        color: "inherit",
                      }}
                    >
                      <ListItem key={list.id} className="list-item" button>
                        <div className={classes.listItemContainer}>
                          <img
                            src={Logo}
                            className={classes.sideBarLogo}
                            alt="logo"
                          />
                          <p className={classes.listText}>{list.name}</p>
                        </div>
                      </ListItem>
                    </NavLink>
                  </>
                );
              })}
            </div>
            <Button
              style={{
                width: "85%",
                height: "50px",
                backgroundColor: "rgba(255,255,255,0.3)",
                alignSelf: "center",
                borderRadius: "10px",
                textTransform: "none",
                fontSize: "0.8rem",
                color: "#fff",
              }}
            >
              <img src={Logo} className={classes.sideBarLogo} alt="logo" />
              Logout
            </Button>
          </List>
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          {/* <div className={classes.drawerHeader} /> */}
          <Switch>
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/addfarmer" component={AddFarmerForm} />
            <Route exact path="/farmersdetails" component={FarmersDetails} />
            <Route path="/ceodetails" component={CeoDetails} />
            <Route path="/mddetails" component={MdDetails} />
            <Route path="/farmergroups" component={FarmerGroups} />
            <Route
              exact
              path="/farmersdetails/:id"
              component={FarmerDeatilForm}
            />
            <Route path="/addMd" component={AddMd} />
            <Route path="/addCeo" component={AddCeo} />
            <Route path="/addFarmerGroup" component={AddFarmerGroup} />
            <Redirect exact from="/" to="/farmersdetails" />
          </Switch>
          <Footer />
        </main>
      </div>
    </Router>
  );
};

export default Layout;
