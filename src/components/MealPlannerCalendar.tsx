import React, { useState } from "react";
import styles from "./MealPlannerCalendar.module.scss";
import { getAllRecipes } from "../data/recipes";
import type { Meal } from "../data/mealPlanner";

const MealPlannerCalendar: React.FC = () => {
  const allRecipes = getAllRecipes();
  
  // Состояние: массив дней текущей недели
  const [weekPlan, setWeekPlan] = useState<{ [date: string]: Meal[] }>({});

  // Получаем текущую неделю (7 дней)
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay() + 1); // Понедельник

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    return date;
  });

  const addMeal = (date: Date, meal: Meal) => {
    const key = date.toDateString();
    setWeekPlan(prev => ({
      ...prev,
      [key]: [...(prev[key] || []), meal],
    }));
  };

  const removeMeal = (date: Date, mealId: string) => {
    const key = date.toDateString();
    setWeekPlan(prev => ({
      ...prev,
      [key]: prev[key].filter(m => m.id !== mealId),
    }));
  };

  return (
    <div className={styles.calendar}>
      {weekDays.map((day) => {
        const dayKey = day.toDateString();
        return (
          <div key={dayKey} className={styles.dayCell}>
            <div className={styles.dayHeader}>
              {day.toLocaleDateString("uk-UA", { weekday: "long", day: "numeric", month: "short" })}
            </div>
            <div className={styles.mealsList}>
              {(weekPlan[dayKey] || []).map(meal => (
                <div key={meal.id} className={styles.mealCard}>
                  {meal.title}
                  <button className={styles.removeBtn} onClick={() => removeMeal(day, meal.id)}>×</button>
                </div>
              ))}
            </div>
            <div className={styles.addMeals}>
              {allRecipes.slice(0, 3).map(meal => ( // для примера 3 рецепта
                <button key={meal.id} onClick={() => addMeal(day, meal)} className={styles.addMealBtn}>
                  {meal.title}
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MealPlannerCalendar;
