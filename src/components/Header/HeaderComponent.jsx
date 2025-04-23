import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { selectIsModalOpen } from "../../redux/modal/selectors";
import { selectUserEmail } from "../../redux/auth/selectors";
import { closeModal, openModal } from "../../redux/modal/slice";
import { logout } from "../../redux/auth/operations";
import s from "./Header.module.css";
import { toast } from "react-toastify";

Modal.setAppElement("#root");

const HeaderComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isModalOpen = useSelector(selectIsModalOpen);
  const email = useSelector(selectUserEmail);

  const username = email ? email.split("@")[0] : "User";

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
        toast.error("Logout Error: " + resultAction.payload, {
          position: "top-center",
          autoClose: 5000,
          theme: "colored",
        });
      }
    } catch (err) {
      toast.error("Something went wrong: " + err.message, {
        position: "top-center",
        autoClose: 5000,
        theme: "colored",
      });
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
          <p className={s.name}>{username}</p>
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
        <div className={s.logoutContainer}>
          <svg className={s.logoutIcon} width={36} height={36}>
            <use href="/public/img/icons.svg#icon-Money-Guard" />
          </svg>
          <p className={s.logoutText}>Money Guard</p>
        </div>
        <p className={s.modalText}>Are you sure you want to log out?</p>
        <button className={s.btnLogout} onClick={confirmLogout}>
          Logout
        </button>
        <button className={s.btnCancel} onClick={() => dispatch(closeModal())}>
          Cancel
        </button>
      </Modal>
    </header>
  );
};

export default HeaderComponent;
