import React from "react";
import styles from "./Button.module.css";
import clsx from "clsx";

function Button({ type = "button", text, onClickFn, newClass }) {
  return (
    <button
      type={type}
      className={clsx(styles.button, newClass)}
      onClick={onClickFn}
    >
      {text}
    </button>
  );
}

export default Button;
