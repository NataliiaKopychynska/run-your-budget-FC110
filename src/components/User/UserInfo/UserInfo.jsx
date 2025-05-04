import { useDispatch, useSelector } from "react-redux";
import s from "../User.module.css";
import {
  selectIsUserModalOpen,
  selectUser,
} from "../../../redux/user/selectors";
import { useEffect } from "react";
import { fetchUserThunk } from "../../../redux/user/operations";
import Modal from "react-modal";
import {
  setIsEditModalOpen,
  setIsUserModalOpen,
} from "../../../redux/user/slice";
import { LuPencil } from "react-icons/lu";

Modal.setAppElement("#root");

const UserInfo = () => {
  const user = useSelector(selectUser);
  const isUserModalOpen = useSelector(selectIsUserModalOpen);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isUserModalOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [isUserModalOpen]);

  useEffect(() => {
    dispatch(fetchUserThunk());
  }, [dispatch]);

  function formatIsoToDate(isoString) {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  }

  return (
    isUserModalOpen && (
      <Modal
        className={s.modalContainer}
        overlayClassName={s.overlay}
        isOpen={isUserModalOpen}
        onRequestClose={() => {
          dispatch(setIsUserModalOpen(false));
        }}
        contentLabel="UserModal"
      >
        <div className={s.user}>
          <button
            onClick={() => {
              dispatch(setIsUserModalOpen(false));
            }}
            className={s.modalXBtn}
          >
            ✕
          </button>
          <div className={s.userProfile}>
            <div className={s.userTitle}>My profile</div>
            <button
              onClick={() => {
                dispatch(setIsUserModalOpen(false));
                dispatch(setIsEditModalOpen(true));
              }}
              className={s.editUserBtn}
            >
              <LuPencil />
            </button>
          </div>
          <div className={s.userPhoto}>
            {user.photo ? (
              <img src={user.photo} alt={user.name} className={s.userImage} />
            ) : (
              <div className={s.noPhoto}>
                {user.name?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div className={s.userInfo}>
            <div className={s.userInfoRow}>
              <p className={s.userInfoRowTitle}>Name: </p>
              <p className={s.userInfoRowText}>{user.name}</p>
            </div>
            <div className={s.userInfoRow}>
              <p className={s.userInfoRowTitle}>E-mail: </p>
              <p className={s.userInfoRowText}>{user.email}</p>
            </div>
            <div className={s.userInfoRow}>
              <p className={s.userInfoRowTitle}>Balance: </p>
              <p className={s.userInfoRowText}>{user.balance} UAH</p>
            </div>
            <div className={s.userInfoRow}>
              <p className={s.userInfoRowTitle}>Registration: </p>
              <p className={s.userInfoRowText}>
                {formatIsoToDate(user.createdAt)}
              </p>
            </div>
          </div>
        </div>
      </Modal>
    )
  );
};
export default UserInfo;
