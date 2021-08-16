import React, { useState } from "react";
import { useEffect } from "react";
import { useStyles } from "../../../assets/styles";
import { Grid, Box } from "@material-ui/core";
import { deleteDecision, getDecisionById } from "../../../constants/config";
import { customToast } from "../../widgets/Toast";
import { useHistory } from "react-router-dom";

export default function ViewDecision(props) {
  const history = useHistory();
  const { match } = props;
  const classes = useStyles();
  const [date, setDate] = useState("");
  const [decision, setDecision] = useState("");
  useEffect(() => {
    getDecisionById(match.params.id).then((res) => {
      setDate(res.date.split("-").join("/"));
      setDecision(res.decision);
    });
  }, []);

  const DeleteHandler = (id) => {
    deleteDecision(id)
      .then(() => {
        customToast("success", "Former Deleted successfully.");
        history.goBack();
      })
      .catch((err) => console.log(err));
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
            <div className={classes.searchBox}></div>
          </Box>
          <Box className={classes.farmerdetails_boxcontainer}>
            <Box>
              <button
                className={classes.decision_btn}
                onClick={() => DeleteHandler(match.params.id)}
              >
                Delete
              </button>
            </Box>
            <Box>
              <button
                className={classes.decision_btn}
                onClick={() =>
                  props.history.push(`/editdecision/${match.params.id}`)
                }
              >
                Edit
              </button>
            </Box>
            <Box>
              <button className={classes.decision_btn}>Download as pdf</button>
            </Box>
          </Box>
        </Box>
        <div className={classes.decision}>
          <div>
            <h3>தேதி : {date}</h3>
            <p>தீர்மானம் : {decision}</p>
          </div>
        </div>
      </Grid>
    </div>
  );
}
