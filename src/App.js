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
  const { setIsAuthenticated } = useContext(UserLoginContext);
  const { setLoginType } = useContext(UserLoginContext);
  // console.log("check", isAuthenticated);
  useEffect(() => {
    setIsAuthenticated(
      Cookies.get("isAuthenticated") ? Cookies.get("isAuthenticated") : false
    );
    setLoginType(Cookies.get("loginType") ? Cookies.get("loginType") : "");
  }, []);
  return (
    <div>
      {isAuthenticated ? (
        <Layout />
      ) : (
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={UserLogin} />
            <Redirect to="/" />
          </Switch>
        </BrowserRouter>
      )}
      {/* <Footer /> */}
      <ToastContainer />
    </div>
  );
};

export default App;
