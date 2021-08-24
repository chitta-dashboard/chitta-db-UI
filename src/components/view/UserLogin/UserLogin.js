import React, { useContext, useRef } from "react";
import { useStyles } from "../../../assets/styles";
import Logo from "../../../assets/images/nerkathir_logo.png";
import { UserLoginContext } from "../../context/UserLoginContext";
import { checkCeo, checkFarmer } from "../../../constants/config";

export default function UserLogin() {
  const { loginHandler, loginTypeHandler } = useContext(UserLoginContext);
  const phoneNumberRef = useRef("");
  const passwordRef = useRef("");
  const classes = useStyles();

  const submitHandler = (e) => {
    e.preventDefault();

    checkCeo(phoneNumberRef.current.value)
      .then((res) => {
        if (
          res[0]?.phoneNumber.toString().substring(0, 4) +
            res[0]?.DOB.split("-")[0] ===
          passwordRef.current.value
        ) {
          loginHandler(res);
          console.log("res",res)
          loginTypeHandler("Administrator");
        } else if (res.length === 0) {
          checkFarmer(phoneNumberRef.current.value)
            .then((res) => {
              let dob =
                res[0]?.DOB.indexOf("/") > 0
                  ? res[0].DOB.split("/")[0]
                  : res[0].DOB.split("-")[0];
              console.log(dob, passwordRef.current.value);
              if (
                res[0]?.phoneNumber.toString().substring(0, 4) + dob ===
                passwordRef.current.value
              ) {
                loginHandler(res);
                loginTypeHandler("Farmer");
              } else {
                console.log("error");
              }
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={classes.loginRoot}>
      <div className={classes.loginContainer}>
        <div>
          <img src={Logo} alt="" className={classes.loginLogo} />
        </div>
        <div
          style={{
            width: "100%",
          }}
        >
          <form onSubmit={submitHandler}>
            <label>கைபேசி எண் </label>
            <input
              className={classes.loginInput}
              placeholder="Username"
              ref={phoneNumberRef}
            />
            <br />
            <label>கடவுச்சொல் </label>
            <input
              type="password"
              className={classes.loginInput}
              placeholder="Password"
              ref={passwordRef}
            />
            <div className={classes.loginActions}>
              <button className={classes.loginButton}>Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
