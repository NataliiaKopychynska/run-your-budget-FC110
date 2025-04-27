import React from "react";
import s from "./LoginForm.module.css";
// import { useDispatch } from "react-redux";
import * as Yup from "yup";

import { ErrorMessage, Field, Form, Formik, useFormikContext } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "../../Icon";
import { toast, ToastContainer } from "react-toastify";
import { login } from "../../redux/auth/operations";
import { useDispatch } from "react-redux";
import ButtonGradient from "../Buttons/ButtonGradient";
import Button from "../Buttons/Button";
import InputField from "../InputField/InputField";

function LoginForm1() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .max(12, "Password must be at most 12 characters")
      .required("Password is required"),
  });

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    dispatch(login(values))
      .unwrap()
      .then((res) => {
        toast.success(`Welcome, ${res.name}!`);
        navigate("/home");
      })
      .catch((error) => {
        console.error("Login error:", error);
        toast.error(error || "Login failed. Please try again.");
      });

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
        validationSchema={validationSchema}
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
              {/* <ErrorMessage name="email">
                {(msg) => <div className={s.errMsg}>{msg}</div>}{" "}
              </ErrorMessage> */}
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

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .max(12, "Password must be at most 12 characters")
      .required("Password is required"),
  });

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    dispatch(login(values))
      .unwrap()
      .then((res) => {
        toast.success(`Welcome, ${res.name}!`);
        navigate("/home");
      })
      .catch((error) => {
        console.error("Login error:", error);
        toast.error(error || "Login failed. Please try again.");
      });

    setSubmitting(false);
    resetForm();
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ touched, errors }) => (
        <Form className={s.form}>
          <Icon id="#icon-Money-Guard" className={s.logo} />
          <p className={s.title}>Money Guard</p>
          <div className={s.form_container}>
            <InputField
              name="email"
              type="email"
              placeholder="E-mail"
              touched={touched}
              errors={errors}
            />
            <InputField
              name="password"
              type="password"
              placeholder="Password"
              touched={touched}
              errors={errors}
            />
          </div>
          <div className={s.buttons}>
            <ButtonGradient type="submit" text="Login" newClass={s.btn} />
            <Link className={s.link} to="/register">
              <Button text="Register" newClass={s.btn} />
            </Link>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default LoginForm;
