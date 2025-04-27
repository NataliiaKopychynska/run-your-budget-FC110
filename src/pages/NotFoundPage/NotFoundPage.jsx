import { Link } from "react-router-dom";
import ButtonGradient from "../../components/Buttons/ButtonGradient";
import { Icon } from "../../Icon";
import s from "./NotFoundPage.module.css";
const NotFoundPage = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.window}>
        <Icon id="#icon-Money-Guard" className={s.logo} />
        <h2 className={s.title}>404</h2>
        <p className={s.text}>Something went wrong, please try again later</p>
        <Link to="/">
          <ButtonGradient text="Home" newClass={s.btn} />
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
