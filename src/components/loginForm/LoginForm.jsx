import React from "react";
import s from "./LoginForm.module.css";
// import { useDispatch } from "react-redux";

import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "../../Icon";
import { toast, ToastContainer } from "react-toastify";
import { login } from "../../redux/auth/operations";
import { useDispatch } from "react-redux";

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    console.log(values);
    dispatch(login(values))
      .unwrap()
      .then((res) => {
        toast.success(`Welcome, ${res.name}!`);
        navigate("/");
      })
      .catch(() => {
        toast.error("Invalid credentials");
      });
    setSubmitting(false);
    resetForm();
  };

  //   const onSubmit = (values, { setSubmitting, resetForm }) => {
  //     () => navigate("/");
  //     setSubmitting(false);
  //     resetForm();
  //   };

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
          <Icon id="#icon-Money-Guard" className={s.logo} />
          <p className={s.title}>Money Guard</p>
          <div className={s.label}>
            <Icon id="#icon-email" className={s.icon} />
            <Field
              className={s.input}
              type="email"
              name="email"
              placeholder="E-mail"
            />
            <ErrorMessage className={s.errMsg} name="email" component="div" />
          </div>
          <div className={s.label}>
            <Icon id="#icon-lock" className={s.icon} />
            <Field
              className={s.input}
              type="password"
              name="password"
              placeholder="Password"
            />
            <ErrorMessage
              className={s.errMsg}
              name="password"
              component="div"
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
