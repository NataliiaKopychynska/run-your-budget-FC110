import { useDispatch, useSelector } from "react-redux";
import { selectDeletingTransaction } from "../../redux/transactions/selectors";
import s from "./DeleteModal.module.css";
import styles from "../Buttons/Button.module.css";
import { setDeletingTransaction } from "../../redux/transactions/slice";
import { deleteTransaction } from "../../redux/transactions/operations";
import clsx from "clsx";

import { useEffect, useRef } from "react";
import ButtonGradient from "../Buttons/ButtonGradient";
import Button from "../Buttons/Button";

const DeleteModal = () => {
  const deletingTransaction = useSelector(selectDeletingTransaction);
  const dispatch = useDispatch();
  const modalRef = useRef(null);

  const handleYesClick = () => {
    dispatch(deleteTransaction(deletingTransaction._id));
    dispatch(setDeletingTransaction(null));
    modalRef.current?.close();
    document.body.classList.remove("no-scroll");
  };

  const handleNoClick = () => {
    dispatch(setDeletingTransaction(null));
    modalRef.current?.close();
    document.body.classList.remove("no-scroll");
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Escape" && modalRef.current?.open) {
        dispatch(setDeletingTransaction(null));
        modalRef.current?.close();
        document.body.classList.remove("no-scroll");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [dispatch]);

  useEffect(() => {
    if (deletingTransaction) {
      modalRef.current?.showModal();
    }
  }, [deletingTransaction]);

  return (
    deletingTransaction !== null && (
      <dialog
        ref={modalRef}
        id="deleteModal"
        className={s.modalContainer}
        onClick={() => {
          dispatch(setDeletingTransaction(null));
          modalRef.current?.close();
          document.body.classList.remove("no-scroll");
        }}
      >
        <div className="modal-box" onClick={(e) => e.stopPropagation()}>
          <div className={s.modal}>
            <button
              onClick={() => {
                dispatch(setDeletingTransaction(null));
                modalRef.current?.close();
                document.body.classList.remove("no-scroll");
              }}
              className={s.modalXBtn}
            >
              ✕
            </button>
            <div className={s.modalQuestion}>
              <p className={s.modalQuestionText}>
                Do you really want to delete this
              </p>

              <p className={s.modalQuestionText}>
                <span
                  className={clsx(
                    deletingTransaction.type === "income" ? s.income : s.expense
                  )}
                >
                  {deletingTransaction.type === "income" ? "income" : "expense"}
                </span>
                &nbsp;transaction for&nbsp;
                <span
                  className={clsx(
                    deletingTransaction.type === "income" ? s.income : s.expense
                  )}
                >
                  ₴{deletingTransaction.sum}
                </span>
                ?
              </p>
            </div>
            <div className={s.modalButtons}>
              <Button
                text={"No, I don't want"}
                onClickFn={handleNoClick}
                newClass={styles.deleteModalBtns}
              />

              <ButtonGradient
                text={"Yes, I want"}
                onClickFn={handleYesClick}
                newClass={styles.deleteModalBtns}
              />
            </div>
          </div>
        </div>
      </dialog>
    )
  );
};
export default DeleteModal;
