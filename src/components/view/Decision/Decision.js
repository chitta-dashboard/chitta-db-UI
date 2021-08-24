import React, { useState, useEffect } from "react";
import { useStyles } from "../../../assets/styles";
import AddIcon from "@material-ui/icons/Add";
import { Grid, Box } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { PDFDownloadLink } from "@react-pdf/renderer";
import clsx from "clsx";
import DecisionToPdf from "./DecisionToPdf";
// import { useHistory } from "react-router";
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
import { useQuery } from "react-query";

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
  const { data } = useQuery("getDecisions", () => getDecisions());
  // console.log(data);
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
          return {
            date: value.date.split("-").join("/"),
            decision: value.decision,
            id: value.id,
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
                    <Section>
                      <Description text={value.decision} />
                      <div className={classes.decision_btncontainer}>
                        <CustomButton
                          className={classes.export_btn}
                          value="View"
                          onClick={() =>
                            props.history.push(`decision/${value.id}`)
                          }
                        />
                        <PDFDownloadLink
                          document={
                            <DecisionToPdf
                              getDecision={value.pdfDecision}
                              getDate={value.date}
                            />
                          }
                          fileName={`${value.date}_decision.pdf`}
                          style={{ textDecoration: "none" }}
                        >
                          {({ loading }) => {
                            return (
                              <button
                                className={clsx(
                                  classes.export_btn,
                                  loading ? classes.loading : ""
                                )}
                              >
                                {" "}
                                Download{" "}
                              </button>
                            );
                          }}
                        </PDFDownloadLink>
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
