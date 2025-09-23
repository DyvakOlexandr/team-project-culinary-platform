// src/pages/PremiumPage.tsx
import React from "react";
import Header from "../components/Header";
import styles from "./PremiumPage.module.scss";
import buttonIcon from "../assets/icon-park-outline_vip-one.svg";
import headerImage from "../assets/image_6.png";

const PremiumPage: React.FC = () => {
  return (
    <main className={styles.main}>
      <Header/>
      <div className={styles.headerBlock}>
       <div className={styles.headerText}>
      <h1 className={styles.headerTittle}>Перейдіть на преміум-аккаунт</h1>
      <p className={styles.headerDiscription}>Відкрийте всі функції та готуйте без обмежень. Змініть своє кулінарне <br/> 
подорож з нашими преміум-інструментами та ексклюзивним контентом</p>
      <button className={styles.headerButton}>Оновитись зараз
        <img src={buttonIcon} alt="buttonIcon"/>
      </button>
      </div>
      <img src={headerImage} alt="headerImage"/>
      </div>
      <div className={styles.mainText}>
       <h2 className={styles.mainTittle}>Преміум-переваги</h2>
       <p className={styles.mainDiscription}>Все, що потрібно, щоб стати шеф-кухарем</p>
       </div>
    </main>
  );
};

export default PremiumPage;
