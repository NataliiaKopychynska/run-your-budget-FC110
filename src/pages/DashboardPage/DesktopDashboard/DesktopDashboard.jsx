import { Outlet } from "react-router-dom";
import Balance from "../../../components/Balance/Balance";
import Currency from "../../../components/Currency/Currency";
import HeaderComponent from "../../../components/Header/HeaderComponent";
import Navigation from "../../../components/Navigation/Navigation";
import s from "./DesktopDashboard.module.css";

export default function DesktopDashboard() {
  return (
    <>
      <HeaderComponent />
      <div className={s.container}>
        <div className={s.static}>
          <Navigation />
          <Balance />
          <Currency />
        </div>
        <div className={s.outlet}>
          <Outlet />
        </div>
      </div>
    </>
  );
}
