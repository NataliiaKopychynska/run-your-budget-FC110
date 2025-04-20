import { useDispatch, useSelector } from "react-redux";
import { selectTransactions } from "../../../redux/transactions/selectors";
import TransactionsItem from "../TransactionsItem/TransactionsItem";
import s from "./TransactionsList.module.css";
import { useEffect } from "react";
import { fetchTransactions } from "../../../redux/transactions/operations";

const TransactionsList = () => {
  const dispatch = useDispatch();
  const transactionsList = useSelector(selectTransactions);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  return (
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
          {transactionsList.map((transaction) => {
            return (
              <li key={transaction.id}>
                <TransactionsItem {...transaction} />
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};
export default TransactionsList;
