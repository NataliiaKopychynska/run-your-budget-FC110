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
      <LoginForm />
    </div>
  );
}

export default LoginPage;
