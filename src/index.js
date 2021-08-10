import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import UserLoginContextProvider from "./components/context/UserLoginContext";
ReactDOM.render(
  <React.StrictMode>
    <UserLoginContextProvider>
      <App />
    </UserLoginContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
