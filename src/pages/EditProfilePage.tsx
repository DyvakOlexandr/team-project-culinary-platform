import React, { useState } from "react";
import Header from "../components/Header";
import styles from "./EditProfilePage.module.scss";
import avatarDefault from "../assets/avatar.webp";
import iconEdit from "../assets/icon-park-outline_edit_white.svg";
import iconDelete from "../assets/icon-park-outline_delete_red.svg";

const EditProfilePage: React.FC = () => {
  const [avatar, setAvatar] = useState<string>(avatarDefault);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteAvatar = () => {
    setAvatar(avatarDefault);
  };
  return (
    <main className={styles.main}>
      <Header
        showBackButton
        backButtonLabel="До профілю"
        onBackClick={() => window.history.back()}
      />

       <div className={styles.profileImageBlock}>
  <h1 className={styles.title}>Фотографія профілю</h1>

  <div className={styles.profileImageInfoBlock}>
    <img src={avatar} alt="Profile avatar" className={styles.profileImage} />

    <div className={styles.profileImageInfo}>
      <div className={styles.PhotoButtons}>
        <label className={styles.changePhotoButton}>
          Змінити фото <img src={iconEdit} alt="edit"/>
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            hidden
          />
        </label>

        <button
          className={styles.deletePhotoButton}
          onClick={handleDeleteAvatar}
        >
          Видалити фото <img src={iconDelete} alt="delete"/>
        </button>
      </div>

      <p className={styles.fileInfo}>PNG, JPEG Under 15MB</p>
    </div>
  </div>
</div>

       <div className={styles.personalInfoBlock}>
  <h2 className={styles.title}>Особиста інформація</h2>

  {/* Ім'я та Прізвище в один ряд */}
  <div className={styles.nameRow}>
    <div className={styles.inputGroup}>
      <label>Ім'я</label>
      <input type="text"/>
    </div>
    <div className={styles.inputGroup}>
      <label>Прізвище</label>
      <input type="text" />
    </div>
  </div>

  {/* Ім'я користувача */}
  <div className={styles.inputGroup}>
    <label>Ім'я користувача</label>
    <input type="text"/>
  </div>

  {/* Біографія */}
  <div className={styles.inputGroup}>
    <label>Біографія</label>
    <textarea  rows={4}></textarea>
  </div>
  <div className={styles.cookingProgress}>
  <span className={styles.progressText}>
    Поділіться своїми кулінарними подорожами з спільнотою
  </span>
  <span className={styles.progressNumber}>74/150</span>
</div>
</div>

<div className={styles.dietInfoBlock}>
  <h2 className={styles.sectionTitle}>Інформація про дієту</h2>

  <div className={styles.dietInputsRow}>
    <label>Алергії</label>
    <input
      type="text"
      placeholder="Наприклад: глютен, молоко, морепродукти"
      className={styles.dietInput}
    />
  </div>

  <div className={styles.dietInputsRow}>
    <label>Харчові вподобання</label>
    <input
      type="text"
      placeholder="Поширені вподобання: вегетаріанець, веган, безглютенова дієта"
      className={styles.dietInput}
    />
  </div>
</div>



    </main>
  );
};

export default EditProfilePage;
