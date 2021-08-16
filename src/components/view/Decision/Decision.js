import React from "react";
import { useStyles } from "../../../assets/styles";
import AddIcon from "@material-ui/icons/Add";
import { Grid, Box } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import {
  Timeline,
  Container,
  YearContent,
  BodyContent,
  Section,
  Description,
} from "vertical-timeline-component-react";
// import { Box, Grid } from "@material-ui/core";

const Decision = () => {
  const classes = useStyles();
  const customTheme = {
    yearColor: "#405b73",
    lineColor: "#d0cdc4",
    dotColor: "#262626",
    borderDotColor: "#d0cdc4",
    titleColor: "#36574C",
    subtitleColor: "#bf9765",
    textColor: "#262626",
  };

  return (
    <>
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
              <Container>
                <YearContent startDate="2020/07/01" />
                <BodyContent>
                  <Section title="Title">
                    <Description variant="subtitle" text="Subtitle" />
                    <Description text="Description" />
                    <Description text="Another description" />
                  </Section>

                  <Section title="Another title">
                    <Description text="Description" />
                    <Description text="Another description" />
                  </Section>
                </BodyContent>
              </Container>
              <Container>
                <YearContent startDate="2021/07/01" />
                <BodyContent>
                  <Section title="Title">
                    <Description variant="subtitle" text="Subtitle" />
                    <Description text="Description" />
                    <Description text="Another description" />
                  </Section>

                  <Section title="Another title">
                    <Description text="Description" />
                    <Description text="Another description" />
                  </Section>
                </BodyContent>
              </Container>
            </Timeline>
          </div>
        </Grid>
      </div>
    </>
  );
};
export default Decision;
