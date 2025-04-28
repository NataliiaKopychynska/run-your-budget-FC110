import { Link } from "react-router-dom";
import ButtonGradient from "../../components/Buttons/ButtonGradient";
import { Icon } from "../../Icon";
import s from "./NotFoundPage.module.css";

const errorMessages = {
  404: "Page not found.",
  500: "Internal server error.",
  503: "Service unavailable.",
};

const NotFoundPage = ({ codError = "404" }) => {
  const errorMessage =
    errorMessages[codError] || "Something went wrong, please try again later.";

  return (
    <div className={s.wrapper}>
      <div className={s.window}>
        <Icon id="#icon-Money-Guard" className={s.logo} />
        <h2 className={s.title}>{codError}</h2>
        <p className={s.text}>{errorMessage}</p>
        <Link to="/">
          <ButtonGradient text="Home" newClass={s.btn} />
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
