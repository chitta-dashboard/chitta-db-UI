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
// import Cookies from "js-cookie";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const App = () => {
  const { isAuthenticated } = useContext(UserLoginContext);

  return (
    <QueryClientProvider client={queryClient}>
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
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default App;
