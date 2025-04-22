import { NavLink } from "react-router-dom";
import clsx from "clsx";
import s from "./Navigation.module.css";

const Navigation = () => {
  return (
    <nav className={s.nav}>

////у тебе проблеми з перекируванням : виправ з to={"/statistics"} на to="/dashboard/home" не має бути дужок 
//       <NavLink className={s.link} to="/dashboard/home"></NavLink>
//       <NavLink className={s.link} to="/dashboard/statistics"></NavLink>
//       <NavLink className={clsx(s.link, s.mobileOnly)} to="/dashboard/currency"></NavLink>
     

      <NavLink className={s.link} to={"/home"}>
        <svg className={s.icon} width={38} height={38}>
          <use href="/public/img/icons.svg#icon-baseline-home-24px-3" />
        </svg>
        <p className={s.navText}>Home</p>
      </NavLink>
      <NavLink className={s.link} to={"/statistics"}>
        <svg className={s.icon} width={38} height={38}>
          <use href="/public/img/icons.svg#icon-baseline-timeline-24px-1" />
        </svg>
        <p className={s.navText}>Statistics</p>
      </NavLink>
      <NavLink className={clsx(s.link, s.mobileOnly)} to={"/currency"}>
        <svg className={s.icon} width={38} height={38}>
          <use href="/public/img/icons.svg#icon-baseline-timeline-24px-4" />

        </svg>
      </NavLink>
    </nav>
  );
};

export default Navigation;
