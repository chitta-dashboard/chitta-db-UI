import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { useStyles } from "../../../assets/styles";
import { NoRecordsFound } from "../../widgets/NoRecordsFound";

const FarmerGroups = () => {
  const classes = useStyles();

  return (
    <>
      <TableContainer className={classes.tab_container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tab_headericoncell}>#</TableCell>
              <TableCell className={classes.tab_headercell}>
                Group name
              </TableCell>
              <TableCell className={classes.tab_headercell}>
                Group Description
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow role="checkbox" tabIndex={-1} className={classes.tab_row}>
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
              <TableCell className={classes.tab_cell}>"Group name"</TableCell>
              <TableCell className={classes.tab_cell}>
                "Group description"
              </TableCell>
            </TableRow>
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
