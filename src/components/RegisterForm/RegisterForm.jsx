import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import s from "./RegisterForm.module.css";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "../../Icon";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import toast, { Toaster } from "react-hot-toast";
import ProgressBar from "../ProgressBar/ProgressBar";
import ButtonGradient from "../Buttons/ButtonGradient";
import Button from "../Buttons/Button";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = ({ name, email, password }, { resetForm }) => {
    dispatch(register({ name, email, password }))
      .unwrap()
      .then((data) => {
        toast.success(`Welcome, ${data.name}! Please log in`);
        navigate("/login");
      })
      .catch(() => {
        toast.error("Invalid credentials");
      });

    resetForm();
  };

  return (
    <>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .min(2, "Must be at least 2 characters")
            .max(20, "Must be up to 20 characters")
            .required("Required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
          password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .max(12, "Password must be at most 12 characters")
            .required("Required"),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Required"),
        })}
        onSubmit={onSubmit}
      >
        {({ values, errors, touched }) => (
          <Form className={s.form}>
            <Icon id="#icon-Money-Guard" className={s.logo} />
            <p className={s.title}>Money Guard</p>
            <div className={s.fields}>
              <div className={s.label}>
                <Icon id="#icon-user" className={s.icon} />
                <Field
                  className={`${s.input} ${
                    errors.name && touched.name ? s.inputError : ""
                  }`}
                  type="text"
                  name="name"
                  placeholder="Name"
                />
                <div className={s.errMsgWrapper}>
                  <ErrorMessage
                    className={s.errMsg}
                    name="name"
                    component="div"
                  />
                </div>
              </div>

              <div className={s.label}>
                <Icon id="#icon-email" className={s.icon} />
                <Field
                  className={`${s.input} ${
                    errors.email && touched.email ? s.inputError : ""
                  }`}
                  type="email"
                  name="email"
                  placeholder="E-mail"
                />
                <div className={s.errMsgWrapper}>
                  <ErrorMessage
                    className={s.errMsg}
                    name="email"
                    component="div"
                  />
                </div>
              </div>

              <div className={s.label}>
                <Icon id="#icon-lock" className={s.icon} />
                <Field
                  className={`${s.input} ${
                    errors.password && touched.password ? s.inputError : ""
                  }`}
                  type="password"
                  name="password"
                  placeholder="Password"
                />
                <div className={s.errMsgWrapper}>
                  <ErrorMessage
                    className={s.errMsg}
                    name="password"
                    component="div"
                  />
                </div>
              </div>

              <div className={s.label}>
                <Icon id="#icon-lock" className={s.icon} />
                <Field name="confirmPassword">
                  {({ field, form }) => (
                    <input
                      {...field}
                      className={`${s.input} ${
                        errors.confirmPassword && touched.confirmPassword
                          ? s.inputError
                          : ""
                      }`}
                      type="password"
                      placeholder="Confirm password"
                      disabled={!form.values.password}
                    />
                  )}
                </Field>
                <ProgressBar
                  password={values.password}
                  confirmPassword={values.confirmPassword}
                />
                <div className={s.errMsgWrapper}>
                  <ErrorMessage
                    className={s.errMsg}
                    name="confirmPassword"
                    component="div"
                  />
                </div>
              </div>
            </div>

            <div className={s.buttons}>
              <ButtonGradient type="submit" text="Register" newClass={s.btn} />
              <Link className={s.link} to="/login">
                <Button text="Log in" newClass={s.btn} />
              </Link>
            </div>
          </Form>
        )}
      </Formik>
      <Toaster />
    </>
  );
};

export default RegisterForm;
