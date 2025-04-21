import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsModalOpen } from "../../redux/modal/selectors";
import { closeModal } from "../../redux/modal/slice";
import AddTransactionForm from "../AddTransactionForm/AddTransactionForm";
import s from "./ModalAddTransaction.module.css"

const ModalAddTransaction = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsModalOpen);

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
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
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