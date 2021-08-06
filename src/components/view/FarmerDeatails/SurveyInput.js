import React, { Fragment } from "react";
import Grid from "@material-ui/core/Grid";

const SurveyInput = (props) => {
  const { id, value, isAddable, handleChange, handleActions } = props;

  return (
    <Fragment>
      <Grid item xs={12} style={{ display: "flex" }}>
        <input
          type="text"
          autoComplete="off"
          placeholder="கணக்கெடுப்பு எண்"
          className="farmer-input"
          value={value}
          onChange={(e) => handleChange(id, e)}
        />
        <button
          className="farmer-input"
          disabled={value === null || value === ""}
          onClick={(e) => handleActions(e)}
          style={{
            width: "8%",
            minWidth: "80px",
            marginLeft: "1.2rem",
            display: "grid",
            placeItems: "center",
          }}
        >
          <h2 style={{ margin: 0 }}>{isAddable ? "+" : "-"}</h2>
          {/* <h2 style={{ margin: 0 }}>+</h2> */}
        </button>
      </Grid>
    </Fragment>
  );
};

export default SurveyInput;
