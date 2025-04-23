import { useDispatch } from "react-redux";
import { openModal } from "../../redux/modal/slice";
import s from "./ButtonAddTransactions.module.css";

const PlusIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M10 0V20" stroke="white" strokeWidth="2" />
    <path d="M0 10L20 10" stroke="white" strokeWidth="2" />
  </svg>
);

const ButtonAddTransactions = () => {
  const dispatch = useDispatch();
  return (
    <button
      className={s.addBtn}
      type="button"
      onClick={() => dispatch(openModal("addTransaction"))}
    >
      <PlusIcon />
    </button>
  );
};

export default ButtonAddTransactions;
