import s from "./TransactionsItem.module.css";
import { LuPencil } from "react-icons/lu";
import clsx from "clsx";

const TransactionsItem = ({
  id,
  date,
  type,
  category,
  comment,
  sum,
  onDelete,
  onEdit,
}) => {
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
          onClick={() => onDelete(id)}
        >
          Delete
        </button>
        <button
          className={s.transactionsItemEditBtn}
          onClick={() => onEdit(id)}
        >
          <LuPencil /> Edit
        </button>
      </div>
    </div>
  );
};

export default TransactionsItem;
