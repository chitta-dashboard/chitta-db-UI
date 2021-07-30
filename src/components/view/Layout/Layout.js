import React from "react";
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
import ListItemText from "@material-ui/core/ListItemText";
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

const Layout = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Router>
      <div className={classes.Layout_root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              disableRipple
              style={{ backgroundColor: "transparent" }}
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
              <img
                src={
                  require("../../../assets/images/nerkathir_logo.png").default
                }
                alt="chitta logo"
                className={classes.chitta_logo}
              />
            </IconButton>
            <div className={classes.navbarContent}>
              <h2 className={classes.MainTitle}>
                NERKATHIR FARMER PRODUCER COMPANY LIMITED
              </h2>
              <div className={classes.navbarSubContent}>
                Kallakurichi | Regd No: 139086 | CIN: U01409TN2020PTC139086
              </div>
            </div>
          </Toolbar>
        </AppBar>
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
            <div className={classes.drawerIcon_container}>
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
            </div>
          </div>
          <List>
            {ListItems.map((list) => {
              return (
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
                    <ListItemText primary={list.name} />
                  </ListItem>
                </NavLink>
              );
            })}
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
            <Route
              exact
              path="/farmersdetails/:id"
              component={FarmerDeatilForm}
            />
            <Redirect exact from="/" to="/farmersdetails" />
          </Switch>
        </main>
      </div>
    </Router>
  );
};

export default Layout;
