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

const TransactionsItem = ({ _id, date, type, category, comments, summ }) => {
  const dispatch = useDispatch();

  const handleDeleteBtn = () => {
    dispatch(setDeletingTransaction({ _id, type, summ }));
    document.body.classList.add("no-scroll");
  };

  const formatDate = (isoString) => {
    const year = isoString.slice(0, 4);
    const month = isoString.slice(5, 7);
    const day = isoString.slice(8, 10);
    return `${day}.${month}.${year}`;
  };

  return (
    <div
      className={clsx(
        s.transactionsItem,
        type === "+" ? s.transactionsItemIncome : s.transactionsItemExpense
      )}
    >
      <div className={s.transactionsItemSpec}>
        <p className={s.transactionsItemDesc}>Date</p>
        <p className={s.transactionsItemValue}>{formatDate(date)}</p>
      </div>
      <div className={s.transactionsItemSpec}>
        <p className={s.transactionsItemDesc}>Type</p>
        <p className={s.transactionsItemValue}>{type}</p>
      </div>
      <div className={s.transactionsItemSpec}>
        <p className={s.transactionsItemDesc}>Category</p>
        <p className={s.transactionsItemValue}>{category}</p>
      </div>
      <div className={s.transactionsItemSpec}>
        <p className={s.transactionsItemDesc}>Comment</p>
        <p className={s.transactionsItemValue}>
          {comments.length > 0 ? comments : "---"}
        </p>
      </div>
      <div className={s.transactionsItemSpec}>
        <p className={s.transactionsItemDesc}>Sum</p>
        <p
          className={clsx(
            s.transactionsItemValue,
            type === "+" ? s.income : s.expense
          )}
        >
          {summ}
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
