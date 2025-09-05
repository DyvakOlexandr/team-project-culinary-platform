import React, { useState } from "react";
import Header from "../components/Header";
import RecipeCard from "../components/RecipeCard";
import styles from "./RecipesPage.module.scss";
import { sections, summerOffers } from "../data/recipes";
import type { Recipe } from "../data/recipes";

const getAllRecipes = (): Recipe[] => {
  const sectionRecipes = sections
    .filter((s) => s.type === "recipes")
    .flatMap((s) => s.items as Recipe[]);
  return [...sectionRecipes, ...summerOffers];
};

const RecipesPage: React.FC = () => {
  const allRecipes = getAllRecipes();

  const ITEMS_PER_PAGE = 9; // показываем по 9 рецептов
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const visibleRecipes = allRecipes.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  return (
    <main className={styles.main}>
      <Header />
      <div className={styles.grid}>
        {visibleRecipes.map((recipe, idx) => (
          <RecipeCard key={idx} {...recipe} />
        ))}
      </div>

      {visibleCount < allRecipes.length && (
        <div className={styles.loadMoreWrapper}>
          <button className={styles.loadMoreButton} onClick={handleLoadMore}>
            Показати більше
          </button>
        </div>
      )}
    </main>
  );
};

export default RecipesPage;
