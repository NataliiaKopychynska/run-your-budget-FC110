import { useDispatch, useSelector } from "react-redux";
import { selectTransactions } from "../../../redux/transactions/selectors";
import TransactionsItem from "../TransactionsItem/TransactionsItem";
import s from "../Transactions.module.css";
import { useEffect } from "react";
import { fetchTransactions } from "../../../redux/transactions/operations";
import { selectIsLoading } from "../../../redux/global/selectors";

const TransactionsList = () => {
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();
  const transactionsList = useSelector(selectTransactions);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  return (
    <>
      <div className={s.transactionListHeader}>
        <p className={s.transactionsListHeaderItem}>Date</p>
        <p className={s.transactionsListHeaderItem}>Type</p>
        <p className={s.transactionsListHeaderItem}>Category</p>
        <p className={s.transactionsListHeaderItem}>Comment</p>
        <p className={s.transactionsListHeaderItem}>Sum</p>
        <p className={s.transactionsListHeaderItem}></p>
      </div>

      {!isLoading && (
        <>
          {transactionsList.length === 0 ? (
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
              {transactionsList.map((transaction) => (
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
