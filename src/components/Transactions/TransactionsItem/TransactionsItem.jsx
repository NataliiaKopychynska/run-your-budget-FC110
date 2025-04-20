import clsx from "clsx";

import { LuPencil } from "react-icons/lu";

import s from "./TransactionsItem.module.css";
import {
  setDeletingTransaction,
  setIsDeleteModalOpen,
  setIsEditTransaction,
} from "../../../redux/transactions/slice";
import { useDispatch } from "react-redux";

const TransactionsItem = ({ id, date, type, category, comment, sum }) => {
  const dispatch = useDispatch();

  return (
    <div
      className={clsx(
        s.transactionsItem,
        type === true ? s.transactionsItemIncome : s.transactionsItemExpense
      )}
    >
      <div className={s.transactionsItemSpec}>
        <p className={s.transactionsItemDesc}>Date</p>
        <p className={s.transactionsItemValue}>{date}</p>
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
        <p className={s.transactionsItemValue}>{comment}</p>
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
        <button
          className={s.transactionsItemDeleteBtn}
          onClick={() => {
            dispatch(
              setDeletingTransaction({ id, type, sum }),
              setIsDeleteModalOpen(true)
            );
          }}
        >
          Delete
        </button>
        <button
          className={s.transactionsItemEditBtn}
          onClick={() => {
            dispatch(setIsEditTransaction(true));
            console.log("Id for editing transaction", id);
          }}
        >
          <LuPencil /> Edit
        </button>
      </div>
    </div>
  );
};

export default TransactionsItem;
