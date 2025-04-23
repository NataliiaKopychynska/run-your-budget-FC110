import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import HomePage from "./pages/HomePage/HomePage";
import BackgroundGradientTablet from "./components/BackgroundGradient/BackgroundGradient";
import Currency from "./components/Currency/Currency";
import CurrencyPage from "./pages/CurrencyPage/CurrencyPage";

import DeleteModal from "./components/DeleteModal/DeleteModal";

import ModalAddTransaction from "./components/ModalAddTransaction/ModalAddTransaction";
import Loader from "./components/Loader/Loader";
import Navigation from "./components/Navigation/Navigation";
import HeaderComponent from "./components/Header/HeaderComponent";
import DashboardPage from "./pages/DashboardPage/DashboardPage";

const App = () => {
  return (
    <>
      <BackgroundGradientTablet />
      <Loader />
      {/* <HeaderComponent />
      <Navigation />
      
      <DeleteModal />
      <Balance />
      <Currency />
      <Transactions />
      <LoginPage />

      <ModalAddTransaction /> */}
      <Routes>
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />}>
          <Route path="home" element={<HomePage />} />
          <Route path="currency" element={<CurrencyPage />} />
        </Route>
        <Route path="/currency" element={<CurrencyPage />} />
      </Routes>
    </>
  );
};

export default App;
