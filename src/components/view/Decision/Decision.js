import React, { useState, useEffect } from "react";
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
import { getDecisions } from "../../../constants/config";
import CustomButton from "../../widgets/CustomButton";

const Decision = (props) => {
  const classes = useStyles();
  const [decision, setDecision] = useState([]);
  const customTheme = {
    yearColor: "#405b73",
    lineColor: "#d0cdc4",
    dotColor: "#262626",
    borderDotColor: "#d0cdc4",
    titleColor: "#36574C",
    subtitleColor: "#262626",
    textColor: "#262626",
  };

  useEffect(() => {
    getDecisions()
      .then((res) => {
        const tempArr = res.map((value) => {
          const pdfDecision = value.decision;
          let str = value.decision;
          str = str.replace(/(^\s*)|(\s*$)/gi, "");
          str = str.replace(/[ ]{2,}/gi, " ");
          str = str.replace(/\n /, "\n");
          var count = str.split(" ").length;
          if (count > 100) {
            value.decision = value.decision.slice(0, 100) + "  ....";
          }
          // console.log(value)
          return {
            date: value.date.split("-").join("/"),
            decision: value?.decision,
            decisionTitle: value?.decision_title,
            id: value.id,
            decisionGroup: value?.farmer_group?.groupName,
            pdfDecision: pdfDecision,
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
                <CustomButton
                  className={classes.addDetails_btn}
                  icon={<AddIcon />}
                  value="Add"
                />
              </NavLink>
            </Box>
          </Box>
        </Box>
        <div className={classes.decision}>
          <Timeline theme={customTheme} dateFormat="ll">
            {decision.map((value) => {
              return (
                <Container key={value.id}>
                  <YearContent startDate={value.date} />
                  <BodyContent>
                    <p className={classes.decision_label}>
                      {value.decisionGroup ?? "குழு அனைத்தும்"}
                    </p>
                    <Section title={value.decisionTitle}>
                      <Description variant="subtitle" text={value.decision} />
                      <div
                        className={classes.decision_btncontainer}
                        style={{ marginTop: "0.5rem" }}
                      >
                        <CustomButton
                          className={classes.export_btn}
                          value="View"
                          onClick={() =>
                            props.history.push(`decision/${value.id}`)
                          }
                        />
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
