import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";

import { selectTransactions } from "../../../redux/transactions/selectors";
import { selectIsLoading } from "../../../redux/global/selectors";
import TransactionsItem from "../TransactionsItem/TransactionsItem";

import s from "../Transactions.module.css";
import TransactionFilterForm from "../TransactionFilterForm/TransactionFilterForm";
import TransactionPaginationSection from "../TransactionPaginationSection/TransactionPaginationSection";
import { fetchTransactions } from "../../../redux/transactions/operations";

const TransactionsList = () => {
  const dispatch = useDispatch();
  const transactionsList = useSelector(selectTransactions);
  const isLoading = useSelector(selectIsLoading);

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [filters, setFilters] = useState({
    type: "",
    category: "",
    minSum: "",
    maxSum: "",
    month: "",
  });

  const [sortBy, setSortBy] = useState("_id");
  const [sortOrder, setSortOrder] = useState("asc");

  const reqParams = useMemo(
    () => ({
      ...filters,
      perPage,
      page,
      sortBy,
      sortOrder,
    }),
    [filters, perPage, page, sortBy, sortOrder]
  );

  console.log(filters);

  useEffect(() => {
    dispatch(fetchTransactions(reqParams));
  }, [dispatch, reqParams]);

  const filteredTransactions = transactionsList.filter(
    (transaction) => transaction && transaction._id
  );

  const handleSortClick = (e) => {
    const clickedSortBy = e.target.name;
    if (clickedSortBy === sortBy) {
      setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(clickedSortBy);
      setSortOrder("asc");
    }
  };

  return (
    <>
      <div>
        <TransactionFilterForm setFilters={setFilters} />
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

      <TransactionPaginationSection setPage={setPage} setPerPage={setPerPage} />
    </>
  );
};

export default TransactionsList;
