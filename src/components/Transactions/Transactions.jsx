import s from "./Transactions.module.css";
import TransactionsList from "./TransactionsList/TransactionsList";

const Transactions = () => {
  const handleAdd = () => {
    console.log("Add");
  };

  return (
    <div className={s.transactions}>
      <TransactionsList />
      <button type="button">
        <span className={s.transactionsAddBtn} onClick={() => handleAdd()}>
          +
        </span>
      </button>
    </div>
  );
};
export default Transactions;
