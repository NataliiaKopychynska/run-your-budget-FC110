import { Outlet } from "react-router-dom";
import Balance from "../../../components/Balance/Balance";
import Currency from "../../../components/Currency/Currency";
import HeaderComponent from "../../../components/Header/HeaderComponent";
import Navigation from "../../../components/Navigation/Navigation";

export default function DesktopDashboard() {
  return (
    <div>
      <HeaderComponent />
      <Balance />
      <Currency />
      <Navigation />
      <Outlet />
    </div>
  );
}
