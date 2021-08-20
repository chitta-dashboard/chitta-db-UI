import { useStyles } from "../../../assets/styles";

export function FieldError(props) {
  const classes = useStyles();

  return <p className={classes.requiredWarningText}>{props.children}</p>;
}
