// src/pages/RecommendedRecipesPage.tsx
import React from "react";
import Header from "../components/Header";
import RecipeCard from "../components/RecipeCard";
import { recommendedRecipes } from "../data/recipes";
import styles from "./RecipesPage.module.scss";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const RecommendedRecipesPage: React.FC = () => {
    const navigate = useNavigate();
  return (
    <main className={styles.main}>
         <Header
        showSearch={false}
        customSearch={
          <div className={styles.customSearchWrapper}>
            <FaSearch className={styles.searchIcon} />
            <input
              type="text"
              className={styles.customSearch}
              placeholder="Пошук…"
            />
          </div>
        }
          showBackButton
          backButtonLabel="До списку рецептів"   // 👈 свой текст
          onBackClick={() => navigate(-1)}
      />
      <h1>Рекомендовано для тебе</h1>
      <div className={styles.grid}>
        {recommendedRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} {...recipe} />
        ))}
      </div>
    </main>
  );
};

export default RecommendedRecipesPage;
