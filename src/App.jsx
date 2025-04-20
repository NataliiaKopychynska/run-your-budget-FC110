import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Transactions from "./components/Transactions/Transactions";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import HomePage from "./pages/HomePage/HomePage";
import BackgroundGradientTablet from "./components/BackgroundGradient/BackgroundGradient";

const App = () => {
  return (
    <>
      {/* <Transactions /> */}
      {/* <LoginPage /> */}
      <BackgroundGradientTablet />

      <Routes>
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </>
  );
};

export default App;
