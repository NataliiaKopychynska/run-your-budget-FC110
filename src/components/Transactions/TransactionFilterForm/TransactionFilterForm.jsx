import { useState } from "react";
import toast from "react-hot-toast";
import style from ".././../Buttons/Button.module.css";
import { motion, AnimatePresence } from "framer-motion";
import s from "../Transactions.module.css";
import { Field, Form, Formik } from "formik";
import ButtonGradient from "../../Buttons/ButtonGradient";
import * as Yup from "yup";
import Button from "../../Buttons/Button";
import ReactDatePicker from "react-datepicker";
import clsx from "clsx";
import "react-datepicker/dist/react-datepicker.css";
import "../datePickerStyles.css";

const toastParams = {
  position: "bottom-right",
  duration: 2000,
  style: {
    textAlign: "left",
    background:
      "linear-gradient(103deg,rgb(1, 1, 0) 0%,    #9e40ba 61.46%,    #7000ff 90.54%  )",
    color: "white",
  },
};

const TransactionFilterForm = ({ setFilters }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const toggleFilters = () => {
    setShowFilters((prev) => !prev);
  };

  const validationSchema = Yup.object({
    minSum: Yup.number().min(0, "Must be positive").nullable().positive(),
    maxSum: Yup.number().min(0, "Must be positive").nullable().positive(),
  });

  const initialValues = {
    type: "",
    category: "",
    minSum: "",
    maxSum: "",
  };

  const handleApplyFilter = (values) => {
    if (values?.minSum > values?.maxSum) {
      return toast.error(
        "The minimum amount must be less than the maximum amount.",
        toastParams
      );
    } else {
      setFilters({
        ...values,
        startDate: startDate ? startDate.toISOString() : null,
        endDate: endDate ? endDate.toISOString() : null,
      });
    }
  };

  return (
    <div>
      <div className={s.filterSection}>
        <button
          type="button"
          className={s.filterToggleButton}
          onClick={toggleFilters}
        >
          {showFilters ? "Hide Filters ▲" : "Show Filters ▼"}
        </button>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 15,
              }}
            >
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleApplyFilter}
              >
                {({ resetForm }) => (
                  <Form className={s.filterForm}>
                    <div className={s.filterFormModule}>
                      <Field as="select" name="type" className={s.select}>
                        <option value="">Select type</option>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                      </Field>

                      <Field as="select" name="category" className={s.select}>
                        <option value="">Select category</option>
                        <option value="main expenses">Main expenses</option>
                        <option value="products">Products</option>
                        <option value="car">Car</option>
                        <option value="self care">Self care</option>
                        <option value="child care">Child care</option>
                        <option value="household products">
                          Household products
                        </option>
                        <option value="education">Education</option>
                        <option value="leisure">Leisure</option>
                        <option value="entertainment">Entertainment</option>
                        <option value="other expenses">Other expenses</option>
                      </Field>
                    </div>

                    <div className={s.filterFormModule}>
                      <Field
                        id="minSum"
                        name="minSum"
                        type="number"
                        placeholder="Minimum"
                        className={s.input}
                      />

                      <Field
                        id="maxSum"
                        name="maxSum"
                        type="number"
                        placeholder="Maximum"
                        className={s.input}
                      />
                    </div>

                    <div className={s.filterFormModule}>
                      <div className={s.datePickerWrapper}>
                        <ReactDatePicker
                          dateFormat="dd.MM.yyyy"
                          className={clsx(s.select, s.datePicker)}
                          calendarClassName={s.calendarDatePicker}
                          placeholderText="Select date range"
                          selectsRange={true}
                          startDate={startDate}
                          endDate={endDate}
                          onChange={(update) => {
                            setDateRange(update);
                          }}
                          withPortal
                        />
                      </div>
                      <div className={s.filterBtns}>
                        <ButtonGradient
                          type="submit"
                          text="Apply"
                          newClass={style.filterApplyBtn}
                        />

                        <Button
                          type="button"
                          text="Reset"
                          onClickFn={() => {
                            setFilters(initialValues);
                            setDateRange([null, null]);
                            resetForm();
                          }}
                          newClass={style.filterResetBtn}
                        />
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
export default TransactionFilterForm;
