import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTransactions, selectIsEditTransaction } from "../../redux/transactions/selectors";
import { setIsEditTransaction } from "../../redux/transactions/slice";
import EditTransactionForm from "../EditTransactionForm/EditTransactionForm";
import s from "./ModalEditTransaction.module.css";

const ModalEditTransaction = () => {
  const dispatch = useDispatch();
  const editId = useSelector(selectIsEditTransaction);       
  const allTx = useSelector(selectTransactions);             
  const tx = allTx.find(t => t._id === editId);               

  const isOpen = Boolean(editId) && Boolean(tx);

  const handleClose = useCallback(() => {
    dispatch(setIsEditTransaction(false));                    
  }, [dispatch]);


useEffect(() => {
  const onKey = e => e.key === "Escape" && handleClose();

  if (isOpen) {
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
  }

  return () => {
    window.removeEventListener("keydown", onKey);
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";
  };
}, [isOpen, handleClose]);

  if (!isOpen) return null;

  return (
    <div className={s.backdrop} onClick={handleClose}>
      <div className={s.modal} onClick={e => e.stopPropagation()}>
        <button className={s.closeBtn} onClick={handleClose}>✕</button>
        <EditTransactionForm transaction={tx} onCancel={handleClose} />
      </div>
    </div>
  );
};

export default ModalEditTransaction;