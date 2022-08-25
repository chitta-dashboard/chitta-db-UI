import React, { createContext, useState } from "react";
import Cookies from "js-cookie";

export const UserLoginContext = createContext({});

export default function UserLoginContextProvider(props) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return Cookies.get("isAuthenticated")
      ? Cookies.get("isAuthenticated")
      : false;
  });
  const [loginType, setLoginType] = useState(() => {
    return Cookies.get("loginType") ? Cookies.get("loginType") : "";
  });
  const [adminType, setAdminType] = useState();

  const loginTypeHandler = (data) => {
    setLoginType(data);
    Cookies.set("loginType", data, { expires: 7 });
  };
  const loginHandler = (data) => {
    setIsAuthenticated(true);
    setAdminType(data[0].adminType);
    Cookies.set("isAuthenticated", true, { expires: 7 });
    Cookies.set("userId", data[0].id, { expires: 7 });
    Cookies.set("adminType", data[0].adminType, { expires: 7 });
  };
  const logoutHandler = () => {
    setIsAuthenticated(false);
    setLoginType("");
    Cookies.remove("isAuthenticated");
    Cookies.remove("loginType");
    Cookies.remove("userId");
    Cookies.remove("adminType");
  };
  // Cookies.get();
  return (
    <UserLoginContext.Provider
      value={{
        isAuthenticated,
        loginHandler,
        loginTypeHandler,
        loginType,
        adminType,
        logoutHandler,
        setIsAuthenticated,
        setLoginType,
      }}
    >
      {props.children}
    </UserLoginContext.Provider>
  );
}
