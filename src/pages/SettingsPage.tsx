// SettingsPage.tsx
// SettingsPage.tsx
import React, { useState } from "react";
import Header from "../components/Header";
import styles from "./SettingsPage.module.scss";

const sections = [
  "Обліковий запис",
  "Сповіщення",
  "Мова та регіон",
  "Сімейний акаунт",
  "Безпека",
  "Інтеграції",
  "Про платформу",
];

const SettingsPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState(sections[0]);

  return (
    <main className={styles.main}>
      <Header />

      <div className={styles.settingsWrapper}>
        {/* Навигация */}
        <aside className={styles.sidebar}>
  <ul>
    {sections.map(section => (
      <li
        key={section}
        className={`${styles.navItem} ${
          activeSection === section ? styles.active : ""
        }`}
        onClick={() => setActiveSection(section)}
      >
        {section}
      </li>
    ))}
  </ul>
</aside>

        {/* Контент */}
        <section className={styles.content}>
          <h2>{activeSection}</h2>
          <p>Тут буде контент для розділу: <strong>{activeSection}</strong></p>
        </section>
      </div>
    </main>
  );
};

export default SettingsPage;
