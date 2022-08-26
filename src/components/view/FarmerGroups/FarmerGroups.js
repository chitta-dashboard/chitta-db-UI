import React from "react";
import { useState, useEffect, useContext } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { useStyles } from "../../../assets/styles";
import { NoRecordsFound } from "../../widgets/NoRecordsFound";
import { getFarmers, getFarmersGroup } from "../../../constants/config";
import { NavLink, useHistory } from "react-router-dom";
import Box from "@material-ui/core/Box";
import AddIcon from "@material-ui/icons/Add";
import searchLogo from "../../../assets/images/search.svg";
import { searchWord } from "../../../constants";
import { Grid } from "@material-ui/core";
import { UserLoginContext } from "../../context/UserLoginContext";
import { useQuery } from "react-query";
import CustomButton from "../../widgets/CustomButton";
import { Loader } from "../../widgets/Loader";
import { Error } from "../../widgets/Error";

const FarmerGroups = () => {
  const { loginType, setSearchFormarDetail } = useContext(UserLoginContext);
  const classes = useStyles();
  const history = useHistory();
  const [searchValue, setSearchValue] = useState("");
  const [filteredList, setFilteredList] = useState([]);
  const [initialFilterList, setInitialFilterList] = useState([]);

  const { isLoading,isError,data: groups, error } = useQuery("getGroups", () => getFarmersGroup());
  const { data: farmersData } = useQuery("getFarmerData", () => getFarmers());

  useEffect(() => {
    if (farmersData?.length && groups?.length) {
      let matchGroupList = groups.filter((value) => {
        return farmersData.some((data) => {
          return value.groupName === data.farmerGroup;
        });
      });
      let unMatchGroupList = groups.filter((value) => {
        return farmersData.some((data) => {
          return value.groupName !== data.farmerGroup;
        });
      });
      setInitialFilterList([...matchGroupList, ...unMatchGroupList]);
    }
  }, [groups, farmersData]);

  useEffect(() => {
    let filteredList = [];

    if (searchValue.trim().length > 0)
      filteredList = groups.filter((e) => {
        return searchWord(e.groupName, searchValue);
      });

    setFilteredList(filteredList);
  }, [searchValue, groups]);

  const groupsData = filteredList.length
    ? filteredList
    : !searchValue.length
    // ? groups
    ? initialFilterList
    : [];

  const handleTableColor = (groupName) => {
    let colors = farmersData.filter((val) => val.farmerGroup === groupName);
    return {
      color: colors.length > 0 ? "#085c49" : "",
      fontWeight: colors.length > 0 ? "700" : "",
    };
  };

  return (
    <div className={classes.farmerdetails_root}>
      <Grid container spacing={3} className={classes.Detailscard_container}>
        <Box className={classes.farmerdetails_subheader} xs={12}>
          <Box className={classes.farmerdetails_searchcontainer}>
            <div className={classes.searchBox}>
              <input
                id="filled-basic"
                className={classes._search}
                autoComplete={"off"}
                placeholder="search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <img src={searchLogo} alt="" draggable="false" className={classes.searchIcon} />
            </div>
          </Box>
          <Box className={classes.farmerdetails_boxcontainer}>
            {loginType === "Administrator" && (
              <Box>
                <NavLink
                  to="/addfarmerGroup"
                  className={classes.addDetails_link}
                >
                  <CustomButton
                    className={classes.addDetails_btn}
                    value="Add"
                    icon={<AddIcon />}
                  />
                </NavLink>
              </Box>
            )}
          </Box>
        </Box>
        <TableContainer className={classes.tab_container}>
          {isLoading ? (
              <Loader className={classes.no_data} />
            ) : isError ? (
              <Error className={classes.no_data} error={error.message.toString()}/>
            ) : (
            <>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      className={classes.tab_headercell}
                      style={{ color: "#464E5F" }}
                    >
                      குழு பெயர்
                    </TableCell>
                    <TableCell className={classes.tab_headercell}>
                      குழு விளக்கம்
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {groupsData.map((data) => {
                    return (
                      <TableRow
                        key={data.id}
                        role="checkbox"
                        tabIndex={-1}
                        className={classes.tab_row}
                        onClick={() => {
                          history.push(`/farmersdetails`);
                          setSearchFormarDetail(data.groupName);
                        }}
                      >
                        <TableCell
                          className={classes.tab_cell}
                          style={handleTableColor(data.groupName)}
                        >
                          {data.groupName ? data.groupName : ""}
                        </TableCell>
                        <TableCell
                          className={classes.tab_cell}
                          style={handleTableColor(data.groupName)}
                        >
                          {data.description ? data.description : ""}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              <div className={classes.no_data}>
                {!groups.length && <NoRecordsFound />}
              </div>
            </>
          )}
        </TableContainer>
      </Grid>
    </div>
  );
};

export default FarmerGroups;
