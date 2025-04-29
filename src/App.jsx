import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { useEffect, useState, lazy, Suspense } from "react";
import { useDispatch } from "react-redux";

const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage/RegisterPage"));
const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const CurrencyPage = lazy(() => import("./pages/CurrencyPage/CurrencyPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage/DashboardPage"));
const StatisticsTab = lazy(() =>
  import("./pages/StatisticsPage/StatisticsTab")
);

import BackgroundGradientTablet from "./components/BackgroundGradient/BackgroundGradient";
import DeleteModal from "./components/DeleteModal/DeleteModal";
import Loader from "./components/Loader/Loader";

import { RestrictedRoute } from "./components/Routes/RestrictedRoute";
import { PrivateRoute } from "./components/Routes/PrivateRoute";
import { fetchTransactions } from "./redux/transactions/operations";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

const App = () => {
  const dispatch = useDispatch();
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const init = async () => {
      await dispatch(fetchTransactions());
      setIsInitializing(false);
    };
    init();
  }, [dispatch]);

  if (isInitializing) {
    return <Loader />;
  }
  return (
    <>
      <BackgroundGradientTablet />
      <Loader />
      <DeleteModal />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route
          path="register"
          element={
            <RestrictedRoute component={<RegisterPage />} redirectTo="/home" />
          }
        />
        <Route
          path="login"
          element={
            <RestrictedRoute component={<LoginPage />} redirectTo="/home" />
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute component={<DashboardPage />} redirectTo="/login" />
          }
        >
          <Route path="home" element={<HomePage />} />
          <Route path="statistics" element={<StatisticsTab />} />
          <Route path="currency" element={<CurrencyPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage codError="404" />} />
      </Routes>
    </>
  );
};

export default App;
