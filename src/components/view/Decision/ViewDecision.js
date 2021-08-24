import React, { useState } from "react";
import clsx from "clsx";
import { useEffect } from "react";
import { useStyles } from "../../../assets/styles";
import { Grid, Box, Table, TableHead } from "@material-ui/core";
import { deleteDecision, getDecisionById } from "../../../constants/config";
import { customToast } from "../../widgets/Toast";
import { useHistory } from "react-router-dom";
import { PDFDownloadLink } from "@react-pdf/renderer";
import DecisionToPdf from "../Decision/DecisionToPdf";
import CustomButton from "../../widgets/CustomButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { useQuery, useMutation } from "react-query";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";

export default function ViewDecision(props) {
  const history = useHistory();
  const { match } = props;
  const classes = useStyles();
  const [date, setDate] = useState("");
  const [decision, setDecision] = useState("");

  const { data } = useQuery(
    ["View Decision", match.params.id],
    () => match.params.id && getDecisionById(match.params.id)
  );

  useEffect(() => {
    if (match.params.id) {
      setDate(data?.date.split("-").join("/"));
      setDecision(data?.decision);
    }
  }, [match.params.id, data]);

  const mutation = useMutation((data) => deleteDecision(data), {
    onSuccess: (data) => {
      customToast("success", "Decision Deleted Successfully.");
      history.goBack();
    },
    onError: (error) => {
      customToast("error", error.message);
    },
  });

  const decisionPDF = () => {
    <DecisionToPdf getDecision={decision} getDate={date} />;
  };

  return (
    <div className={classes.farmerdetails_root}>
      <Grid container spacing={3} className={classes.Detailscard_container}>
        <Box
          className={classes.farmerdetails_subheader}
          xs={12}
          style={{ gridTemplateColumns: "50% 50%" }}
        >
          <Box className={classes.farmerdetails_searchcontainer}>
            <div className={classes.searchBox}>
              <CustomButton
                className={classes.addDetailbtn_container}
                icon={<ChevronLeftIcon className={classes.iconbtn} />}
                value="Back"
                onClick={() => history.goBack()}
              />
            </div>
          </Box>
          <Box className={classes.farmerdetails_boxcontainer}>
            <Box>
              <CustomButton
                value="Delete"
                className={classes.export_btn}
                // onClick={() => DeleteHandler(match.params.id)}
                onClick={() => mutation.mutate(match.params.id)}
              />
            </Box>
            <Box>
              <CustomButton
                value="Edit"
                className={classes.export_btn}
                onClick={() =>
                  props.history.push(`/editdecision/${match.params.id}`)
                }
              />
            </Box>
            <Box>
              <PDFDownloadLink
                document={<decisionPDF />}
                fileName={`${date}_decision.pdf`}
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
            </Box>
          </Box>
        </Box>
        <div className={classes.decision}>
          <div>
            <h3>தேதி : {date}</h3>
            <p>
              <span style={{ fontWeight: "700", fontSize: "1.2rem" }}>
                தீர்மானம் :{" "}
              </span>
              {decision}
            </p>
          </div>
          <h3>தொகுப்பாளர் : </h3>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow className={classes.decision_tabHead}>
                  <TableCell className={classes.decision_tab}>பெயர்</TableCell>
                  <TableCell className={classes.decision_tab}>
                    கையொப்பம்
                  </TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </TableContainer>
          <h3>பங்கேற்பாளர்கள் : </h3>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow className={classes.decision_tabHead}>
                  <TableCell className={classes.decision_tab}>பெயர்</TableCell>
                  <TableCell className={classes.decision_tab}>
                    கையொப்பம்
                  </TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </TableContainer>
        </div>
      </Grid>
    </div>
  );
}
