import React, { useContext, useRef, useState, useEffect } from "react";
import { useStyles } from "../../../assets/styles";
import Logo from "../../../assets/images/nerkathir_logo.png";
import { UserLoginContext } from "../../context/UserLoginContext";
import { checkCeo, checkFarmer } from "../../../constants/config";

export default function UserLogin() {
  // const [userValue, setUserValue] = useState({});
  const [phoneNumberCheck, setPhoneNumberCheck] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const { loginHandler, loginTypeHandler } = useContext(UserLoginContext);
  const phoneNumberRef = useRef("");
  const passwordRef = useRef("");
  const classes = useStyles();

  // useEffect(() => {
  //   console.log(
  //     "check",
  //     userValue[0]?.phoneNumber.toString().substring(0, 4) +
  //       userValue[0]?.DOB.split("-").join("")
  //   );
  //   if (
  //     userValue[0]?.phoneNumber.toString().substring(0, 4) +
  //       userValue[0]?.DOB.split("-").join("") ===
  //     passwordRef.current.value
  //   ) {
  //     loginHandler();
  //   } else {
  //     console.log("error");
  //   }
  // }, [userValue]);

  const submitHandler = (e) => {
    e.preventDefault();
    // console.log("input", phoneNumberRef.current.value);
    // console.log("input", passwordRef.current.value);
    checkCeo(phoneNumberRef.current.value)
      .then((res) => {
        // console.log("ceo", res);
        // setUserValue(res);
        if (
          res[0]?.phoneNumber.toString().substring(0, 4) +
            res[0]?.DOB.split("-").join("") ===
          passwordRef.current.value
        ) {
          loginHandler();
          loginTypeHandler("Administrator");
        }
        if (res.length == 0) {
          checkFarmer(phoneNumberRef.current.value)
            .then((res) => {
              if (
                res[0]?.phoneNumber.toString().substring(0, 4) +
                  res[0]?.DOB.split("/").join("") ===
                passwordRef.current.value
              ) {
                loginHandler();
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
        <div>
          <form onSubmit={submitHandler}>
            <label>PhoneNumber : </label>
            <input
              className={classes.loginInput}
              placeholder="Username"
              ref={phoneNumberRef}
            />
            <br />
            <label>Password : </label>
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
