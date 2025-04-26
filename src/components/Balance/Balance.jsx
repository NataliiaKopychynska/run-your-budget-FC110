import React from "react";
import s from "./Balance.module.css";
import { useSelector } from "react-redux";
import { selectTransactions } from "../../redux/transactions/selectors";

export default function Balance() {
  const transactionList = useSelector(selectTransactions);
  const total = transactionList.reduce((acc, transaction) => {
    const sign = transaction.income === true ? 1 : -1;
    return acc + sign * Number(transaction.sum);
  }, 0);
  return (
    <div className={s.container}>
      <p className={s.title}>Your balance</p>
      <h2 className={s.sum}>₴ {total.toFixed(2)}</h2>
    </div>
  );
}
