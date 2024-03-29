import {
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useStyles } from "../../../assets/styles";
import { UserLoginContext } from "../../context/UserLoginContext";
import CustomButton from "../../widgets/CustomButton";
import AddIcon from "@material-ui/icons/Add";
import SelectSearch, { fuzzySearch } from "react-select-search";
import { getFarmers, getCultivation } from "../../../constants/config";
import { useQuery } from "react-query";

const Cultivation = () => {
  const { loginType } = useContext(UserLoginContext);
  const classes = useStyles();
  const [selectedUser, setSelectedUser] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [cultivationData, setCultivationData] = useState(null);
  const { data: initialFarmersData } = useQuery("usersdata", () =>
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

  const handleSelect = (id) => {
    setSelectedUser(id);
    getCultivation(id).then((res) => setCultivationData(res));
  };

  return (
    <div className={classes.cultivation_root}>
      <Grid container spacing={3}>
        <Box className={classes.farmerdetails_subheader} xs={12}>
          <Box className={classes.farmerdetails_searchcontainer}>
            <div className={classes.searchBox}>
              <SelectSearch
                className={"filter-btn"}
                search
                disabled={loginType === "Farmer"}
                filterOptions={fuzzySearch}
                options={
                  filteredData !== null && filteredData !== undefined
                    ? filteredData
                    : [{ name: "", value: "" }]
                }
                placeholder="Select User"
                onChange={(id) => handleSelect(id)}
                value={selectedUser}
              />
            </div>
          </Box>
          <Box className={classes.farmerdetails_boxcontainer}>
            {loginType === "Administrator" && (
              <Box>
                <NavLink
                  to="/addCultivation"
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
          {selectedUser !== null && selectedUser !== undefined ? (
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell
                    className={classes.tab_headercell}
                    style={{ color: "#464E5F" }}
                  >
                    வருடம்
                  </TableCell>
                  <TableCell
                    className={classes.tab_headercell}
                    style={{ color: "#464E5F" }}
                  >
                    பருவம் 1
                  </TableCell>
                  <TableCell
                    className={classes.tab_headercell}
                    style={{ color: "#464E5F" }}
                  >
                    பருவம் 2
                  </TableCell>
                  <TableCell
                    className={classes.tab_headercell}
                    style={{ color: "#464E5F" }}
                  >
                    பருவம் 3
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cultivationData?.map((cultivation) => {
                  return (
                    <TableRow
                      role="checkbox"
                      tabIndex={-1}
                      className={classes.tab_row}
                      key={cultivation.id}
                    >
                      <TableCell
                        className={classes.tab_cell}
                        style={{ color: "#464E5F" }}
                      >
                        {cultivation?.year}
                      </TableCell>
                      <TableCell
                        className={classes.tab_cell}
                        style={{ color: "#464E5F" }}
                      >
                        {cultivation.s1.cropname}
                      </TableCell>
                      <TableCell
                        className={classes.tab_cell}
                        style={{ color: "#464E5F" }}
                      >
                        {cultivation.s2.cropname}
                      </TableCell>
                      <TableCell
                        className={classes.tab_cell}
                        style={{ color: "#464E5F" }}
                      >
                        {cultivation.s3.cropname}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            <Box className={classes.selectUserContainer}>
              Please select a user to see details...
            </Box>
          )}
        </TableContainer>
      </Grid>
    </div>
  );
};

export default Cultivation;
