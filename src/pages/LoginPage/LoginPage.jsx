import React from "react";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import styles from "./LoginPage.module.css";
import { loginUser } from "../../redux/slice/authSlice";

function LoginPage() {
  const dispatch = useDispatch();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(6, "Min 6 characters").required("Required"),
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    dispatch(loginUser(values));
    setSubmitting(false);
    resetForm();
  };

  return (
    <div className={styles.loginContainer}>
      {/* Logo */}
      <div className={styles.logoContainer}>
        <svg width="27" height="26">
          <use href="/img/icons.svg#icon-money-guard-logo-2" />
        </svg>
        <h1 className={styles.logoText}>Money Guard</h1>
      </div>

      {/* Formik Form */}
      <div className={styles.formContainer}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className={styles.inputGroup}>
                <label htmlFor="email">Email</label>
                <Field
                  type="email"
                  name="email"
                  className={styles.input}
                  placeholder="Enter your email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className={styles.error}
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="password">Password</label>
                <Field
                  type="password"
                  name="password"
                  className={styles.input}
                  placeholder="Enter your password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className={styles.error}
                />
              </div>

              <div className={styles.buttons}>
                <button
                  type="submit"
                  className={styles.button}
                  disabled={isSubmitting}
                >
                  LOG IN
                </button>
                <button
                  type="button"
                  className={styles.button}
                  style={{ backgroundColor: "#666" }}
                >
                  REGISTER
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default LoginPage;
