import { useDispatch, useSelector } from "react-redux";
import { selectTransactions } from "../../../redux/transactions/selectors";
import TransactionsItem from "../TransactionsItem/TransactionsItem";
import s from "../Transactions.module.css";
import { useEffect, useState } from "react";
import { fetchTransactions } from "../../../redux/transactions/operations";
import { selectIsLoading } from "../../../redux/global/selectors";
import { Field, Form, Formik } from "formik";
import clsx from "clsx";

const TransactionsList = () => {
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();
  const transactionsList = useSelector(selectTransactions);
  const [sortBy, setSortBy] = useState("_id");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    dispatch(fetchTransactions({ sortBy, sortOrder }));
  }, [dispatch, sortBy, sortOrder]);

  const filteredTransactions = transactionsList.filter(
    (transaction) => transaction && transaction._id
  );

  function handleSortClick(e) {
    setSortBy(e.target.name);
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  }

  return (
    <>
      <div className={s.transactionListHeader}>
        <input
          className={clsx(
            s.transactionsListHeaderItem,
            sortBy === "date" && s.sorting
          )}
          type="button"
          name="date"
          value="Date ⇅"
          onClick={(e) => handleSortClick(e)}
        />
        <input
          className={clsx(
            s.transactionsListHeaderItem,
            sortBy === "type" && s.sorting
          )}
          type="button"
          name="type"
          value="Type ⇅"
          onClick={(e) => handleSortClick(e)}
        />
        <input
          className={clsx(
            s.transactionsListHeaderItem,
            sortBy === "category" && s.sorting
          )}
          type="button"
          name="category"
          value="Category ⇅"
          onClick={(e) => handleSortClick(e)}
        />
        <input
          className={clsx(
            s.transactionsListHeaderItem,
            sortBy === "comment" && s.sorting
          )}
          type="button"
          name="comment"
          value="Comment ⇅"
          onClick={(e) => handleSortClick(e)}
        />
        <input
          className={clsx(
            s.transactionsListHeaderItem,
            sortBy === "sum" && s.sorting
          )}
          type="button"
          name="sum"
          value="Sum ⇅"
          onClick={(e) => handleSortClick(e)}
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
        </>
      )}
    </>
  );
};

export default TransactionsList;
