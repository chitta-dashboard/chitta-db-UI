import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useStyles } from "../../../assets/styles";
import CustomButton from "../../widgets/CustomButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
// import { FieldError } from "../Common/FieldError";
import SelectSearch, { fuzzySearch } from "react-select-search";
import {
  getCrops,
  getFarmers,
  postCultivation,
} from "../../../constants/config";
import { useQuery } from "react-query";
import { useHistory } from "react-router";
import { customToast } from "../../widgets/Toast";

const AddCultivation = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const [filteredData, setFilteredData] = useState(null);
  const [crops, setCrops] = useState([{}, {}]);

  useEffect(() => {
    getCropsList();
  }, []);

  const getCropsList = async () => {
    await getCrops().then((res) => {
      const filteredCrops = res.map((data) => {
        return {
          name: data.cropname,
          value: data.id,
        };
      });
      setCrops(filteredCrops);
    });
  };

  const { match } = props;
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const { data: initialFarmersData } = useQuery("getFarmerddDataE", () =>
    getFarmers()
  );

  useEffect(() => {
    const filteredData = initialFarmersData?.map((data) => {
      return {
        name: data.name,
        value: data.id,
      };
    });
    setFilteredData(filteredData);
  }, [initialFarmersData]);

  const postCultivationHandler = (data) => {
    postCultivation(data)
      .then((res) => customToast("success", "Form submitted successfully."))
      .catch((err) => customToast("error", "An Error occured."));
    history.push("/cultivation");
  };

  return (
    <div className={classes.form}>
      <form onSubmit={handleSubmit((data) => postCultivationHandler(data))}>
        <Grid className={classes.form_container} container spacing={3}>
          <Grid className={classes.adddetails_header} item xs={12}>
            <Link to="/cultivation" style={{ textDecoration: "none" }}>
              <CustomButton
                className={classes.addDetailbtn_container}
                icon={<ChevronLeftIcon className={classes.iconbtn} />}
                value={match.params.id ? "Edit Cultivation" : "Add Cultivation"}
              />
            </Link>
          </Grid>
          <Grid
            className={classes.forminput_containerrow}
            container
            spacing={3}
          >
            <Grid item xs={6}>
              <Controller
                name="farmer"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <SelectSearch
                    className={"filterform-btn"}
                    search
                    filterOptions={fuzzySearch}
                    options={
                      filteredData !== null && filteredData !== undefined
                        ? filteredData
                        : [{ name: "", value: "" }]
                    }
                    placeholder="Select User"
                    {...field}
                  />
                )}
              />
              {errors?.farmer?.type === "required" && (
                <p style={{ color: "red" }}>required *</p>
              )}
            </Grid>
            <Grid item xs={6}>
              <select
                autoComplete="off"
                name="year"
                form="yearform"
                className="farmer-input"
                {...register("year", {
                  required: true,
                })}
              >
                <option value="2021-2022">2021-2022</option>
                <option value="2020-2021">2020-2021</option>
                <option value="2019-2020">2019-2020</option>
                <option value="2018-2019">2018-2019</option>
                <option value="2017-2018">2017-2018</option>
              </select>
            </Grid>
            <Grid item xs={4}>
              <Controller
                name="s1"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <SelectSearch
                    className={"filterform-btn"}
                    search
                    filterOptions={fuzzySearch}
                    options={crops}
                    placeholder="பருவம் 1"
                    value={crops}
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <Controller
                name="s2"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <SelectSearch
                    className={"filterform-btn"}
                    search
                    filterOptions={fuzzySearch}
                    options={crops}
                    placeholder="பருவம் 2"
                    value={crops}
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <Controller
                name="s3"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <SelectSearch
                    className={"filterform-btn"}
                    search
                    filterOptions={fuzzySearch}
                    options={crops}
                    placeholder="பருவம் 3"
                    value={crops}
                    {...field}
                  />
                )}
              />
            </Grid>
          </Grid>
          <Grid className={classes.cultivation_container_btn} container>
            <button type="submit" className={classes.submit_btn}>
              SUBMIT
            </button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddCultivation;
