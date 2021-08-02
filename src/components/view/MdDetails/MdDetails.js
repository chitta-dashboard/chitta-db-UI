import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import config, { getMD } from "../../../constants/config";
import { useStyles } from "../../../assets/styles";
import { NoRecordsFound } from "../../widgets/NoRecordsFound";
import tempImg from "../../../assets/images/male.svg";
import { NavLink } from "react-router-dom";
import Box from "@material-ui/core/Box";
import AddIcon from "@material-ui/icons/Add";
const MdDetails = () => {
  const classes = useStyles();
  const [mdDetails, setMdDetails] = useState([]);

  useEffect(() => {
    getMD()
      .then((res) => {
        setMdDetails(res);
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
            <NavLink to="/addMd" className={classes.addDetails_link}>
              <button className={classes.addDetails_btn}>
                <AddIcon />
                Add
              </button>
            </NavLink>
          </Box>
        </Box>
      </Box>
      <TableContainer className={classes.tab_container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tab_headericoncell}>#</TableCell>
              <TableCell className={classes.tab_headercell}>name</TableCell>
              <TableCell className={classes.tab_headercell}>
                Phone number
              </TableCell>
              <TableCell className={classes.tab_headercell}>
                Description
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mdDetails.map((data) => {
              return (
                <TableRow
                  role="checkbox"
                  tabIndex={-1}
                  className={classes.tab_row}
                  key={data.id}
                >
                  <TableCell padding="none" className={classes.icontab_cell}>
                    <img
                      alt=""
                      src={tempImg}
                      className={classes.tab_user_logo}
                    />
                  </TableCell>
                  <TableCell className={classes.tab_cell}>
                    {data.name}
                  </TableCell>
                  <TableCell className={classes.tab_cell}>
                    {data.phoneNumber}
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

export default MdDetails;
