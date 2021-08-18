import React, { useState, useEffect, useContext } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { getAdmin } from "../../../constants/config";
import { useStyles } from "../../../assets/styles";
import { NoRecordsFound } from "../../widgets/NoRecordsFound";
import tempImg from "../../../assets/images/male.svg";
import { NavLink } from "react-router-dom";
import Box from "@material-ui/core/Box";
import AddIcon from "@material-ui/icons/Add";
import config from "../../../constants/config";
import tempSign from "../../../assets/images/default_sign.png";
import { Grid } from "@material-ui/core";
import { UserLoginContext } from "../../context/UserLoginContext";
import { useQuery } from "react-query";
import { CircularProgress } from "@material-ui/core";
import AddButton from "../../widgets/AddButton";

const MdDetails = (props) => {
  const { loginType } = useContext(UserLoginContext);
  const classes = useStyles();
  const [mdDetails, setMdDetails] = useState([]);

  function addDefaultSrc(ev) {
    ev.target.src = tempImg;
  }
  let filter = {
    type: "md",
  };
  let initialArr = [];
  const {
    isLoading,
    data = initialArr,
    isError,
  } = useQuery("Md", () => getAdmin(filter));

  // useEffect(() => {
  //   let filter = {
  //     type: "md",
  //   };
  //   getAdmin(filter)
  //     .then((res) => {
  //       setMdDetails(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);
  function addDefaultSign(ev) {
    ev.target.src = tempSign;
  }

  return (
    <>
      <div className={classes.farmerdetails_root}>
        <Grid container spacing={3} className={classes.Detailscard_container}>
          <Box className={classes.farmerdetails_subheader} xs={12}>
            <Box className={classes.farmerdetails_searchcontainer}></Box>
            <Box className={classes.farmerdetails_boxcontainer}>
              {/* <button className={classes.exportDetails_btn}>Export Farmers</button> */}
              {loginType === "Administrator" && (
                <Box>
                  {/* <NavLink to="/addmd" className={classes.addDetails_link}>
                    <button className={classes.addDetails_btn}>
                      <AddIcon />
                      Add
                    </button>
                  </NavLink> */}
                  <AddButton link={"/addmd"} />
                </Box>
              )}
            </Box>
          </Box>
          <TableContainer className={classes.tab_container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tab_headericoncell}>
                    #
                  </TableCell>
                  <TableCell
                    className={classes.tab_headercell}
                    style={{ color: "#464E5F" }}
                  >
                    பெயர்
                  </TableCell>
                  <TableCell className={classes.tab_headercell}>
                    கைபேசி எண்
                  </TableCell>
                  <TableCell className={classes.tab_headercell}>
                    தகுதி
                  </TableCell>
                  <TableCell className={classes.tab_headercell}>
                    கையொப்பம்
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!isLoading &&
                  !isError &&
                  data.map((data) => {
                    return (
                      <TableRow
                        role="checkbox"
                        tabIndex={-1}
                        className={classes.tab_row}
                        key={data.id}
                        onClick={() =>
                          props.history.push(`mdDetail/${data.id}`)
                        }
                      >
                        <TableCell
                          padding="none"
                          className={classes.icontab_cell}
                        >
                          <img
                            alt=""
                            src={
                              data?.picture
                                ? `${config.app.APP_API_URL}${data.picture?.url}`
                                : tempImg
                            }
                            onError={addDefaultSrc}
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
                          {data.qualification ? data.qualification : ""}
                        </TableCell>
                        <TableCell
                          padding="none"
                          className={classes.icontab_cell}
                        >
                          <img
                            alt=""
                            src={
                              data?.signature
                                ? `${config.app.APP_API_URL}${data.signature.url}`
                                : tempSign
                            }
                            onError={addDefaultSign}
                            className={classes.tab_user_signature}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
            <div className={classes.no_data} style={{ margin: "2rem 0rem" }}>
              {isLoading && <CircularProgress />}
            </div>
            <div className={classes.no_data}>
              {!data.length && !isLoading && <NoRecordsFound />}
            </div>
          </TableContainer>
        </Grid>
      </div>
    </>
  );
};

export default MdDetails;
