import React from "react";
import { Icon } from "../../Icon";
import s from "./ErrorPage.module.css";

function ErrorPage({
  codError = "404",
  errorMessage = "Something went wrong, please try again later.",
}) {
  return (
    <div className={`container ${s.container}`}>
      <Icon id="#icon-Money-Guard" className={s.logo} />
      <h1 className={s.title}>{codError}</h1>
      <h2 className={s.errorMessage}>{errorMessage}</h2>
    </div>
  );
}

export default ErrorPage;
