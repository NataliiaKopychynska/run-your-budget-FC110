import React from "react";
import styles from "./Button.module.css";
import clsx from "clsx";

function BigButton({ type = "button", text, onClick, className }) {
  return (
    <button
      type={type}
      className={clsx(styles.button_big, className)}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default BigButton;
