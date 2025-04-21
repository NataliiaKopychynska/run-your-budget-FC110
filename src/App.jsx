import { Route, Routes } from "react-router-dom";
import "./App.css";
import Transactions from "./components/Transactions/Transactions";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";

import DeleteModal from "./components/DeleteModal/DeleteModal";

import Balance from "./components/Balance/Balance";
import ModalAddTransaction from "./components/ModalAddTransaction/ModalAddTransaction";


const App = () => {
  return (
    <>

      <DeleteModal />
      <Balance />
      <Transactions />
      <LoginPage />
<ModalAddTransaction/>

      <Routes>
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
      </Routes>
    </>
  );
};

export default App;
