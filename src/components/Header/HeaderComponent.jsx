import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { selectIsModalOpen } from "../../redux/modal/selectors";
import { closeModal, openModal } from "../../redux/modal/slice";
import { logout } from "../../redux/auth/operations";
import { toast } from "react-toastify";
import { Icon } from "../../Icon";
import s from "./Header.module.css";
import { setIsUserModalOpen } from "../../redux/user/slice";
import { selectUser } from "../../redux/user/selectors";

Modal.setAppElement("#root");

const HeaderComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isModalOpen = useSelector(selectIsModalOpen);
  const user = useSelector(selectUser);

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
    <header className={s.header}>
      <div className={s.headerContainer}>
        <div className={s.logoContainer}>
          <Icon id="#icon-Money-Guard" className={s.logoIcon} />
          <p className={s.logoText}>Money Guard</p>
        </div>
        <div className={s.exitContainer}>
          <button
            type="button"
            className={s.name}
            onClick={() => {
              dispatch(setIsUserModalOpen(true));
            }}
          >
            {user.photo ? (
              <img src={user.photo} alt={user.name} className={s.userImage} />
            ) : (
              <p className={s.noPhoto}>{user.name?.charAt(0).toUpperCase()}</p>
            )}
          </button>
          <button className={s.exitBtn} onClick={handleLogoutClick}>
            <Icon id="#icon-exit-1" className={s.exitIcon} />
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
        <div>
          <div className={s.logoutContainer}>
            <Icon id="#icon-Money-Guard" className={s.logoutIcon} />
            <p className={s.logoutText}>Money Guard</p>
          </div>
          <p className={s.modalText}>Are you sure you want to log out?</p>
          <button className={s.btnLogout} onClick={confirmLogout}>
            Logout
          </button>
          <button
            className={s.btnCancel}
            onClick={() => dispatch(closeModal())}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </header>
  );
};

export default HeaderComponent;
