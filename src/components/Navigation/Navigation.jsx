import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { Icon } from "../../Icon";
import s from "./Navigation.module.css";

const Navigation = () => {
  return (
    <nav className={s.nav}>
      <NavLink
        className={({ isActive }) => clsx(s.link, { [s.active]: isActive })}
        to="/home"
      >
        <div className={s.iconContainer}>
          <Icon id="#icon-baseline-home-24px-3" className={s.icon} />
        </div>
        <p className={s.navText}>Home</p>
      </NavLink>
      <NavLink
        className={({ isActive }) => clsx(s.link, { [s.active]: isActive })}
        to="/statistics"
      >
        <div className={s.iconContainer}>
          <Icon id="#icon-baseline-timeline-24px-1" className={s.icon} />
        </div>
        <p className={s.navText}>Statistics</p>
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          clsx(s.link, s.mobileOnly, { [s.active]: isActive })
        }
        to="/currency"
      >
        <div className={s.iconContainer}>
          <Icon id="#icon-baseline-timeline-24px-4" className={s.icon} />
        </div>
      </NavLink>
    </nav>
  );
};

export default Navigation;
