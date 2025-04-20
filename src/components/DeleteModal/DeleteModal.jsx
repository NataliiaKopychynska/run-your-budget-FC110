import { useDispatch, useSelector } from "react-redux";
import { selectDeletingTransaction } from "../../redux/transactions/selectors";
import s from "./DeleteModal.module.css";
import { setDeletingTransaction } from "../../redux/transactions/slice";
import { deleteTransaction } from "../../redux/transactions/operations";
import clsx from "clsx";

import { useEffect, useRef } from "react";

const DeleteModal = () => {
  const deletingTransaction = useSelector(selectDeletingTransaction);
  const dispatch = useDispatch();
  const modalRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Escape" && modalRef.current?.open) {
        dispatch(setDeletingTransaction({}));
        modalRef.current?.close();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [dispatch]);

  useEffect(() => {
    if (modalRef.current?.open) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [deletingTransaction]);

  return (
    <dialog
      ref={modalRef}
      id="my_modal_3"
      className={s.modalContainer}
      onClick={() => {
        dispatch(setDeletingTransaction({}));
        modalRef.current?.close();
      }}
    >
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className={s.modal}>
          <button
            onClick={() => {
              dispatch(setDeletingTransaction({}));
              modalRef.current?.close();
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
                  deletingTransaction.type === true ? s.income : s.expense
                )}
              >
                {deletingTransaction.type === true ? "income" : "expense"}
              </span>
              &nbsp;transaction for&nbsp;
              <span
                className={clsx(
                  deletingTransaction.type === true ? s.income : s.expense
                )}
              >
                ₴{deletingTransaction.sum}
              </span>
              ?
            </p>
          </div>
          <div className={s.modalButtons}>
            <button
              className={s.modalNoBtn}
              type="button"
              onClick={() => {
                dispatch(setDeletingTransaction({}));

                modalRef.current?.close();
              }}
            >
              No, I don't want
            </button>
            <button
              className={s.modalYesBtn}
              type="button"
              onClick={() => {
                dispatch(deleteTransaction(deletingTransaction.id));
                dispatch(setDeletingTransaction({}));
                modalRef.current?.close();
              }}
            >
              Yes, I want
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
};
export default DeleteModal;
