import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import config from "../../../constants/config";
import { useStyles } from "../../../assets/styles";
import { NoRecordsFound } from "../../widgets/NoRecordsFound";

const MdDetails = () => {
  const classes = useStyles();
  const [mdDetails, setMdDetails] = useState([]);

  useEffect(() => {
    axios
      .get(`${config.app.APP_API_URL}/mds`)
      .then((res) => {
        setMdDetails(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
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
                      // src={
                      //   farmer.userImg?.url
                      //     ? `${config.app.APP_API_URL}${farmer.userImg.url}`
                      //     : farmer.gender === "male"
                      //     ? require("../../../assets/images/male.svg").default
                      //     : require("../../../assets/images/female.svg").default
                      // }
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
                    {data.description ? data.description : "description"}
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
