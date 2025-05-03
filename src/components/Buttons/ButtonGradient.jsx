import React from "react";
import styles from "./Button.module.css";
import clsx from "clsx";

function ButtonGradient({
  type = "button",
  text,
  onClickFn,
  newClass,
  disabled,
}) {
  return (
    <button
      type={type}
      className={clsx(styles.button_gradient, newClass)}
      onClick={onClickFn}
    >
      {text}
    </button>
  );
}

export default ButtonGradient;
