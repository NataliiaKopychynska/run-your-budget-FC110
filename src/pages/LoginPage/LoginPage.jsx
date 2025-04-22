import React from "react";

import styles from "./LoginPage.module.css";
import LoginForm from "../../components/loginForm/LoginForm";

function LoginPage() {
  return (
    <div className={styles.loginContainer}>
      <div>
        <div className={styles.first_bg_png}>
          <div className={`${styles.circle} ${styles.accentPurple}`}></div>
        </div>
        <div className={styles.next_bg_png}>
          <div className={`${styles.circle} ${styles.accentPurple2}`}></div>
          <div className={`${styles.circle} ${styles.blue2}`}></div>
        </div>
      </div>
      {/* Logo */}
      {/* <div className={styles.logoContainer}>
        <svg width="27" height="26">
          <use href="/img/icons.svg#icon-money-guard-logo-2" />
        </svg>
        <h1 className={styles.logoText}>Money Guard</h1>
      </div> */}
      <LoginForm />
    </div>
  );
}

export default LoginPage;
