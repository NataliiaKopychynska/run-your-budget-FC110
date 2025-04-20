import { useDispatch, useSelector } from "react-redux";
import { selectDeletingTransaction } from "../../redux/transactions/selectors";
import s from "./DeleteModal.module.css";
import {
  setDeletingTransaction,
  setIsDeleteModalOpen,
} from "../../redux/transactions/slice";
import { deleteTransaction } from "../../redux/transactions/operations";

const DeleteModal = () => {
  const deletingTransaction = useSelector(selectDeletingTransaction);
  const dispatch = useDispatch();

  return (
    <div className={s.modal}>
      <div className={s.modalQuestion}>
        <p className={s.modalQuestionText}>Do you really want to delete this</p>

        <p className={s.modalQuestionText}>
          <span className={s.modalTypeText}>
            {deletingTransaction.type === "+" ? "income" : "expense"}
          </span>
          transaction for
          <span className={s.modalTypeText}>₴{deletingTransaction.sum}</span>?
        </p>
      </div>
      <div className={s.modalButtons}>
        <button
          className={s.modalNoBtn}
          type="button"
          onClick={() => {
            dispatch(setDeletingTransaction({}), setIsDeleteModalOpen(false));
          }}
        >
          No, I don't want
        </button>
        <button
          className={s.modalYesBtn}
          type="button"
          onClick={() => {
            dispatch(
              deleteTransaction(deletingTransaction.id),
              setDeletingTransaction({}),
              setIsDeleteModalOpen(false)
            );
          }}
        >
          Yes, I want
        </button>
      </div>
    </div>
  );
};
export default DeleteModal;
