import { useDispatch, useSelector } from "react-redux";

import s from "./Transactions.module.css";

import TransactionsList from "./TransactionsList/TransactionsList";

import { selectIsAddTransaction } from "../../redux/transactions/selectors";
import { setIsAddTransaction } from "../../redux/transactions/slice";

const Transactions = () => {
  const dispatch = useDispatch();
  const Add = useSelector(selectIsAddTransaction);

  const handleAddBtn = () => {
    dispatch(setIsAddTransaction(true));
  };

  console.log(Add);

  return (
    <div className={s.transactions}>
      <TransactionsList />
      <button type="button" onClick={() => handleAddBtn()}>
        <span className={s.transactionsAddBtn}>+</span>
      </button>
    </div>
  );
};
export default Transactions;
