import { useState } from "react";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addTransaction } from "../../redux/transactions/operations";
import { expenseCategories } from "../../constants/transactionCategories";
import s from "./AddTransactionForm.module.css";

const schema = yup.object({
  type: yup
    .string()
    .oneOf(["income", "expense"], "Select valid type")
    .required("Select type"),

  sum: yup
    .number()
    .typeError("Must be a number")
    .positive("Must be greater than zero")
    .required("Enter sum"),

  date: yup.date().typeError("Must be a valid date").required("Enter date"),

  category: yup
    .string()
    .when("type", ([type], schema) =>
      type === "expense" ? schema.required("Select category") : schema
    ),

  comment: yup
    .string()
    .max(100, "Max 100 characters")
    .required("Comment required"),
});

const AddTransactionForm = ({ onCancel }) => {
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleSubmit = async (values, { resetForm }) => {
    const transformed = {
      ...values,
      type: values.type === "income",
      date: selectedDate.toISOString(),
    };

    try {
      await dispatch(addTransaction(transformed)).unwrap();
      resetForm();
      onCancel();
    } catch (error) {
      console.error("Error:", error);
      alert("Error adding transaction. Please check the data and try again.");
    }
  };

  return (
    <Formik
      initialValues={{
        type: "expense",
        sum: "",
        category: "",
        comment: "",
        date: selectedDate,
      }}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue }) => (
        <Form className={s.modalForm}>
          <h2 className={s.modalTitle}>Add transaction</h2>

          <div className={s.switcher}>
            <label className={values.type === "income" ? s.active : ""}>
              <Field type="radio" name="type" value="income" />
              Income
            </label>
            <label className={values.type === "expense" ? s.active : ""}>
              <Field type="radio" name="type" value="expense" />
              Expense
            </label>
          </div>

          {values.type === "expense" && (
            <div>
              <Field name="category" as="select" className={s.select}>
                <option value="">Select a category</option>
                {expenseCategories.map(({ value, label }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="category" component="p" className={s.error} />
            </div>
          )}
          <Field name="sum" type="number" className={s.input} />
          <ErrorMessage name="sum" component="p" className={s.error} />
          <DatePicker
            selected={selectedDate}
            onChange={(date) => {
              setSelectedDate(date);
              setFieldValue("date", date);
            }}
            dateFormat="dd.MM.yyyy"
            className={s.input}
          />
          <ErrorMessage name="date" component="p" className={s.error} />
          <Field name="comment" type="text" className={s.input} />
          <ErrorMessage name="comment" component="p" className={s.error} />

          <div className={s.modalActions}>
            <button type="submit" className={s.btnAdd}>
              ADD
            </button>
            <button type="button" onClick={onCancel} className={s.btnCancel}>
              CANCEL
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddTransactionForm;
