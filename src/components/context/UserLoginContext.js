import React, { createContext, useState } from "react";

export const UserLoginContext = createContext({});

export default function UserLoginContextProvider(props) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const loginHandler = () => {
    setIsAuthenticated(true);
  };
  return (
    <UserLoginContext.Provider
      value={{
        isAuthenticated,
        loginHandler,
      }}
    >
      {props.children}
    </UserLoginContext.Provider>
  );
}
