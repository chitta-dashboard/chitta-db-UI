import React, { createContext, useState } from "react";
import Cookies from "js-cookie";

export const UserLoginContext = createContext({});

export default function UserLoginContextProvider(props) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginType, setLoginType] = useState("");
  const loginTypeHandler = (data) => {
    setLoginType(data);
    Cookies.set("loginType", data, { expires: 7 });
  };
  const loginHandler = () => {
    setIsAuthenticated(true);
    Cookies.set("isAuthenticated", true, { expires: 7 });
  };
  const logoutHandler = () => {
    setIsAuthenticated(false);
    setLoginType("");
    Cookies.remove("isAuthenticated");
    Cookies.remove("loginType");
  };
  // Cookies.get();
  // console.log("loginType", loginType);
  return (
    <UserLoginContext.Provider
      value={{
        isAuthenticated,
        loginHandler,
        loginTypeHandler,
        loginType,
        logoutHandler,
        setIsAuthenticated,
        setLoginType,
      }}
    >
      {props.children}
    </UserLoginContext.Provider>
  );
}
