import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Transactions from "./components/Transactions/Transactions";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import HomePage from "./pages/HomePage/HomePage";
import BackgroundGradientTablet from "./components/BackgroundGradient/BackgroundGradient";

import DeleteModal from "./components/DeleteModal/DeleteModal";

import Balance from "./components/Balance/Balance";
import ModalAddTransaction from "./components/ModalAddTransaction/ModalAddTransaction";
import Loader from "./components/Loader/Loader";
import Navigation from "./components/Navigation/Navigation";
import HeaderComponent from "./components/Header/HeaderComponent.jsx";

const App = () => {
  return (
    <>
      <Navigation />
      <HeaderComponent />
      <Loader />
      <BackgroundGradientTablet />
      <DeleteModal />
      <Balance />
      <Transactions />
      <LoginPage />
      <LoginPage />
      <ModalAddTransaction />

      <Routes>
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </>
  );
};

export default App;
