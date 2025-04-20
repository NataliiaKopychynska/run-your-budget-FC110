import { Route, Routes } from "react-router-dom";
import "./App.css";
import Transactions from "./components/Transactions/Transactions";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import Balance from "./components/Balance/Balance";

const App = () => {
  return (
    <>

      <Balance />

      <Transactions />
      <LoginPage />


      <Routes>
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
      </Routes>

    </>
  );
};

export default App;
