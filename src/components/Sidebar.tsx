import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Sidebar.module.scss";
import logoIcon from "../assets/Logo.svg";

// Іконки
import iconHome from "../assets/SidebarIcons/icon-park-outline_home.svg";
import iconBook from "../assets/SidebarIcons/icon-park-outline_book-open.svg";
import iconBookmark from "../assets/SidebarIcons/icon-park-outline_bookmark-one.svg";
import iconCalendarAlt from "../assets/SidebarIcons/icon-park-outline_calendar.svg";
import iconCart from "../assets/SidebarIcons/icon-park-outline_shopping-bag-one.svg";
import iconCog from "../assets/SidebarIcons/icon-park-outline_setting-two.svg";
import iconCircle from "../assets/SidebarIcons/icon-park-outline_helpcenter.svg";

interface NavItem {
  label: string;
  image: string;
  path: string;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navGroups: NavGroup[] = [
    {
      title: "Основне",
      items: [
        { label: "Головна", image: iconHome, path: "/" },
        { label: "Рецепти", image: iconBook, path: "/recipes" },
        { label: "Збережене", image: iconBookmark, path: "/saved" },
      ],
    },
    {
      title: "Організація",
      items: [
        { label: "Планувальник страв", image: iconCalendarAlt, path: "/planner" },
        { label: "Список покупок", image: iconCart, path: "/shopping-list" },
      ],
    },
    {
      title: "Інше",
      items: [
        { label: "Налаштування", image: iconCog, path: "/settings" },
        { label: "Допомога", image: iconCircle, path: "/help" },
      ],
    },
  ];

  return (
    <aside className={styles.sidebar}>
      {/* Логотип */}
      <div className={styles.logo}>
        <img src={logoIcon} alt="Logo Icon" className={styles.icon} />
      </div>

      {/* Навигация */}
      <nav className={styles.nav}>
        {navGroups.map((group, idx) => (
          <div key={idx} className={styles.navGroup}>
            <p className={styles.groupTitle}>{group.title}</p>
            {group.items.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  className={`${styles.navButton} ${isActive ? styles.active : ""}`}
                  onClick={() => navigate(item.path)}
                >
                  <span className={styles.iconWrapper}>
                    <img src={item.image} alt={item.label} className={styles.icon} />
                  </span>
                  <span className={styles.label}>{item.label}</span>
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Блок "Отримати преміум" внизу */}
      <div className={styles.premiumBlock}>
        <div className={styles.premiumTextBlock}>
          <h1 className={styles.premiumTitle}> Активуй преміум 🚀</h1>
          <p className={styles.premiumText}>
            Ексклюзивні рецепти та <br /> додаткові можливості
          </p>
          <button className={styles.premiumButton}>
            Оновити
            <span className={styles.buttonIcon}></span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
