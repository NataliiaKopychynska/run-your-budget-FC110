import { useDispatch } from "react-redux"
import { openModal } from "../../redux/modal/slice";
import s from "./ButtonAddTransactions.module.css"
const ButtonAddTransactions = () => {
    const dispatch = useDispatch();
    return (
        <button className={s.addBtn}type="button" onClick={() => dispatch(openModal())}>
            +
        </button>
    );
};

export default ButtonAddTransactions