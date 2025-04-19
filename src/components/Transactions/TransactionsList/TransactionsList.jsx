import { useDispatch, useSelector } from "react-redux";
import { selectTransactions } from "../../../redux/transactions/selectors";
import TransactionsItem from "../TransactionsItem/TransactionsItem";
import s from "./TransactionsList.module.css";
import { useEffect } from "react";
import { fetchTransaction } from "../../../redux/transactions/operations";

const TransactionsList = () => {
  const dispatch = useDispatch();

  const transactionsList = useSelector(selectTransactions);

  const handleDelete = () => console.log("DELETE");
  const handleEdit = () => console.log("EDIT");

  useEffect(() => {
    dispatch(fetchTransaction());
  }, [dispatch]);

  return (
    <ul className={s.transactionsList}>
      {transactionsList.map((transaction) => {
        return (
          <li key={transaction.id}>
            <TransactionsItem
              {...transaction}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          </li>
        );
      })}
    </ul>
  );
};
export default TransactionsList;
