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
const App = () => {
  return (
    <div>
      {/* <UserLogin /> */}
      <Layout />
      {/* <Footer /> */}
      <ToastContainer />
    </div>
  );
};

export default App;
