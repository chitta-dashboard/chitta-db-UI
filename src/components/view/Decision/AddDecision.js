import React, { useContext, useEffect, useState } from "react";
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
  getFarmersGroup,
  getFarmerById,
} from "../../../constants/config";
import { customToast } from "../../widgets/Toast";
import { useQuery, useMutation } from "react-query";
import { useForm } from "react-hook-form";
import { FieldError } from "../Common/FieldError";
import Multiselect from "multiselect-react-dropdown";
import { UserLoginContext } from "../../context/UserLoginContext";
import Cookies from "js-cookie";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

export default function AddDecision(props) {
  const { match } = props;
  const history = useHistory();
  const [host, setHost] = useState([]);
  const [group, setGroup] = useState([]);
  const [isGroup, setIsGroupData] = useState("false");
  const [participant, setParticipant] = useState([]);
  const [filterGroup, setFilterGroup] = useState([]);
  const [filterFarmer, setFilterFarmer] = useState([]);
  const [filterParticipant, setFilterParticipant] = useState([]);
  const classes = useStyles();
  const { loginType } = useContext(UserLoginContext);
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
        _id: data?.id,
        type: "admin",
      }))
    )
  );

  const { data: farmerList } = useQuery("getFarmerSearch", () => getFarmers());
  const { data: farmerGroups } = useQuery(
    "getFarmerGroups",() => getFarmersGroup());

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
      // console.log("data",data)
      customToast("success", "Form submitted successfully.");
      history.goBack();
    },
    onError: (error) => {
      customToast("error", error.message);
    },
  });

  useEffect(() => {
    setFilterParticipant(ceoList);
    if (farmerList?.length && isGroup === "true") {
      let matchParticipant = farmerList.filter((value) => {
          return farmerGroups.some((data) => {
            return (
              value.id === data?.leader?.id ||
              value.id === data?.secretary?.id ||
              value.id === data?.treasurer?.id
            );
          });
        }).map((data) => ({
          name: data?.name,
          _id: data?.id,
          type: "farmer",
        }));
      setFilterParticipant([...ceoList, ...matchParticipant]);
    }

    if (farmerList?.length && group?.length && isGroup === "false") {
      let groupMatchParticipant = farmerList.filter((value) => {
          return (
            value.id === group[0]?.leader ||
            value.id === group[0]?.secretary ||
            value.id === group[0]?.treasurer
          );
        }).map((data) => ({
          name: data?.name,
          _id: data?.id,
          type: "farmer",
        }));
      setFilterParticipant([...ceoList, ...groupMatchParticipant]);
    }
  }, [ceoList, isGroup, group, farmerList]);

  useEffect(() => {
    if (farmerList?.length && farmerGroups?.length) {
      let matchGroupList = farmerGroups.filter((value) => {
          return farmerList.some((data) => {
            return value.groupName === data.farmerGroup;
          });
        }).map((data) => ({
          name: data?.groupName,
          _id: data?.id,
          leader: data?.leader?.id ?? "",
          secretary: data?.secretary?.id ?? "",
          treasurer: data?.treasurer?.id ?? "",
        }));
      setFilterGroup(matchGroupList);
    }
  }, [farmerGroups, farmerList]);

  useEffect(() => {
    if (match.params.id && data !== undefined) {
      setValue("date", data?.date ?? null);
      setValue("title", data?.decision_title ?? null);
      setValue("decision", data?.decision ?? null);
      let adminUser = data?.hosts?.adminusers.map((data) => ({
        name: data?.name,
        _id: data?._id,
        type: "admin",
      }));
      let farmers = data?.hosts?.farmers.map((data) => ({
        name: data?.name,
        _id: data?._id,
        type: "farmer",
      }));
      setParticipant(() =>
        data?.participants.map((data) => ({
          name: data?.name,
          _id: data?._id,
        }))
      );
      setGroup([
        {
          name: data?.farmer_group?.groupName,
          _id: data?.farmer_group?._id,
        },
      ]);
      setHost([...adminUser, ...farmers]);
      data?.farmer_group === null && setIsGroupData("true");
    }
  }, [data, match.params.id]);

    useEffect(() => {
      if (group?.length && isGroup === "false" && farmerList !== undefined) {
        let matchFarmerList = farmerList.filter((value) => value?.farmerGroup === group[0]?.name).map((data) => ({
            name: data?.name,
            _id: data?.id,
          }));
        setFilterFarmer(matchFarmerList);
      }
      if (isGroup === "true" && farmerList !== undefined) {
        let matchFarmerList = farmerList.map((data) => ({
          name: data?.name,
          _id: data?.id,
        }));
        setFilterFarmer(matchFarmerList);
      }
    }, [group, isGroup, farmerList]);

  useEffect(() => {
    const userId = Cookies.get("userId");
    if (loginType !== "Administrator") {
      getFarmerById(userId).then((val) => {
        let result = farmerGroups.filter(
          (res) => val?.farmerGroup === res?.name
        );
        if (result.length > 0) {
          setGroup(result);
        }
      });
    }
  }, []);

  const formSubmission = async (data) => {
    // console.log("hosts", host);
    let admin = await host.filter((val) => val.type === "admin");
    let farmer = await host.filter((val) => val.type === "farmer");
    const params = {
      decision_title: data.title,
      date: data.date,
      decision: data.decision,
      hosts: {
        adminusers: admin,
        farmers: farmer,
      },
      participants: participant,
      farmer_group: isGroup === "false" ? group[0] : null,
    };
    // console.log("params", params);
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
                {match.params.id ? "Edit" : "Add"} Decision
              </Typography>
            </Link>
          </Grid>
          <Grid
            className={classes.forminput_containerrow}
            container
            spacing={3}
          >
            <Grid className={classes.forminput_container} item xs={12}>
              <input
                className="farmer-input tamil"
                placeholder="தீர்மானம் தலைப்பு"
                type="text"
                autoComplete="off"
                style={{ padding: "15px", height: "auto" }}
                {...register("title", {
                  required: true,
                })}
              />
              {errors?.title?.type === "required" && (
                <FieldError>Required</FieldError>
              )}
            </Grid>
            {loginType === "Administrator" && (
              <>
                <Grid className={classes.forminput_container} item xs={12}>
                  <FormControl component="fieldset" row>
                    <FormLabel component="legend">
                      அனைத்து குழுவையும் தேர்ந்தெடுக்கவா?
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-label="group"
                      name="group"
                      value={isGroup}
                      onChange={(e) => setIsGroupData(e.target.value)}
                    >
                      <FormControlLabel
                        value="true"
                        control={<Radio style={{ color: "#085c49" }} />}
                        label="ஆம்"
                      />
                      <FormControlLabel
                        value="false"
                        control={<Radio style={{ color: "#085c49" }} />}
                        label="இல்லை"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                {isGroup === "false" && (
                  <Grid className={classes.forminput_container} item xs={12}>
                    <Multiselect
                      options={filterGroup}
                      showArrow
                      singleSelect
                      displayValue="name"
                      onSelect={setGroup}
                      placeholder="குழு "
                      selectedValues={group}
                      style={{
                        searchBox: {
                          border: "none",
                          padding: "15px",
                        },
                      }}
                    />
                  </Grid>
                )}
              </>
            )}
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
                options={filterParticipant}
                displayValue="name"
                onSelect={setHost}
                placeholder="தொகுப்பாளர் "
                selectedValues={host}
                id="css_custom"
                style={{
                  searchBox: {
                    border: "none",
                    padding: "15px",
                  },
                }}
              />
            </Grid>
            <Grid item xs={6} style={{ zIndex: "5" }}>
              <Multiselect
                options={filterFarmer}
                displayValue="name"
                onSelect={setParticipant}
                placeholder="பங்கேற்பாளர்கள்"
                selectedValues={participant}
                id="css_custom"
                style={{
                  searchBox: {
                    border: "none",
                    padding: "15px",
                  },
                }}
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
