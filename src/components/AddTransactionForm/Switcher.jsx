import clsx from "clsx";
import s from "./AddTransactionForm.module.css";

const Switcher = ({ type, setFieldValue }) => {
  const toggleType = () => {
    const newType = type === "income" ? "expense" : "income";
    setFieldValue("type", newType);
  };

  return (
    <div className={s.switcherwrap}>
      <label className={clsx(s.label, type === "income" && s.active)}>
        <input
          type="radio"
          name="type"
          value="income"
          checked={type === "income"}
          onChange={() => setFieldValue("type", "income")}
          className={s.radio}
        />
        Income
      </label>

      <div className={s.switcher} onClick={toggleType}>
        <span className={clsx(s.circle, type === "expense" ? s.right : s.left)}>
          {type === "income" ? "+" : "–"}
        </span>
      </div>

      <label className={clsx(s.label, type === "expense" && s.active)}>
        <input
          type="radio"
          name="type"
          value="expense"
          checked={type === "expense"}
          onChange={() => setFieldValue("type", "expense")}
          className={s.radio}
        />
        Expense
      </label>
    </div>
  );
};

export default Switcher;
