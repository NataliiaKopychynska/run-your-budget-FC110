import React from "react";
import s from "./LoginForm.module.css";
// import { useDispatch } from "react-redux";

import { Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
// import { loginThunk } from "../../redux/auth/operations";

function LoginForm() {
  //   const dispatch = useDispatch();
  const navigate = useNavigate();

  //   const onSubmit = (values, { setSubmitting, resetForm }) => {
  //     console.log(values);
  //     dispatch(loginThunk(values))
  //       .unwrap()
  //       .then(() => navigate("/"));
  //     setSubmitting(false);
  //     resetForm();
  //   };

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    () => navigate("/");
    setSubmitting(false);
    resetForm();
  };

  return (
    <>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={onSubmit}
      >
        <Form className={s.form}>
          <p className={s.title}>Money Guard</p>
          <div className={s.label}>
            <Field
              className={s.input}
              type="email"
              name="email"
              placeholder="E-mail"
            />
          </div>
          <div className={s.label}>
            <Field
              className={s.input}
              type="password"
              name="password"
              placeholder="Password"
            />
          </div>
          <div className={s.buttons}>
            <button type="submit" className={s.button_reg}>
              Login
            </button>
            <Link className={s.link} to="/register">
              <button className={s.button_log}>Register</button>
            </Link>
          </div>
        </Form>
      </Formik>
    </>
  );
}

export default LoginForm;
