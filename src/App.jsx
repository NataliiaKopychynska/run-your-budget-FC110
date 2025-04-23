import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import HomePage from "./pages/HomePage/HomePage";
import BackgroundGradientTablet from "./components/BackgroundGradient/BackgroundGradient";
// import Currency from "./components/Currency/Currency";
import CurrencyPage from "./pages/CurrencyPage/CurrencyPage";

import DeleteModal from "./components/DeleteModal/DeleteModal";

<<<<<<< HEAD
import Balance from "./components/Balance/Balance";
=======
// import ModalAddTransaction from "./components/ModalAddTransaction/ModalAddTransaction";
>>>>>>> origin/main
import Loader from "./components/Loader/Loader";

import { useMediaQuery } from "react-responsive";
// import Navigation from "./components/Navigation/Navigation";
// import HeaderComponent from "./components/Header/HeaderComponent";
import DashboardPage from "./pages/DashboardPage/DashboardPage";

const App = () => {
  const isDesktopOrTablet = useMediaQuery({ query: "(min-width: 768px)" });
  return (
    <>
      <BackgroundGradientTablet />
      <Loader />
      <DeleteModal />
      {/* <HeaderComponent />
      <Navigation />
      
    
      <Balance />
      {isDesktopOrTablet && <Currency />}
      <Transactions />
      <LoginPage />

<<<<<<< HEAD
       */}
=======
      <ModalAddTransaction /> */}
>>>>>>> origin/main
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
