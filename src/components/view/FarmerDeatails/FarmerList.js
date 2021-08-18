/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
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
import config, {
  getFarmers,
  getFarmersGroup,
  getFarmerById,
} from "../../../constants/config";
import { NoRecordsFound } from "../../widgets/NoRecordsFound";
import AddIcon from "@material-ui/icons/Add";
import searchLogo from "../../../assets/images/search.svg";
import SelectSearch, { fuzzySearch } from "react-select-search";
import ClearIcon from "@material-ui/icons/Clear";
import { TableFooter, TablePagination } from "@material-ui/core";
import { UserLoginContext } from "../../context/UserLoginContext";
import Cookies from "js-cookie";
import CustomButton from "../../widgets/CustomButton";

const FarmerList = (props) => {
  const { loginType } = useContext(UserLoginContext);
  const classes = useStyles();
  const [searchValue, setSearchValue] = useState("");
  const [filteredList, setFilteredList] = useState([]);
  const [disableBtn, setDisableBtn] = useState(true);
  const [farmerList, setFarmerList] = useState();
  const [closeIcon, setCloseIcon] = useState(false);

  const [farmerGrp, setFarmerGrp] = useState([]);
  const [farmerGrpId, setFarmerGrpId] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [page, setPage] = useState(0);
  const [farmersData, setFarmersData] = useState([]);
  const [pagedFarmer, setPagedFarmer] = useState([]);
  const [farmerListGrp, setFarmerListGrp] = useState([]);
  useEffect(() => {
    // let filter = {
    //   farmerGroup: null,
    //   start: page * rowsPerPage,
    //   limit: rowsPerPage,
    // };
    getFarmers()
      .then((res) => {
        if (Cookies.get("loginType") === "Farmer") {
          getFarmerById(Cookies.get("userId")).then((data) => {
            // console.log(data.farmerGroup);
            // console.log(res);
            const tempArr = res
              .filter((value) => data.farmerGroup === value.farmerGroup)
              .map((value) => {
                return value;
              });
            setFarmersData(tempArr);
          });
        } else if (Cookies.get("loginType") === "Administrator") {
          setFarmersData(res);
          const tempArr = res.map((value) => {
            return value?.farmerGroup ?? null;
          });
          let unique = [...new Set(tempArr)];
          var filteredArr = unique.filter(function (el) {
            return el != null;
          });
          const farmerGrpArr = filteredArr.map((value) => ({
            value: value,
            name: value,
          }));
          setFarmerGrp(farmerGrpArr);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {});
  // useEffect(() => {
  //   getFarmersGroup()
  //     .then((res) =>
  //       res.map((data) => ({
  //         name: data.groupName,
  //         value: data.groupName,
  //       }))
  //     )
  //     .then((res) => setFarmerGrp(res))
  //     .catch((err) => console.log(err));
  // }, []);

  useEffect(() => {
    let filteredList = [];
    if (searchValue.trim().length > 0) {
      filteredList = farmerList.filter((e) => {
        return (
          searchWord(e.name, searchValue) ||
          searchWord(e.aadharNumber, searchValue) ||
          searchWord(e.phoneNumber, searchValue)
        );
      });
      setFilteredList(filteredList);
    } else setFilteredList(filteredList);
  }, [searchValue, farmersData]);

  const customisedData = farmersData.map((item) => {
    return {
      ...item,
      DOB: item.DOB ? getFormattedDate(item.DOB) : "",
    };
  });

  useEffect(() => {
    // if (loginType === "Farmer") {
    //   const FormData = farmerTypeArray;
    //   let newFarmersList =
    //     FormData &&
    //     FormData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    //   setPagedFarmer(newFarmersList);
    // } else {
    const FormData = filteredList.length
      ? filteredList
      : !searchValue.length
      ? farmersData
      : [];
    if (FormData.length > 0) {
      setDisableBtn(false);
    }
    let newFarmersList =
      FormData &&
      FormData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    setPagedFarmer(newFarmersList);
    // }
  }, [page, rowsPerPage, farmerList, filteredList, farmersData, searchValue]);
  // useEffect(() => {
  //   const FormData = filteredList.length
  //     ? filteredList
  //     : !searchValue.length
  //     ? farmersData
  //     : [];
  //   setFarmerList(FormData);
  //   if (FormData.length > 0) {
  //     setDisableBtn(false);
  //   }
  // }, [filteredList, farmersData, searchValue]);

  useEffect(() => {
    if (farmerGrpId !== "") {
      setPage(0);
      let updated = farmerList.filter((item) => {
        return item.farmerGroup === farmerGrpId;
      });
      // console.log(updated);
      setFarmerList(updated);
      setCloseIcon(true);
    } else {
      setFarmerList(farmersData);
    }
  }, [farmerGrpId, filteredList, farmersData, searchValue]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const clearGrp = () => {
    setCloseIcon(false);
    setFarmerGrpId("");
  };
  return (
    <>
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
            <img src={searchLogo} alt="" className={classes.searchIcon} />
          </div>
        </Box>
        <Box className={classes.farmerdetails_boxcontainer}>
          {loginType === "Administrator" && (
            <SelectSearch
              className={"filter-btn"}
              search
              disabled={loginType === "Farmer"}
              filterOptions={fuzzySearch}
              options={farmerGrp}
              placeholder="Select a group"
              onChange={setFarmerGrpId}
              value={farmerGrpId}
              // printOptions="always"
            />
          )}
          {closeIcon ? (
            <div onClick={clearGrp}>
              <ClearIcon className={classes.closeIcon} />
            </div>
          ) : (
            <div style={{ margin: "0.9rem" }}></div>
          )}
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
          {loginType === "Administrator" && (
            <Box>
              <NavLink to="/addfarmer" className={classes.addDetails_link}>
                {/* <button className={classes.addDetails_btn}>
                  <AddIcon />
                  Add
                </button> */}
                <CustomButton
                  className={classes.addDetails_btn}
                  icon={<AddIcon />}
                  value="Add"
                />
              </NavLink>
            </Box>
          )}
        </Box>
      </Box>
      <TableContainer className={classes.tab_container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow style={{ borderRadius: "20px" }}>
              <TableCell className={classes.tab_headericoncell}>#</TableCell>
              <TableCell className={classes.tab_headericoncell}>
                பெயர்
              </TableCell>
              <TableCell className={classes.tab_headercell}>குழு</TableCell>
              <TableCell className={classes.tab_headercell}>
                கைபேசி எண்
              </TableCell>
              <TableCell className={classes.tab_headercell}>சென்ட்</TableCell>
              <TableCell className={classes.tab_headercell}>ஊர் </TableCell>
              <TableCell className={classes.tab_headercell}>மாவட்டம்</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pagedFarmer &&
              pagedFarmer.map((farmer) => {
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
                            : require("../../../assets/images/female.svg")
                                .default
                        }
                        className={classes.tab_user_logo}
                      />
                    </TableCell>
                    <TableCell
                      className={classes.tab_cell}
                      style={{ color: "#464E5F" }}
                    >
                      {farmer.name}
                    </TableCell>
                    <TableCell className={classes.tab_cell}>
                      {/* {farmer?.farmer_group?.groupName} */}
                      {farmer?.farmerGroup}
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
          <TableFooter className={classes.t_Footer}>
            {/* <TableRow> */}
            <TablePagination
              rowsPerPageOptions={[15, 30, 100, { label: "All", value: -1 }]}
              colSpan={3}
              count={farmerList?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { "aria-label": "rows per page" },
                native: true,
              }}
              style={{ borderBottom: "none" }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              // ActionsComponent={TablePaginationActions}
            />
            {/* </TableRow> */}
          </TableFooter>
        </Table>
        <div className={classes.no_data}>
          {!pagedFarmer?.length && <NoRecordsFound />}
        </div>
      </TableContainer>
    </>
  );
};

export default FarmerList;
