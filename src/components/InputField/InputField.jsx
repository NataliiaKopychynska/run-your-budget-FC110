import React from "react";
import { Field, ErrorMessage } from "formik";
import s from "./InputField.module.css";
import { Icon } from "../../Icon";

export default function InputField({
  name,
  type,
  placeholder,
  touched,
  errors,
}) {
  return (
    <div className={s.input_box}>
      <Icon id="#icon-email" className={s.icon} />
      <Field
        className={`
          ${s.input} 
          ${touched[name] && errors[name] ? s.input_error : ""}
        `}
        type={type}
        name={name}
        placeholder={placeholder}
      />
      <ErrorMessage name={name} component="div" className={s.errMsg} />
    </div>
  );
}
