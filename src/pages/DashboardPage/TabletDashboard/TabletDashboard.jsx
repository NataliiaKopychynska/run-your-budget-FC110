import { Outlet } from "react-router-dom";
import HeaderComponent from "../../../components/Header/HeaderComponent";
import Navigation from "../../../components/Navigation/Navigation";
import Balance from "../../../components/Balance/Balance";
import Currency from "../../../components/Currency/Currency";
import s from "./TabletDashboard.module.css";

export default function TabletDashboard() {
  return (
    <div className={s.container}>
      <HeaderComponent />
      <div className={s.balanceAndCurrency}>
        <div className={s.navAndBalance}>
          <Navigation />
          <Balance />
        </div>
        <Currency />
      </div>
      <Outlet />
    </div>
  );
}
