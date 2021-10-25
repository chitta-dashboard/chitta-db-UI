import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useStyles } from "../../../assets/styles";
import CustomButton from "../../widgets/CustomButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { FieldError } from "../Common/FieldError";
import SelectSearch, { fuzzySearch } from "react-select-search";
import { getFarmers } from "../../../constants/config";
import { useQuery } from "react-query";

const AddCultivation = (props) => {
  const classes = useStyles();
  const [farmers, setFarmers] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [season1, setSeason1] = useState(null);
  const [season2, setSeason2] = useState(null);
  const [season3, setSeason3] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [farmerData, setFarmerData] = useState(null);

  const options = [
    { name: "Swedish", value: "sv" },
    { name: "English", value: "en" },
  ];

  const { match } = props;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const {
    data: initialFarmersData,
    isLoading,
    isError,
    error,
  } = useQuery("getFarmerddDataE", () => getFarmers());

  useEffect(() => {
    const filteredData = initialFarmersData?.map((data) => {
      return {
        name: data.name,
        value: data.name,
      };
    });
    setFilteredData(filteredData);
  }, [initialFarmersData]);

  console.log(
    filteredData !== null && filteredData !== undefined ? true : false
  );

  console.log(filteredData);
  return (
    <div className={classes.form}>
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
      >
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
              {/* <SelectSearch
                className={"filterform-btn"}
                search
                filterOptions={fuzzySearch}
                options={
                  filteredData !== null && filteredData !== undefined
                    ? filteredData
                    : [{ name: "", value: "" }]
                }
                placeholder="Select User"
                onChange={setSelectedUser}
                value={selectedUser}
              /> */}
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
              <SelectSearch
                className={"filterform-btn"}
                search
                filterOptions={fuzzySearch}
                options={options}
                placeholder="பருவம் 1"
                onChange={setSeason1}
                value={season1}
              />
            </Grid>
            <Grid item xs={4}>
              <SelectSearch
                className={"filterform-btn"}
                search
                filterOptions={fuzzySearch}
                options={options}
                placeholder="பருவம் 2"
                onChange={setSeason2}
                value={season2}
              />
            </Grid>
            <Grid item xs={4}>
              <SelectSearch
                className={"filterform-btn"}
                search
                filterOptions={fuzzySearch}
                options={options}
                placeholder="பருவம் 3"
                onChange={setSeason3}
                value={season3}
              />
            </Grid>
          </Grid>
          <Grid className={classes.forminput_container_btn} container>
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
