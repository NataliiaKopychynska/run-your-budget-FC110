import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { fetchTransactions } from "../../../redux/transactions/operations";
import style from ".././../Buttons/Button.module.css";
import { motion, AnimatePresence } from "framer-motion";
import s from "../Transactions.module.css";
import { Field, Form, Formik } from "formik";
import ButtonGradient from "../../Buttons/ButtonGradient";

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
  const dispatch = useDispatch();
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilters = () => {
    setShowFilters((prev) => !prev);
  };

  const initialValues = {
    type: "",
    category: "",
    minSum: "",
    maxSum: "",
    month: "",
  };

  const handleApplyFilter = (values, resetForm) => {
    if (values?.minSum > values?.maxSum) {
      return toast.error(
        "The minimum amount must be greater than the maximum amount.",
        toastParams
      );
    } else {
      setFilters(values);
      resetForm();
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
                onSubmit={(values, { resetForm }) => {
                  handleApplyFilter(values, resetForm);
                }}
              >
                <Form className={s.filterForm}>
                  <div className={s.filterFormModule}>
                    <Field as="select" name="type" className={s.select}>
                      <option>Select type</option>
                      <option value="income">Income</option>
                      <option value="expense">Expense</option>
                    </Field>

                    <Field as="select" name="category" className={s.select}>
                      <option>Select category</option>
                      <option value="mainExpenses">Main expenses</option>
                      <option value="products">Products</option>
                      <option value="car">Car</option>
                      <option value="selfCare">Self care</option>
                      <option value="childCare">Child care</option>
                      <option value="householdProducts">
                        Household products
                      </option>
                      <option value="education">Education</option>
                      <option value="leisure">Leisure</option>
                      <option value="entertainment">Entertainment</option>
                      <option value="otherExpenses">Other expenses</option>
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
                    <Field
                      type="month"
                      id="month"
                      name="month"
                      placeholder="Select a month"
                      className={s.select}
                    />
                    <div>
                      <ButtonGradient
                        type="submit"
                        text="Apply filter"
                        newClass={style.filterApplyBtn}
                      />
                    </div>
                  </div>
                </Form>
              </Formik>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
export default TransactionFilterForm;
