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
                  key={data.id ? data.id : ""}
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
