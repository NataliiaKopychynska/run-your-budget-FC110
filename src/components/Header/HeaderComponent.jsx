import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { selectIsModalOpen } from "../../redux/modal/selectors";
import { closeModal, openModal } from "../../redux/modal/slice";
import { logout } from "../../redux/auth/operations";
import s from "./Header.module.css";

Modal.setAppElement("#root");

const HeaderComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isModalOpen = useSelector(selectIsModalOpen);

  const handleLogoutClick = () => {
    dispatch(openModal("logoutConfirm"));
  };

  const confirmLogout = async () => {
    try {
      const resultAction = await dispatch(logout());

      localStorage.clear();

      if (logout.fulfilled.match(resultAction)) {
        navigate("/login");
      } else {
        alert("Помилка при виході: " + resultAction.payload);
      }
    } catch (err) {
      alert("Щось пішло не так: " + err.message);
    } finally {
      dispatch(closeModal());
    }
  };

  return (
    <header>
      <div className={s.headerContainer}>
        <div className={s.logoContainer}>
          <svg className={s.logoIcon} width={17} height={17}>
            <use href="/public/img/icons.svg#icon-Money-Guard" />
          </svg>
          <p className={s.logoText}>Money Guard</p>
        </div>
        <div className={s.exitContainer}>
          <p className={s.name}>Name</p>
          <button className={s.exitBtn} onClick={handleLogoutClick}>
            <svg className={s.exitIcon} width={18} height={18}>
              <use href="/public/img/icons.svg#icon-exit-1" />
            </svg>
            <p className={s.exitText}>Exit</p>
          </button>
        </div>
      </div>

      <Modal
        className={s.modal}
        overlayClassName={s.overlay}
        isOpen={isModalOpen}
        onRequestClose={() => dispatch(closeModal())}
        contentLabel="Modal"
      >
        <button onClick={confirmLogout}>Logout</button>
      </Modal>
    </header>
  );
};

export default HeaderComponent;
