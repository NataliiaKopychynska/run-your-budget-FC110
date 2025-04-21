import React from "react";
import styles from "./Button.module.css";
import clsx from "clsx";

function ButtonGradient({ type = "button", text, onClick, className }) {
  return (
    <button
      type={type}
      className={clsx(styles.button_gradient, className)}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default ButtonGradient;
