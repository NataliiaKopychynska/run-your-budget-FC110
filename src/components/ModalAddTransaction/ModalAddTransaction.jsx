import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectModalType } from "../../redux/modal/selectors";
import { closeModal } from "../../redux/modal/slice";
import AddTransactionForm from "../AddTransactionForm/AddTransactionForm";
import s from "./ModalAddTransaction.module.css";

const ModalAddTransaction = () => {
  const dispatch = useDispatch();
  const modalType = useSelector(selectModalType);
  const isOpen = modalType === "addTransaction";

  const handleClose = useCallback(() => {
    dispatch(closeModal());
  }, [dispatch]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.classList.add("no-scroll");
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("no-scroll");
    };
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  return (
    <div className={s.backdrop} onClick={handleClose}>
      <div className={s.modal} onClick={(e) => e.stopPropagation()}>
        <div className={s.header}>
          <button onClick={handleClose} className={s.closeBtn}>
            ✕
          </button>
        </div>
        <AddTransactionForm onCancel={handleClose} />
      </div>
    </div>
  );
};

export default ModalAddTransaction;
