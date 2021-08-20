import React, { useRef } from "react";
import Grid from "@material-ui/core/Grid";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { Link } from "react-router-dom";
import { useStyles } from "../../../assets/styles";
import { postFarmerGroup } from "../../../constants/config";
import { customToast } from "../../widgets/Toast";
import { useHistory } from "react-router";
import { useMutation } from "react-query";
import CustomButton from "../../widgets/CustomButton";

const AddFarmerGroup = () => {
  const classes = useStyles();
  const groupName = useRef("");
  const Description = useRef("");
  const history = useHistory();

  const addFarmer = useMutation((data) => postFarmerGroup(data));

  const postGroupData = (e) => {
    e.preventDefault();
    const params = {
      groupName: groupName.current.value,
      description: Description.current.value,
    };
    addFarmer.mutate(params, {
      onSuccess: (data) => {
        customToast("success", "Form submitted successfully.");
        history.goBack();
      },
      onError: (error) => {
        customToast("error", error.message);
      },
    });
  };

  return (
    <div className={classes.form}>
      <form>
        <Grid className={classes.form_container} container spacing={3}>
          <Grid className={classes.adddetails_header} item xs={12}>
            <Link to="/farmergroups" style={{ textDecoration: "none" }}>
              <CustomButton className={classes.addDetailbtn_container} 
                icon={<ChevronLeftIcon className={classes.iconbtn} />}
                value="Add Farmer Group"
              />
            </Link>
          </Grid>

          <Grid item xs={12} className={classes.forminput_containerrow}>
            <input
              className="farmer-input tamil"
              type="text"
              placeholder="Group name"
              ref={groupName}
              autoComplete="off"
            />
          </Grid>
          <Grid className={classes.forminput_container} item xs={12}>
            <textarea
              className="farmer-input tamil"
              placeholder="Description"
              rows="4"
              cols="50"
              type="text"
              autoComplete="off"
              ref={Description}
              style={{ padding: "15px", height: "30vh" }}
            />
          </Grid>
          <Grid className={classes.forminput_container_btn} container>
            <button
              type="submit"
              className={classes.submit_btn}
              onClick={postGroupData}
            >
              SUBMIT
            </button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddFarmerGroup;
