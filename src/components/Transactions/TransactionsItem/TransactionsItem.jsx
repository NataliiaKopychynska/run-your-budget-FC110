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

const TransactionsItem = ({ id, date, type, category, comment, sum }) => {
  const dispatch = useDispatch();

  const handleDeleteBtn = () => {
    dispatch(setDeletingTransaction({ id, type, sum }));
    document.getElementById("deleteModal").showModal();
  };

  return (
    <div
      className={clsx(
        s.transactionsItem,
        type === true ? s.transactionsItemIncome : s.transactionsItemExpense
      )}
    >
      <div className={s.transactionsItemSpec}>
        <p className={s.transactionsItemDesc}>Date</p>
        <p className={s.transactionsItemValue}>{date.substring(0, 7)}</p>
      </div>
      <div className={s.transactionsItemSpec}>
        <p className={s.transactionsItemDesc}>Type</p>
        <p className={s.transactionsItemValue}>{type == true ? "+" : "-"}</p>
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
            type === true ? s.income : s.expense
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
            console.log("Id for editing transaction", id);
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
