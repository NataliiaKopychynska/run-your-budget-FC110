import React from "react";
import styles from "./Button.module.css";
import clsx from "clsx";

function Button({ type = "button", text, onClick, className }) {
  return (
    <button
      type={type}
      className={clsx(styles.button, className)}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
