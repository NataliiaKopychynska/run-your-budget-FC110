import { useDispatch } from "react-redux";

import s from "./Transactions.module.css";

import TransactionsList from "./TransactionsList/TransactionsList";

import { setIsAddTransaction } from "../../redux/transactions/slice";

const Transactions = () => {
  const dispatch = useDispatch();

  const handleAddBtn = () => {
    dispatch(setIsAddTransaction(true));
    console.log("You can add transaction");
  };

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
