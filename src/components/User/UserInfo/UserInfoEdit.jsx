import { useDispatch, useSelector } from "react-redux";
import s from "../User.module.css";
import {
  selectIsEditModalOpen,
  selectUser,
} from "../../../redux/user/selectors";
import { useEffect, useState } from "react";
import { editUserThunk, fetchUserThunk } from "../../../redux/user/operations";
import Modal from "react-modal";
import {
  setIsEditModalOpen,
  setIsUserModalOpen,
} from "../../../redux/user/slice";
import ButtonGradient from "../../Buttons/ButtonGradient";
import style from "../../Buttons/Button.module.css";
import { LuPencil } from "react-icons/lu";
import Button from "../../Buttons/Button";
import { Field, Formik, Form, ErrorMessage } from "formik";
import clsx from "clsx";
import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string().matches(
    /^[A-Za-zА-Яа-яЁёІіЇїЄєҐґ\s]+$/,
    "Only letters and spaces"
  ),
});

const UserInfoEdit = () => {
  const user = useSelector(selectUser);
  const isEditModalOpen = useSelector(selectIsEditModalOpen);
  const dispatch = useDispatch();

  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isPhotoRemoved, setIsPhotoRemoved] = useState(false);

  useEffect(() => {
    dispatch(fetchUserThunk());
  }, [dispatch]);

  useEffect(() => {
    setPreview(null);
    setPhoto(null);
    setIsPhotoRemoved(false);
  }, [user]);

  const formatIsoToDate = (isoString) => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPhoto(file);
      setPreview(URL.createObjectURL(file));
      setIsPhotoRemoved(false);
    }
  };

  const handleSave = async (values) => {
    const formData = new FormData();
    formData.append("name", values.name);

    if (isPhotoRemoved) {
      formData.append("photo", null);
    } else if (photo) {
      formData.append("photo", photo);
    }

    try {
      await dispatch(editUserThunk({ data: formData })).unwrap();
      dispatch(setIsEditModalOpen(false));
      dispatch(setIsUserModalOpen(true));
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  return (
    <Modal
      className={s.modalContainer}
      overlayClassName={s.overlay}
      isOpen={isEditModalOpen}
      onRequestClose={() => {
        dispatch(setIsEditModalOpen(false));
        dispatch(setIsUserModalOpen(true));
      }}
      contentLabel="EditModal"
    >
      <div className={s.user}>
        <div className={s.userProfile}>
          <div className={s.userTitle}>Edit profile</div>
        </div>

        <div className={s.userPhoto}>
          {preview ? (
            <img src={preview} alt="Preview" className={s.previewImage} />
          ) : user.photo && !isPhotoRemoved ? (
            <img src={user.photo} alt={user.name} className={s.userImage} />
          ) : (
            <div className={s.noPhoto}>
              {user.name?.charAt(0).toUpperCase()}
            </div>
          )}
          <div className={s.buttons}>
            {!user.photo || isPhotoRemoved ? (
              <label htmlFor="photo-upload" className={s.customBtn}>
                +
                <input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className={s.hiddenInput}
                />
              </label>
            ) : (
              <>
                <label htmlFor="photo-edit" className={s.customBtn}>
                  <LuPencil />
                  <input
                    id="photo-edit"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className={s.hiddenInput}
                  />
                </label>

                <button
                  type="button"
                  className={s.customBtn}
                  onClick={() => {
                    setPhoto(null);
                    setPreview(null);
                    setIsPhotoRemoved(true);
                  }}
                >
                  -
                </button>
              </>
            )}
          </div>
        </div>

        <Formik
          initialValues={{ name: user.name }}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={handleSave}
        >
          {({ errors, touched }) => (
            <Form className={s.userInfo}>
              <div className={clsx(s.userInfoRow, s.inputRow)}>
                <p className={s.userInfoRowTitle}>Name: </p>
                <div className={s.inputWrapper}>
                  <Field
                    name="name"
                    className={clsx(s.input, {
                      [s.inputError]: errors.name && touched.name,
                    })}
                  />
                  <ErrorMessage name="name">
                    {(msg) => <div className={s.error}>{msg}</div>}
                  </ErrorMessage>
                </div>
              </div>

              <div className={s.userInfoEdit}>
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

              <div className={s.editBtns}>
                <ButtonGradient
                  text="Save"
                  type="submit"
                  newClass={style.deleteModalBtns}
                />
                <Button
                  text="Cancel"
                  type="button"
                  newClass={style.deleteModalBtns}
                  onClickFn={() => {
                    dispatch(setIsEditModalOpen(false));
                    dispatch(setIsUserModalOpen(true));
                  }}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};

export default UserInfoEdit;
