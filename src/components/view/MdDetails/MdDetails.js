import React, { useContext } from "react";
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
import { Grid } from "@material-ui/core";
import { UserLoginContext } from "../../context/UserLoginContext";
import { useQuery } from "react-query";
import CustomButton from "../../widgets/CustomButton";
import { Loader } from "../../widgets/Loader";
import { Error } from "../../widgets/Error";

const MdDetails = (props) => {
  const { loginType } = useContext(UserLoginContext);
  const classes = useStyles();

  function addDefaultSrc(ev) {
    ev.target.src = tempImg;
  }
  let filter = {
    type: "md",
  };
  const { isLoading, data, isError, error } = useQuery("Md", () =>
    getAdmin(filter)
  );

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
                  <NavLink to="/addmd" className={classes.addDetails_link}>
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
            {isLoading ? (
              <Loader className={classes.no_data} />
            ) : isError ? (
              <Error
                className={classes.no_data}
                error={error.message.toString()}
              />
            ) : (
              <>
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
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((data) => {
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
                            <img draggable="false"
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
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
                <div className={classes.no_data}>
                  {!data.length && <NoRecordsFound />}
                </div>
              </>
            )}
          </TableContainer>
        </Grid>
      </div>
    </>
  );
};

export default MdDetails;
