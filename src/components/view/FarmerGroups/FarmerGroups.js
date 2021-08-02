import React from "react";
import { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { useStyles } from "../../../assets/styles";
import { NoRecordsFound } from "../../widgets/NoRecordsFound";
import axios from "axios";
import config from "../../../constants/config";
import tempImg from "../../../assets/images/male.svg";
import { NavLink } from "react-router-dom";
import Box from "@material-ui/core/Box";

const FarmerGroups = () => {
  const classes = useStyles();
  const [groups, setGroups] = useState([]);
  useEffect(() => {
    axios
      .get(`${config.app.APP_API_URL}/farmer-groups`)
      .then((res) => {
        setGroups(() => {
          return res.data;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Box className={classes.farmerdetails_subheader} xs={12}>
        <Box className={classes.farmerdetails_searchcontainer}>
          <input
            id="filled-basic"
            className={classes._search}
            autoComplete={"off"}
            placeholder="Search using Name or AadharNo or contact No"
            // value={searchValue}
            // onChange={(e) => setSearchValue(e.target.value)}
          />
        </Box>
        <Box className={classes.farmerdetails_boxcontainer}>
          {/* <button className={classes.exportDetails_btn}>Export Farmers</button> */}
          <Box>
            <NavLink to="/addfarmerGroup" className={classes.addDetails_link}>
              <button className={classes.addDetails_btn}>Add Farmer</button>
            </NavLink>
          </Box>
        </Box>
      </Box>
      <TableContainer className={classes.tab_container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tab_headercell}>
                Group name
              </TableCell>
              <TableCell className={classes.tab_headercell}>
                Group Description
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {groups.map((data) => {
              return (
                <TableRow
                  key={data.id}
                  role="checkbox"
                  tabIndex={-1}
                  className={classes.tab_row}
                >
                  <TableCell className={classes.tab_cell}>
                    {data.groupName ? data.groupName : ""}
                  </TableCell>
                  <TableCell className={classes.tab_cell}>
                    {data.description ? data.description : ""}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <div className={classes.no_data}>
          {!FormData.length && <NoRecordsFound />}
        </div>
      </TableContainer>
    </>
  );
};

export default FarmerGroups;
