import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import HomePage from "./pages/HomePage/HomePage";
import BackgroundGradientTablet from "./components/BackgroundGradient/BackgroundGradient";
// import Currency from "./components/Currency/Currency";
import CurrencyPage from "./pages/CurrencyPage/CurrencyPage";
import StatisticsTab from "./pages/StatisticsPage/StatisticsTab";

import DeleteModal from "./components/DeleteModal/DeleteModal";

// import ModalAddTransaction from "./components/ModalAddTransaction/ModalAddTransaction";
import Loader from "./components/Loader/Loader";

import { useMediaQuery } from "react-responsive";
// import Navigation from "./components/Navigation/Navigation";
// import HeaderComponent from "./components/Header/HeaderComponent";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import { RestrictedRoute } from "./components/Routes/RestrictedRoute";
import { PrivateRoute } from "./components/Routes/PrivateRoute";

const App = () => {
  const isDesktopOrTablet = useMediaQuery({ query: "(min-width: 768px)" });
  return (
    <>
      <BackgroundGradientTablet />
      <Loader />
      <DeleteModal />

      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute component={<HomePage />} redirectTo="/login" />
          }
        ></Route>
        <Route
          path="/home"
          element={
            <PrivateRoute component={<HomePage />} redirectTo="/login" />
          }
        ></Route>
        <Route
          path="register"
          element={
            <RestrictedRoute component={<RegisterPage />} redirectTo="/" />
          }
        />
        <Route
          path="login"
          element={<RestrictedRoute component={<LoginPage />} redirectTo="/" />}
        />
        <Route
          path="dashboard"
          element={
            <PrivateRoute component={<DashboardPage />} redirectTo="/login" />
          }
        />
        <Route
          path="currency"
          element={
            <PrivateRoute component={<CurrencyPage />} redirectTo="/login" />
          }
        />
        <Route
          path="statistics"
          element={
            <PrivateRoute component={<StatisticsTab />} redirectTo="/login" />
          }
        />
      </Routes>
    </>
  );
};

export default App;
