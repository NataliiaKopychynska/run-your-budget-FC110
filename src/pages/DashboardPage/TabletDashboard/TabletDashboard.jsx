import { Outlet } from "react-router-dom";
import HeaderComponent from "../../../components/Header/HeaderComponent";
import Navigation from "../../../components/Navigation/Navigation";
import Balance from "../../../components/Balance/Balance";
import Currency from "../../../components/Currency/Currency";

export default function TabletDashboard() {
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
