import { useSelector } from "react-redux";

import s from "./Transactions.module.css";

import TransactionsList from "./TransactionsList/TransactionsList";

// import { setIsAddTransaction } from "../../redux/transactions/slice";
import { selectIsError } from "../../redux/transactions/selectors";
import SomethingWrong from "../SomethingWrong/SomethingWrong";

const Transactions = () => {
  // const dispatch = useDispatch();
  const isError = useSelector(selectIsError);

  // const handleAddBtn = () => {
  //   dispatch(setIsAddTransaction(true));
  //   console.log("You can add transaction");
  // };

  return (
    <div className={s.transactions}>
      {!isError ? <TransactionsList /> : <SomethingWrong />}
      {/* <button type="button" onClick={() => handleAddBtn()}>
        <span className={s.transactionsAddBtn}>+</span>
      </button> */}
    </div>
  );
};
export default Transactions;
