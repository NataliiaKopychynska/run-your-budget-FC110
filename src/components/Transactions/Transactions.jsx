import { useSelector } from "react-redux";

import s from "./Transactions.module.css";

import TransactionsList from "./TransactionsList/TransactionsList";

import { selectIsError } from "../../redux/transactions/selectors";
import SomethingWrong from "../SomethingWrong/SomethingWrong";

const Transactions = () => {
  const isError = useSelector(selectIsError);

  return (
    <div className={s.transactions}>
      {!isError ? <TransactionsList /> : <SomethingWrong />}
    </div>
  );
};
export default Transactions;
