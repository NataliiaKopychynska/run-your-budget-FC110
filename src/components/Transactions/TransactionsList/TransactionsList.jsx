import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

import { RxThickArrowRight, RxThickArrowLeft } from "react-icons/rx";

import { fetchTransactions } from "../../../redux/transactions/operations";
import {
  selectPaginationData,
  selectTransactions,
} from "../../../redux/transactions/selectors";
import { selectIsLoading } from "../../../redux/global/selectors";
import TransactionsItem from "../TransactionsItem/TransactionsItem";

import style from ".././../Buttons/Button.module.css";
import s from "../Transactions.module.css";
import ButtonGradient from "../../Buttons/ButtonGradient";
import toast from "react-hot-toast";

const toastParams = {
  position: "bottom-right",
  duration: 2000,
  style: {
    textAlign: "left",
    background:
      "linear-gradient(103deg,     #ffc727 0%,    #9e40ba 61.46%,    #7000ff 90.54%  )",

    color: "white",
  },
};

const TransactionsList = () => {
  const dispatch = useDispatch();
  const transactionsList = useSelector(selectTransactions);
  const isLoading = useSelector(selectIsLoading);
  const paginationData = useSelector(selectPaginationData);

  console.log(paginationData);

  const [sortBy, setSortBy] = useState("_id");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    type: "",
    category: "",
    minSum: "",
    maxSum: "",
    month: "",
  });

  useEffect(() => {
    dispatch(fetchTransactions({ sortBy, sortOrder, ...filters }));
  }, [dispatch, sortBy, sortOrder, filters]);

  const filteredTransactions = transactionsList.filter(
    (transaction) => transaction && transaction._id
  );

  const handleSortClick = (e) => {
    setSortBy(e.target.name);
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

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
      dispatch(fetchTransactions({ sortBy, sortOrder, ...values }));
      resetForm();
    }
  };

  return (
    <>
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

      <div className={s.transactionListHeader}>
        <input
          className={clsx(
            s.transactionsListHeaderItem,
            sortBy === "date" && s.sorting
          )}
          type="button"
          name="date"
          value="Date ⇅"
          onClick={handleSortClick}
        />
        <input
          className={clsx(
            s.transactionsListHeaderItem,
            sortBy === "type" && s.sorting
          )}
          type="button"
          name="type"
          value="Type ⇅"
          onClick={handleSortClick}
        />
        <input
          className={clsx(
            s.transactionsListHeaderItem,
            sortBy === "category" && s.sorting
          )}
          type="button"
          name="category"
          value="Category ⇅"
          onClick={handleSortClick}
        />
        <input
          className={clsx(
            s.transactionsListHeaderItem,
            sortBy === "comment" && s.sorting
          )}
          type="button"
          name="comment"
          value="Comment ⇅"
          onClick={handleSortClick}
        />
        <input
          className={clsx(
            s.transactionsListHeaderItem,
            sortBy === "sum" && s.sorting
          )}
          type="button"
          name="sum"
          value="Sum ⇅"
          onClick={handleSortClick}
        />
        <p className={s.transactionsListHeaderItem}></p>
      </div>

      {!isLoading && (
        <>
          {filteredTransactions.length === 0 ? (
            <div className={s.withoutTransaction}>
              <p className={s.withoutTransactionMain}>
                You don't have any transaction.
              </p>
              <p className={s.withoutTransactionSecondary}>
                Let's start to use this awesome application.
              </p>
            </div>
          ) : (
            <ul className={s.transactionsList}>
              {filteredTransactions.map((transaction) => (
                <li key={transaction._id} className={s.transactionLi}>
                  <TransactionsItem {...transaction} />
                </li>
              ))}
            </ul>
          )}

          {paginationData.totalPages > 1 && (
            <div className={s.pagination}>
              <div className={s.paginationButtons}>
                {paginationData.hasPreviousPage && (
                  <button type="button" className={s.prevBtn}>
                    <RxThickArrowLeft />
                  </button>
                )}

                {paginationData.totalPages > 1 && (
                  <div>
                    Page {paginationData.page} / {paginationData.totalPages}
                  </div>
                )}

                {paginationData.hasNextPage && (
                  <button type="button" className={s.nextBtn}>
                    <RxThickArrowRight />
                  </button>
                )}
              </div>

              <select
                name="perPage"
                className={clsx(s.select, s.selectPerPage)}
              >
                <option>Items per page</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="40">40</option>
                <option value="50">50</option>
              </select>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default TransactionsList;
