import React, { useContext } from "react";
import { useStyles } from "../../../assets/styles";
import Logo from "../../../assets/images/nerkathir_logo.png";
import { UserLoginContext } from "../../context/UserLoginContext";

export default function UserLogin() {
  const { loginHandler } = useContext(UserLoginContext);
  const classes = useStyles();
  const submitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <div className={classes.loginRoot}>
      <div className={classes.loginContainer}>
        <div>
          <img src={Logo} alt="" className={classes.loginLogo} />
        </div>
        <div>
          <form onSubmit={submitHandler}>
            <label>Username : </label>
            <input className={classes.loginInput} placeholder="Username" />
            <br />
            <label>Password : </label>
            <input className={classes.loginInput} placeholder="Password" />
            <div className={classes.loginActions}>
              <button className={classes.loginButton} onClick={loginHandler}>
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
