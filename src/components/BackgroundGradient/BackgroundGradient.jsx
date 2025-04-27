// import React, { useState } from "react";
import styles from "./BackgroundGradient.module.css";

function BackgroundGradient() {
  return (
    <div className={styles.backgroundContainer}>
      <div className={`${styles.circle} ${styles.primaryBlue}`}></div>
      <div className={`${styles.circle} ${styles.accentPurple}`}></div>
      <div className={`${styles.circle} ${styles.fadedPurple}`}></div>
      <div className={`${styles.circle} ${styles.softPink}`}></div>
      <div className={`${styles.circle} ${styles.deepBlue}`}></div>
      <div className={`${styles.circle} ${styles.tinyPurple}`}></div>
    </div>
  );
}

// function BackgroundGradient() {
//   return <div className={styles.background}></div>;
// }

export default BackgroundGradient;
