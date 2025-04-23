import { forwardRef, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import DatePicker from "react-datepicker";
import Select from "react-select";

import { addTransaction } from "../../redux/transactions/operations";
import { expenseCategories } from "../../constants/transactionCategories";

import Switcher from "./Switcher";
import CalendarIcon from "./CalendarIcon";
import DropdownIndicator from "./DropdownIndicator";

import customStyles from "../../styles/reactSelect/customSelectStyles";
import schema from "../../schemas/transactionValidation";

import s from "./AddTransactionForm.module.css";
import "react-datepicker/dist/react-datepicker.css";

const AddTransactionForm = ({ onCancel }) => {
  const dispatch = useDispatch();
  const datepickerRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <input
      className={s.inputDate}
      onClick={onClick}
      ref={ref}
      value={value}
      readOnly
    />
  ));

  const handleSubmit = async (values, { resetForm }) => {
    const transformed = {
      ...values,
      type: values.type === "income",
      date: selectedDate.toISOString(),
      category: values.type === "income" ? null : values.category,
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

          <Switcher type={values.type} setFieldValue={setFieldValue} />

          {values.type === "expense" && (
            <div className={s.selectWrapper}>
              <Select
                name="category"
                options={expenseCategories}
                styles={customStyles}
                placeholder="Select a category"
                value={expenseCategories.find(
                  (option) => option.value === values.category
                )}
                onChange={(option) =>
                  setFieldValue("category", option ? option.value : "")
                }
                isSearchable={false}
                components={{
                  IndicatorSeparator: () => null,
                  DropdownIndicator,
                }}
              />
              <ErrorMessage name="category" component="p" className={s.error} />
            </div>
          )}

          <div className={s.selectContent}>
            <div className={s.selectWrapperSum}>
              <Field
                name="sum"
                type="number"
                className={s.inputSum}
                placeholder="0.00"
              />
              <ErrorMessage name="sum" component="p" className={s.error} />
            </div>
            <div className={s.wrapperPicker}>
              <DatePicker
                ref={datepickerRef}
                selected={selectedDate}
                onChange={(date) => {
                  setSelectedDate(date);
                  setFieldValue("date", date);
                }}
                dateFormat="dd.MM.yyyy"
                className={s.inputDate}
                customInput={<CustomInput />}
              />
              <div
                className={s.calendarIcon}
                onClick={() => datepickerRef.current.setOpen(true)}
              >
                <CalendarIcon />
              </div>
              <ErrorMessage name="date" component="p" className={s.error} />
            </div>
          </div>

          <div className={s.selectWrapper}>
            <Field
              name="comment"
              type="text"
              className={s.inputComment}
              placeholder="Comment"
            />
            <ErrorMessage name="comment" component="p" className={s.error} />
          </div>

          <div className={s.modalActions}>
            <button type="submit" className={s.btnAdd}>
              SAVE
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
