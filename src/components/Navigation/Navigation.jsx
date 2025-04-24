import { NavLink } from "react-router-dom";
import clsx from "clsx";
import s from "./Navigation.module.css";

const Navigation = () => {
  return (
    <nav className={s.nav}>
      <NavLink className={s.link} to="/home">
        <svg className={s.icon} width={38} height={38}>
          <use href="/public/img/icons.svg#icon-baseline-home-24px-3" />
        </svg>
        <p className={s.navText}>Home</p>
      </NavLink>
      <NavLink className={s.link} to="/statistics">
        <svg className={s.icon} width={38} height={38}>
          <use href="/public/img/icons.svg#icon-baseline-timeline-24px-1" />
        </svg>
        <p className={s.navText}>Statistics</p>
      </NavLink>
      <NavLink className={clsx(s.link, s.mobileOnly)} to="/currency">
        <svg className={s.icon} width={38} height={38}>
          <use href="/public/img/icons.svg#icon-baseline-timeline-24px-4" />
        </svg>
      </NavLink>
    </nav>
  );
};

export default Navigation;
