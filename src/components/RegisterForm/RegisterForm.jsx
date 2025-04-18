import { Field, Form, Formik } from "formik";
import s from "./RegisterForm.module.css";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  const onSubmit = (values) => {
    console.log(values);
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
              type="text"
              name="name"
              placeholder="Name"
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
              Registration
            </button>
            <Link className={s.link} to="/login">
              <button className={s.button_log}>Login</button>
            </Link>
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default RegisterForm;
