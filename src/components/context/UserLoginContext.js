import React, { createContext, useState } from "react";

export const UserLoginContext = createContext({});

export default function UserLoginContextProvider(props) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginType, setLoginType] = useState("");
  const loginTypeHandler = (data) => {
    setLoginType(data);
  };
  const loginHandler = () => {
    setIsAuthenticated(true);
  };
  // console.log("loginType", loginType);
  return (
    <UserLoginContext.Provider
      value={{
        isAuthenticated,
        loginHandler,
        loginTypeHandler,
        loginType,
      }}
    >
      {props.children}
    </UserLoginContext.Provider>
  );
}
