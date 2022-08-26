import React, { useState,useRef,useEffect,useContext } from "react";
import Grid from "@material-ui/core/Grid";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { Link } from "react-router-dom";
import { useStyles } from "../../../assets/styles";
import { postFarmerGroup } from "../../../constants/config";
import { customToast } from "../../widgets/Toast";
import { useHistory } from "react-router";
import { useQuery,useMutation } from "react-query";
import { UserLoginContext } from "../../context/UserLoginContext";
import SelectSearch, { fuzzySearch } from "react-select-search";
import CustomButton from "../../widgets/CustomButton";
import {getFarmers} from "../../../constants/config";
import Multiselect from "multiselect-react-dropdown";

const AddFarmerGroup = () => {
  const classes = useStyles();
  const { loginType } = useContext(UserLoginContext);

  const [leader,setLeader] = useState({});
  const [treasurer,setTreasurer] = useState({});
  const [secretary,setSecretary] = useState({});

  const groupName = useRef("");
  const Description = useRef("");
  const history = useHistory();
  const [filteredData, setFilteredData] = useState(null);

  const addFarmer = useMutation((data) => postFarmerGroup(data));

  const { data: farmerList } = useQuery("getFarmerSearch", () =>
    getFarmers().then((res) =>
      res.map((data) => ({
        name: data?.name,
        _id: data?.id,
      }))
    )
  );

  useEffect(() => {
    const result = farmerList?.map((data) => {
      return {
        name: data.name,
        value: data._id,
      };
    });
    setFilteredData(result);
  }, [farmerList]);


  const handleSelectedData = (id,data,setData)=>{
    setData(data);
  }

  const postGroupData = (e) => {
    e.preventDefault();
    const params = {
      groupName: groupName.current.value,
      description: Description.current.value,
      leader : leader.value,
      treasurer : treasurer.value,
      secretary : secretary.value
    };
    addFarmer.mutate(params, {
      onSuccess: (data) => {
        if(data.isLeader){
          customToast("error", `${leader.name} is already a leader in different group!`);
        }else if(data.isTreasurer){
          customToast("error", `${treasurer.name} is already a treasurer in different group!`);
        }else if(data.issecretary){
          customToast("error", `${secretary.name} is already a secretary in different group!`);
        }else{
          customToast("success", "Form submitted successfully.");
          history.goBack();
          setLeader(null)
          setTreasurer(null)
          setSecretary(null)
        }
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
              placeholder="குழு பெயர் "
              ref={groupName}
              autoComplete="off"
            />
          </Grid>
          <Grid className={classes.forminput_container} item xs={12}>
            <textarea
              className="farmer-input tamil"
              placeholder="விளக்கம்"
              rows="4"
              cols="50"
              type="text"
              autoComplete="off"
              ref={Description}
              style={{ padding: "15px", height: "30vh" }}
            />
          </Grid>
          <div className="farmer-group-selector-container">
          <SelectSearch
                className={"filter-btn farmer-group-filter-btn"}
                search
                disabled={loginType === "Farmer"}
                filterOptions={fuzzySearch}
                options={
                  filteredData !== null && filteredData !== undefined
                    ? filteredData
                    : [{ name: "", value: "" }]
                }
                placeholder="தலைவர்"
                onChange={(id,data) => handleSelectedData(id,data,setLeader)}
                value={leader}
              />
              <SelectSearch
                className={"filter-btn farmer-group-filter-btn porulalar-filter-btn"}
                search
                disabled={loginType === "Farmer"}
                filterOptions={fuzzySearch}
                options={
                  filteredData !== null && filteredData !== undefined
                    ? filteredData
                    : [{ name: "", value: "" }]
                }
                placeholder="பொருளாளர்"
                onChange={(id,data) => handleSelectedData(id,data,setTreasurer)}
                value={treasurer}
              />
              <SelectSearch
                className={"filter-btn farmer-group-filter-btn seyalalar-filter-btn"}
                search
                disabled={loginType === "Farmer"}
                filterOptions={fuzzySearch}
                options={
                  filteredData !== null && filteredData !== undefined
                    ? filteredData
                    : [{ name: "", value: "" }]
                }
                placeholder="செயலாளர்"
                onChange={(id,data) => handleSelectedData(id,data,setSecretary)}
                value={secretary}
              />
          </div>
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
