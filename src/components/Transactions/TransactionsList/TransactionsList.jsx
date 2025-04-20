import { useDispatch, useSelector } from "react-redux";
import { selectTransactions } from "../../../redux/transactions/selectors";
import TransactionsItem from "../TransactionsItem/TransactionsItem";
import s from "../Transactions.module.css";
import { useEffect } from "react";
import {
  deleteTransaction,
  fetchTransactions,
} from "../../../redux/transactions/operations";
import { setIsEditTransaction } from "../../../redux/transactions/slice";
import clsx from "clsx";

const TransactionsList = () => {
  const dispatch = useDispatch();
  const transactionsList = useSelector(selectTransactions);

  const handleDeleteBtn = (id) => dispatch(deleteTransaction(id));
  const handleEditBtn = (id) => {
    dispatch(setIsEditTransaction(true));
    console.log("Id for editing transaction", id);
  };

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
              <li key={transaction.id} className={s.transactionLi}>
                <TransactionsItem
                  {...transaction}
                  onDelete={handleDeleteBtn}
                  onEdit={handleEditBtn}
                />
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};
export default TransactionsList;
