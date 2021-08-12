import "./assets/scss/app.scss";
import "./assets/scss/index.scss";
import "./assets/scss/toast.scss";
import Layout from "./components/view/Layout/Layout";
//react-toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Footer from "./components/view/Footer/Footer";
import "./app.css";
import UserLogin from "./components/view/UserLogin/UserLogin";
import { UserLoginContext } from "./components/context/UserLoginContext";
import { useContext, useEffect } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Cookies from "js-cookie";
const App = () => {
  const { isAuthenticated } = useContext(UserLoginContext);

  return (
    <div>
      {isAuthenticated ? (
        <Layout />
      ) : (
        <BrowserRouter>
          <Switch>
            <Route exact path="/login" component={UserLogin} />
            <Redirect to="/login" />
          </Switch>
        </BrowserRouter>
      )}
      {/* <Footer /> */}
      <ToastContainer />
    </div>
  );
};

export default App;
