import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
      </Routes>
    </>
  );
};

export default App;
