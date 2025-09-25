import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Sidebar.module.scss";
import logoIcon from "../assets/Logo.svg";

// Импортируем нужные иконки из lucide-react
import {
  Home,
  BookOpen,
  Bookmark,
  Calendar,
  ShoppingBag,
  Settings,
  HelpCircle,
} from "lucide-react";

interface NavItem {
  label: string;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
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
        { label: "Головна", Icon: Home, path: "/" },
        { label: "Рецепти", Icon: BookOpen, path: "/recipes" },
        { label: "Збережене", Icon: Bookmark, path: "/saved" },
      ],
    },
    {
      title: "Організація",
      items: [
        { label: "Планувальник страв", Icon: Calendar, path: "/planner" },
        { label: "Список покупок", Icon: ShoppingBag, path: "/shopping-list" },
      ],
    },
    {
      title: "Інше",
      items: [
        { label: "Налаштування", Icon: Settings, path: "/settings" },
        { label: "Допомога", Icon: HelpCircle, path: "/help" },
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
                             <item.Icon
  size={20}
  className={`${styles.icon} ${isActive ? styles.activeIcon : ""}`}
/>
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
          <button
            className={styles.premiumButton}
            onClick={() => navigate("/premium")}
          >
            Оновити
            <span className={styles.buttonIcon}></span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
