import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";

import {
  selectFilterData,
  selectTransactions,
} from "../../../redux/transactions/selectors";
import { selectIsLoading } from "../../../redux/global/selectors";
import TransactionsItem from "../TransactionsItem/TransactionsItem";

import s from "../Transactions.module.css";
import TransactionFilterForm from "../TransactionFilterForm/TransactionFilterForm";
import TransactionPaginationSection from "../TransactionPaginationSection/TransactionPaginationSection";
import { fetchTransactions } from "../../../redux/transactions/operations";
import { setFilterData } from "../../../redux/transactions/slice";

const TransactionsList = () => {
  const dispatch = useDispatch();
  const transactionsList = useSelector(selectTransactions);
  const isLoading = useSelector(selectIsLoading);
  const filterData = useSelector(selectFilterData);

  useEffect(() => {
    dispatch(fetchTransactions(filterData));
  }, [dispatch, filterData]);

  const filteredTransactions = transactionsList.filter(
    (transaction) => transaction && transaction._id
  );

  const handleSortClick = (e) => {
    const clickedSortBy = e.target.name;

    if (clickedSortBy === filterData.sortBy) {
      dispatch(
        setFilterData({
          sortOrder: filterData.sortOrder === "asc" ? "desc" : "asc",
        })
      );
    } else {
      dispatch(
        setFilterData({
          sortBy: clickedSortBy,
          sortOrder: "asc",
        })
      );
    }
  };

  return (
    <>
      <div>
        <TransactionFilterForm />
      </div>

      <div className={s.transactionListHeader}>
        <input
          className={clsx(
            s.transactionsListHeaderItem,
            filterData.sortBy === "date" && s.sorting
          )}
          type="button"
          name="date"
          value="Date ⇅"
          onClick={handleSortClick}
        />
        <input
          className={clsx(
            s.transactionsListHeaderItem,
            filterData.sortBy === "type" && s.sorting
          )}
          type="button"
          name="type"
          value="Type ⇅"
          onClick={handleSortClick}
        />
        <input
          className={clsx(
            s.transactionsListHeaderItem,
            filterData.sortBy === "category" && s.sorting
          )}
          type="button"
          name="category"
          value="Category ⇅"
          onClick={handleSortClick}
        />
        <input
          className={clsx(
            s.transactionsListHeaderItem,
            filterData.sortBy === "comment" && s.sorting
          )}
          type="button"
          name="comment"
          value="Comment ⇅"
          onClick={handleSortClick}
        />
        <input
          className={clsx(
            s.transactionsListHeaderItem,
            filterData.sortBy === "sum" && s.sorting
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
              <p className={s.withoutTransactionMain}>No transactions found.</p>
              <p className={s.withoutTransactionSecondary}>
                You can add a new transaction by clicking the "+" button.
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

      <TransactionPaginationSection />
    </>
  );
};

export default TransactionsList;
