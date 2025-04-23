import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Transactions from "./components/Transactions/Transactions";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import HomePage from "./pages/HomePage/HomePage";
import BackgroundGradientTablet from "./components/BackgroundGradient/BackgroundGradient";
import Currency from "./components/Currency/Currency";
import CurrencyPage from "./pages/CurrencyPage/CurrencyPage";
import StatisticsTab from "./pages/StatisticsPage/StatisticsTab";

import DeleteModal from "./components/DeleteModal/DeleteModal";

import Balance from "./components/Balance/Balance";
import ModalAddTransaction from "./components/ModalAddTransaction/ModalAddTransaction";
import Loader from "./components/Loader/Loader";
import Navigation from "./components/Navigation/Navigation";
import HeaderComponent from "./components/Header/HeaderComponent";

const App = () => {
  return (
    <>
      <HeaderComponent />
      <Navigation />
      <Loader />
      <BackgroundGradientTablet />
      <DeleteModal />
      <Balance />
      <Currency />
      <Transactions />
      <LoginPage />

      <ModalAddTransaction />

      <Routes>
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/currency" element={<CurrencyPage />} />
        <Route path="statistics" element={<StatisticsTab />} />
      </Routes>
    </>
  );
};

export default App;
