import React from "react";
import s from "./LoginForm.module.css";
// import { useDispatch } from "react-redux";

import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "../../Icon";
import { toast, ToastContainer } from "react-toastify";
import { login } from "../../redux/auth/operations";
import { useDispatch } from "react-redux";
import ButtonGradient from "../Buttons/ButtonGradient";
import Button from "../Buttons/Button";

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    dispatch(login(values))
      .unwrap()
      .then((res) => {
        toast.success(`Welcome, ${res.name}!`);
        navigate("/");
      })
      .catch((error) => {
        console.error("Login error:", error);
        toast.error(error || "Login failed. Please try again.");
      });

    setSubmitting(false);
    resetForm();
  };

  // const onSubmit = (values, { setSubmitting, resetForm }) => {
  //   () => navigate("/");
  //   toast.success(`Welcome!`);
  //   console.log({ values, setSubmitting, resetForm });

  //   setSubmitting(false);
  //   resetForm();
  // };

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
          <div className={s.form_container}>
            <div className={s.input_box}>
              <Icon id="#icon-email" className={s.icon} />
              <Field
                className={s.input}
                type="email"
                name="email"
                placeholder="E-mail"
              />
              <ErrorMessage className={s.errMsg} name="email" component="div" />
            </div>
            <div className={s.input_box}>
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
          </div>
          <div className={s.buttons}>
            <ButtonGradient type="submit" text="Login" newClass={s.btn} />
            <Link className={s.link} to="/register">
              <Button text="Register" newClass={s.btn} />
            </Link>
          </div>
        </Form>
      </Formik>
    </>
  );
}

export default LoginForm;
