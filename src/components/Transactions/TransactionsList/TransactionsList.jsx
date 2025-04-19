import { useDispatch, useSelector } from "react-redux";
import {
  selectIsEditTransaction,
  selectTransactions,
} from "../../../redux/transactions/selectors";
import TransactionsItem from "../TransactionsItem/TransactionsItem";
import s from "./TransactionsList.module.css";
import { useEffect } from "react";
import {
  deleteTransaction,
  fetchTransactions,
} from "../../../redux/transactions/operations";
import { setIsEditTransaction } from "../../../redux/transactions/slice";

const TransactionsList = () => {
  const dispatch = useDispatch();
  const transactionsList = useSelector(selectTransactions);
  const isEdit = useSelector(selectIsEditTransaction);

  console.log(isEdit);

  const handleDeleteBtn = (id) => dispatch(deleteTransaction(id));
  const handleEditBtn = (id) =>
    dispatch(
      setIsEditTransaction(true),
      console.log("Id for editing transaction", id)
    );

  console.log(isEdit);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  return (
    <ul className={s.transactionsList}>
      {transactionsList.map((transaction) => {
        return (
          <li key={transaction.id}>
            <TransactionsItem
              {...transaction}
              onDelete={handleDeleteBtn}
              onEdit={handleEditBtn}
            />
          </li>
        );
      })}
    </ul>
  );
};
export default TransactionsList;
