import React, { useEffect, useRef } from "react";
import { Grid } from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { useStyles } from "../../../assets/styles";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import {
  getDecisionById,
  postDecisions,
  putDecision,
} from "../../../constants/config";
import { customToast } from "../../widgets/Toast";
import { useQuery, useMutation } from "react-query";

export default function AddDecision(props) {
  const { match } = props;
  const history = useHistory();
  const dateRef = useRef("");
  const decisionRef = useRef("");
  const classes = useStyles();

  const { data } = useQuery(
    ["Edit Decision", match.params.id],
    () => match.params.id && getDecisionById(match.params.id)
  );
  const updateDecision = useMutation(
    (data) => putDecision(data, match.params.id),
    {
      onSuccess: (data) => {
        customToast("success", "Form submitted successfully.");
        history.goBack();
      },
      onError: (error) => {
        customToast("error", error.message);
      },
    }
  );
  const addDecision = useMutation((data) => postDecisions(data), {
    onSuccess: (data) => {
      customToast("success", "Form submitted successfully.");
      history.goBack();
    },
    onError: (error) => {
      customToast("error", error.message);
    },
  });
  useEffect(() => {
    if (match.params.id) {
      dateRef.current.value = data?.date;
      decisionRef.current.value = data?.decision;
    }
  }, [match.params.id, data]);

  const formSubmission = (e) => {
    e.preventDefault();
    const params = {
      date: dateRef.current.value,
      decision: decisionRef.current.value,
    };
    match.params.id
      ? updateDecision.mutate(params)
      : addDecision.mutate(params);
  };
  return (
    <div className={classes.form}>
      <form onSubmit={formSubmission}>
        <Grid className={classes.form_container} container spacing={3}>
          <Grid className={classes.adddetails_header} item xs={12}>
            <Link to="/decision" style={{ textDecoration: "none" }}>
              <Typography
                variant="h5"
                className={classes.addDetailbtn_container}
                style={{ textDecoration: "none" }}
              >
                <ChevronLeftIcon className={classes.iconbtn} />
                Add Decision
              </Typography>
            </Link>
          </Grid>
          <Grid
            className={classes.forminput_containerrow}
            container
            spacing={3}
          >
            <Grid item xs={12}>
              <input
                className="farmer-input"
                type="date"
                placeholder="தேதி"
                autoComplete="off"
                ref={dateRef}
              />
            </Grid>
            <Grid className={classes.forminput_container} item xs={12}>
              <textarea
                className="farmer-input tamil"
                placeholder="தீர்மானம்"
                rows="8"
                cols="50"
                type="text"
                autoComplete="off"
                style={{ padding: "15px", height: "auto" }}
                ref={decisionRef}
              />
            </Grid>
            <Grid className={classes.forminput_container_btn} container>
              <button
                type="submit"
                className={classes.submit_btn}
                //   onClick={postCeoData}
              >
                SUBMIT
              </button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
