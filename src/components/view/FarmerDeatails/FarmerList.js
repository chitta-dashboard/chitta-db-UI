import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import Workbook from "react-excel-workbook";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Box from "@material-ui/core/Box";
import { NavLink } from "react-router-dom";
import { useStyles } from "../../../assets/styles";
import {
  getFormattedDate,
  searchWord,
  FarmerDetailsList,
} from "../../../constants";
import config from "../../../constants/config";
import { NoRecordsFound } from "../../widgets/NoRecordsFound";
import AddIcon from "@material-ui/icons/Add";

const FarmerList = (props) => {
  const { farmersData } = props;

  const classes = useStyles();
  const [searchValue, setSearchValue] = useState("");
  const [filteredList, setFilteredList] = useState([]);
  const [disableBtn, setDisableBtn] = useState("false");

  useEffect(() => {
    let filteredList = [];

    if (searchValue.trim().length > 0)
      filteredList = farmersData.filter((e) => {
        return (
          searchWord(e.name, searchValue) ||
          searchWord(e.aadharNumber, searchValue) ||
          searchWord(e.phoneNumber, searchValue)
        );
      });

    setFilteredList(filteredList);
  }, [searchValue, farmersData]);

  const customisedData = farmersData.map((item) => {
    return {
      ...item,
      DOB: item.DOB ? getFormattedDate(item.DOB) : "",
      surveyArray:
        item.surveyArray.length &&
        item.surveyArray[0].survey_numbers.map((e) => e.surveyNo).join(),
    };
  });

  const FormData = filteredList.length
    ? filteredList
    : !searchValue.length
    ? farmersData
    : [];
  useEffect(() => {
    if (FormData.length > 0) {
      setDisableBtn(false);
    }
  }, [FormData]);

  return (
    <>
      <Box className={classes.farmerdetails_subheader} xs={12}>
        <Box className={classes.farmerdetails_searchcontainer}>
          <div className={classes.searchBox}>
            <input
              id="filled-basic"
              className={classes._search}
              autoComplete={"off"}
              placeholder="Search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <i className="fa fa-search searchIcon"></i>
          </div>
        </Box>
        <Box className={classes.farmerdetails_boxcontainer}>
          <Workbook
            filename="Farmers.xlsx"
            element={
              <button
                disabled={disableBtn}
                className={classes.exportDetails_btn}
              >
                Export Farmers
              </button>
            }
          >
            <Workbook.Sheet data={customisedData} name="Sheet A">
              {FarmerDetailsList.map((item) => (
                <Workbook.Column
                  key={item.id}
                  label={item.key}
                  value={item.name}
                />
              ))}
            </Workbook.Sheet>
          </Workbook>
          <Box>
            <NavLink to="/addfarmer" className={classes.addDetails_link}>
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
            <TableRow style={{ borderRadius: "20px" }}>
              <TableCell className={classes.tab_headericoncell}>#</TableCell>
              <TableCell className={classes.tab_headercell}>பெயர்</TableCell>
              <TableCell className={classes.tab_headercell}>குழு</TableCell>
              <TableCell className={classes.tab_headercell}>
                கைபேசி எண்
              </TableCell>
              <TableCell className={classes.tab_headercell}>ஏக்கர்</TableCell>
              <TableCell className={classes.tab_headercell}>ஊர் </TableCell>
              <TableCell className={classes.tab_headercell}>மாவட்டம்</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {FormData.map((farmer) => {
              return (
                <TableRow
                  role="checkbox"
                  tabIndex={-1}
                  key={farmer.id}
                  className={classes.tab_row}
                  onClick={() =>
                    props.history.push(`farmersdetails/${farmer.id}`)
                  }
                >
                  <TableCell padding="none" className={classes.icontab_cell}>
                    <img
                      alt=""
                      src={
                        farmer.userImg?.url
                          ? `${config.app.APP_API_URL}${farmer.userImg.url}`
                          : farmer.gender === "male"
                          ? require("../../../assets/images/male.svg").default
                          : require("../../../assets/images/female.svg").default
                      }
                      className={classes.tab_user_logo}
                    />
                  </TableCell>
                  <TableCell className={classes.tab_cell}>
                    {farmer.name}
                  </TableCell>
                  <TableCell className={classes.tab_cell}>
                    {farmer.farmer_group.groupName}
                  </TableCell>
                  <TableCell className={classes.tab_cell}>
                    {farmer.phoneNumber}
                  </TableCell>
                  <TableCell className={classes.tab_cell}>
                    {farmer.acre}
                  </TableCell>
                  <TableCell className={classes.tab_cell}>
                    {farmer.village}
                  </TableCell>
                  <TableCell className={classes.tab_cell}>
                    {farmer.district}
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

export default FarmerList;
