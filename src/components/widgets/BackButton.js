import React from "react";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { useStyles } from "../../assets/styles";
import Button from "@material-ui/core/Button";

const BackButton = (props) => {
  const classes = useStyles();
  const { history } = props;
  const goBackHandler = () => {
    history.goBack();
  };
  return (
    <Button onClick={goBackHandler} className={classes.addDetailbtn_container}>
      <ChevronLeftIcon className={classes.iconbtn} />
      Back
    </Button>
  );
};
export default BackButton;
