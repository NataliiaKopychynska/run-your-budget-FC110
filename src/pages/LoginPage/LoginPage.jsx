import React from "react";

import styles from "./LoginPage.module.css";
import LoginForm from "../../components/loginForm/LoginForm";

function LoginPage() {
  return (
    <div className={styles.loginContainer}>
      {/* Logo */}
      <div className={styles.logoContainer}>
        <svg width="27" height="26">
          <use href="/img/icons.svg#icon-money-guard-logo-2" />
        </svg>
        <h1 className={styles.logoText}>Money Guard</h1>
      </div>
      <LoginForm />
    </div>
  );
}

export default LoginPage;
