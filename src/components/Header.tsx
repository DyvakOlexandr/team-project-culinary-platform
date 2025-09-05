// Header.tsx
import React from "react";
import { FaSearch, FaBell } from "react-icons/fa";
import styles from "./Header.module.scss";

interface HeaderProps {
  showSearch?: boolean;       // показывать ли стандартный поиск
  customSearch?: React.ReactNode; // сюда можно передать кастомный поисковик
  showBackButton?: boolean;   // кнопка назад
  onBackClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  showSearch = true,
  customSearch,
  showBackButton = false,
  onBackClick,
}) => {
  return (
    <header className={styles.header}>
      {showBackButton && (
        <button className={styles.backButton} onClick={onBackClick}>
          ← Назад
        </button>
      )}

      {/* если передан customSearch – показываем его, иначе стандартный */}
      {customSearch ? (
        <div className={styles.searchWrapper}>{customSearch}</div>
      ) : (
        showSearch && (
          <div className={styles.searchWrapper}>
            <FaSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Пошук рецептів, кухарів, інгредієнтів…"
            />
          </div>
        )
      )}

      <div className={styles.rightSection}>
        <button className={styles.bellButton}>
          <FaBell />
        </button>
        <div className={styles.avatar}></div>
      </div>
    </header>
  );
};

export default Header;
