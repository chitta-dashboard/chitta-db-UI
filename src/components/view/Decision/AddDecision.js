import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { useStyles } from "../../../assets/styles";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import {
  getFarmers,
  getAdmin,
  getDecisionById,
  postDecisions,
  putDecision,
} from "../../../constants/config";
import { customToast } from "../../widgets/Toast";
import { useQuery, useMutation } from "react-query";
import { useForm } from "react-hook-form";
import { FieldError } from "../Common/FieldError";
import Multiselect from "multiselect-react-dropdown";

export default function AddDecision(props) {
  // const [ceoList, setCeoList] = useState([]);
  // const [farmerList, setFarmerList] = useState([]);
  const { match } = props;
  const history = useHistory();
  const [host, setHost] = useState();
  const [participant, setParticipant] = useState();
  // const dateRef = useRef("");
  // const decisionRef = useRef("");
  const classes = useStyles();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { data } = useQuery(
    ["Edit Decision", match.params.id],
    () => match.params.id && getDecisionById(match.params.id)
  );
  const { data: ceoList } = useQuery("getCeoSearch", () =>
    getAdmin().then((res) =>
      res.map((data) => ({
        name: data?.name,
        value: data?.id,
      }))
    )
  );
  const { data: farmerList } = useQuery("getFarmerSearch", () =>
    getFarmers().then((res) =>
      res.map((data) => ({
        name: data?.name,
        value: data?.id,
      }))
    )
  );

  // useEffect(() => {
  //   const ceoLists = ceo?.map((data) => ({
  //     name: data?.name,
  //     value: data?.id,
  //   }));
  //   setCeoList(ceoLists);
  // }, [ceo]);
  // useEffect(() => {
  //   const farmerList = farmer?.map((data) => ({
  //     name: data?.name,
  //     value: data?.id,
  //   }));
  //   setFarmerList(farmerList);
  // }, [farmer]);
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
      setValue("date", data?.date ?? null);
      setValue("decision", data?.decision ?? null);
    }
  }, [data]);

  const formSubmission = (data) => {
    const params = {
      date: data.date,
      decision: data.decision,
    };
    match.params.id
      ? updateDecision.mutate(params)
      : addDecision.mutate(params);
  };

  return (
    <div className={classes.form}>
      <form
        onSubmit={handleSubmit((data) => {
          formSubmission(data);
        })}
      >
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
                {...register("date", {
                  required: true,
                })}
              />
              {errors?.date?.type === "required" && (
                <FieldError>Required</FieldError>
              )}
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
                {...register("decision", {
                  required: true,
                })}
              />
              {errors?.decision?.type === "required" && (
                <FieldError>Required</FieldError>
              )}
            </Grid>
            <Grid item xs={6} style={{ zIndex: "5" }}>
              <Multiselect
                className="farmer_input"
                options={ceoList}
                displayValue="name"
                onSelect={setHost}
              />
            </Grid>
            <Grid item xs={6} style={{ zIndex: "5" }}>
              <Multiselect
                className="farmer_input"
                options={farmerList}
                displayValue="name"
                onSelect={setParticipant}
              />
            </Grid>
            <Grid className={classes.forminput_container_btn} container>
              <button type="submit" className={classes.submit_btn}>
                SUBMIT
              </button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
