// src/pages/SummerOffersPage.tsx
import React from "react";
import Header from "../components/Header";
import RecipeCard from "../components/RecipeCard";
import { summerOffers } from "../data/recipes";
import styles from "./RecipesPage.module.scss";
import { useNavigate } from "react-router-dom";

const SummerOffersPage: React.FC = () => {
    const navigate = useNavigate();
  return (
    <main className={styles.main}>
            <Header
        showSearch={true}
          showBackButton
          backButtonLabel="До списку рецептів"   // 👈 свой текст
          onBackClick={() => navigate(-1)}
      />
      <h1>Літні сезонні пропозиції</h1>
      <div className={styles.grid}>
        {summerOffers.map((recipe) => (
          <RecipeCard key={recipe.id} {...recipe} />
        ))}
      </div>
    </main>
  );
};

export default SummerOffersPage;
