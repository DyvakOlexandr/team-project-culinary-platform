import React from "react";
import styles from "./MealPlannerPage.module.scss";
import Header from "../components/Header";
import MealPlannerCalendar from "../components/MealPlannerCalendar";

const MealPlannerPage: React.FC = () => {

  return (
    <main className={styles.main}>
        <Header/>
        <MealPlannerCalendar/>

      
    </main>
  );
};

export default MealPlannerPage;
