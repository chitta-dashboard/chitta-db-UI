import React, { useState } from "react";
import clsx from "clsx";
import { useEffect } from "react";
import { useStyles } from "../../../assets/styles";
import { Grid, Box } from "@material-ui/core";
import { deleteDecision, getDecisionById } from "../../../constants/config";
import { customToast } from "../../widgets/Toast";
import { useHistory } from "react-router-dom";
import { PDFDownloadLink } from "@react-pdf/renderer";
import DecisionToPdf from "../Decision/DecisionToPdf";
import CustomButton from "../../widgets/CustomButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { useQuery,useMutation } from "react-query";

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
  }, [match.params.id,data]);

  const mutation = useMutation((data) => deleteDecision(data),
    {
      onSuccess: (data) => {
        customToast("success", "Decision Deleted Successfully.");
        history.goBack();
      },
      onError: (error) => {
        customToast("error", error.message);
      },
    }
  )

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
                document={
                  <DecisionToPdf getDecision={decision} getDate={date} />
                }
                fileName={`${date}_decision.pdf`}
                style={{ textDecoration: "none" }}
              >
                {({ loading }) => {
                  return (
                    <button
                    className={clsx(
                    classes.export_btn,
                    loading ? classes.loading : "" )} > Download </button>
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
        </div>
      </Grid>
    </div>
  );
}
