import clsx from "clsx";

import { LuPencil } from "react-icons/lu";

import s from "../Transactions.module.css";
import styles from "../../Buttons/Button.module.css";
import {
  setDeletingTransaction,
  setIsEditTransaction,
} from "../../../redux/transactions/slice";
import { useDispatch } from "react-redux";

import Button from "../../Buttons/Button";
import ButtonGradient from "../../Buttons/ButtonGradient";

const TransactionsItem = ({ _id, date, type, category, comment, sum }) => {
  const dispatch = useDispatch();

  const handleDeleteBtn = () => {
    dispatch(setDeletingTransaction({ _id, type, sum }));
    document.body.classList.add("no-scroll");
  };

  const formatDate = (date) => {
    const year = date.slice(0, 4);
    const month = date.slice(5, 7);
    const day = date.slice(8, 10);
    return `${day}.${month}.${year}`;
  };

  return (
    <div
      className={clsx(
        s.transactionsItem,
        type === "income" ? s.transactionsItemIncome : s.transactionsItemExpense
      )}
    >
      <div className={s.transactionsItemSpec}>
        <p className={s.transactionsItemDesc}>Date</p>
        <p className={s.transactionsItemValue}>{formatDate(date)}</p>
      </div>
      <div className={s.transactionsItemSpec}>
        <p className={s.transactionsItemDesc}>Type</p>
        <p className={s.transactionsItemValue}>
          {type === "income" ? "+" : "-"}
        </p>
      </div>
      <div className={s.transactionsItemSpec}>
        <p className={s.transactionsItemDesc}>Category</p>
        <p className={s.transactionsItemValue}>{category}</p>
      </div>
      <div className={s.transactionsItemSpec}>
        <p className={s.transactionsItemDesc}>Comment</p>
        <p className={s.transactionsItemValue}>
          {comment.length > 0 ? comment : "---"}
        </p>
      </div>
      <div className={s.transactionsItemSpec}>
        <p className={s.transactionsItemDesc}>Sum</p>
        <p
          className={clsx(
            s.transactionsItemValue,
            type === "income" ? s.income : s.expense
          )}
        >
          {sum}
        </p>
      </div>
      <div className={s.transactionsItemButtons}>
        <div>
          <ButtonGradient
            text={"Delete"}
            onClickFn={handleDeleteBtn}
            newClass={clsx(
              styles.transactionsItemDeleteBtn,
              s.transactionsItemDeleteBtn
            )}
          />
        </div>

        <button
          className={s.transactionsItemEditBtn}
          onClick={() => {
            dispatch(setIsEditTransaction(true));
            console.log("Id for editing transaction", _id);
          }}
        >
          <LuPencil className={s.transactionsItemEditBtnImage} />
          <span className={s.transactionsItemEditBtnText}>Edit</span>
        </button>
      </div>
    </div>
  );
};

export default TransactionsItem;
