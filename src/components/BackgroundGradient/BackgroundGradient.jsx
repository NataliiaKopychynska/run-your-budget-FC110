// import React, { useState } from "react";
import styles from "./BackgroundGradient.module.css";

function BackgroundGradient() {
  // const [weight, setWeight] = useState("320");

  return (
    <>
      <div className={styles.mobileBgContainer}>
        <div
          className={`${styles.mobileCircle} ${styles.mobilePrimaryBlue}`}
        ></div>
        <div
          className={`${styles.mobileCircle} ${styles.mobileAccentPurple}`}
        ></div>
        <div
          className={`${styles.mobileCircle} ${styles.mobileFadedPurple}`}
        ></div>
        <div
          className={`${styles.mobileCircle} ${styles.mobileSoftPink}`}
        ></div>
        <div
          className={`${styles.mobileCircle} ${styles.mobileDeepBlue}`}
        ></div>
        <div
          className={`${styles.mobileCircle} ${styles.mobileTinyPurple}`}
        ></div>
      </div>

      <div className={styles.gradientBackgroundTablet}>
        <div className={`${styles.blurCircle} ${styles.purpleCircle1}`}></div>
        <div
          className={`${styles.blurCircle} ${styles.darkPurpleCircle}`}
        ></div>
        <div className={`${styles.blurCircle} ${styles.purpleCircle2}`}></div>
        <div className={`${styles.blurCircle} ${styles.purpleCircle3}`}></div>
        <div className={`${styles.blurCircle} ${styles.blueCircle}`}></div>
        <div className={`${styles.blurCircle} ${styles.purpleCircle4}`}></div>
        <div className={`${styles.blurCircle} ${styles.bigPurple}`}></div>
      </div>

      <div className={styles.backgroundContainerDesktop}>
        <div className={`${styles.circleD} ${styles.largePurpleD}`}></div>
        <div className={`${styles.circleD} ${styles.largeTransparentD}`}></div>
        <div className={`${styles.circleD} ${styles.mediumPinkD}`}></div>
        <div className={`${styles.circleD} ${styles.mediumBlueD}`}></div>
        <div className={`${styles.circleD} ${styles.smallPurpleD}`}></div>
        <div className={`${styles.circleD} ${styles.bigPurpleD}`}></div>
      </div>
    </>
  );
}

export default BackgroundGradient;
