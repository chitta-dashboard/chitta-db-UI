import React, { useState, useEffect } from "react";
import { useStyles } from "../../../assets/styles";
import AddIcon from "@material-ui/icons/Add";
import { Grid, Box } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router";
import {
  Timeline,
  Container,
  YearContent,
  BodyContent,
  Section,
  Description,
} from "vertical-timeline-component-react";
import { getDecisions } from "../../../constants/config";
// import { Box, Grid } from "@material-ui/core";

const Decision = (props) => {
  const classes = useStyles();
  const [decision, setDecision] = useState([]);
  const customTheme = {
    yearColor: "#405b73",
    lineColor: "#d0cdc4",
    dotColor: "#262626",
    borderDotColor: "#d0cdc4",
    titleColor: "#36574C",
    subtitleColor: "#bf9765",
    textColor: "#262626",
  };
  useEffect(() => {
    getDecisions()
      .then((res) => {
        const tempArr = res.map((value) => {
          return {
            date: value.date.split("-").join("/"),
            decision: value.decision,
            id: value.id,
          };
        });
        setDecision(tempArr);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className={classes.farmerdetails_root}>
      <Grid container spacing={3} className={classes.Detailscard_container}>
        <Box className={classes.farmerdetails_subheader} xs={12}>
          <Box className={classes.farmerdetails_searchcontainer}>
            <div className={classes.searchBox}></div>
          </Box>
          <Box className={classes.farmerdetails_boxcontainer}>
            <Box>
              <NavLink to="/addDecision" className={classes.addDetails_link}>
                <button className={classes.addDetails_btn}>
                  <AddIcon />
                  Add
                </button>
              </NavLink>
            </Box>
          </Box>
        </Box>
        <div className={classes.decision}>
          <Timeline theme={customTheme} dateFormat="ll">
            {decision.map((value) => {
              return (
                <Container func={console.log()}>
                  <YearContent startDate={value.date} />
                  <BodyContent>
                    <Section>
                      <Description text={value.decision} />
                      <div className={classes.decision_btncontainer}>
                        <button
                          className={classes.decision_btn}
                          onClick={() =>
                            props.history.push(`decision/${value.id}`)
                          }
                        >
                          View
                        </button>
                        <button className={classes.decision_btn}>
                          Print as pdf
                        </button>
                      </div>
                    </Section>
                  </BodyContent>
                </Container>
              );
            })}
          </Timeline>
        </div>
      </Grid>
    </div>
  );
};
export default Decision;
