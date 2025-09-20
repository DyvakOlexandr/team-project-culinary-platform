// src/pages/PopularRecipesPage.tsx
import React, { useState, useMemo } from "react";
import Header from "../components/Header";
import RecipeCard from "../components/RecipeCard";
import { popularRecipes } from "../data/recipes";
import styles from "./RecommendedRecipesPage.module.scss";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ArrowDown, Check } from "lucide-react";
import iconFilter from "../assets/icon-park-outline_center-alignment.svg";

type SortOption = "popularity" | "rating" | "time" | "complexity" | "newest";

const sortLabels: Record<SortOption, string> = {
  popularity: "За популярністю",
  rating: "За рейтингом",
  time: "За часом приготування",
  complexity: "За складністю",
  newest: "За новизною",
};

const complexityOrder: Record<string, number> = {
  "Легко": 1,
  "Помірно": 2,
  "Складно": 3,
};

function parseTime(time?: string): number {
  if (!time) return Infinity;
  const hoursMatch = time.match(/(\d+)\s*год/);
  const minutesMatch = time.match(/(\d+)\s*хв/);

  const hours = hoursMatch ? parseInt(hoursMatch[1], 10) : 0;
  const minutes = minutesMatch ? parseInt(minutesMatch[1], 10) : 0;
  return hours * 60 + minutes;
}

const PopularRecipesPage: React.FC = () => {
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("popularity");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const sortedRecipes = useMemo(() => {
    return [...popularRecipes].sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return (b.rating ?? 0) - (a.rating ?? 0);
        case "time":
          return parseTime(a.time) - parseTime(b.time);
        case "complexity":
          return (complexityOrder[a.complexity] ?? 99) - (complexityOrder[b.complexity] ?? 99);
        case "newest":
          return parseInt(b.id.replace(/\D/g, ""), 10) - parseInt(a.id.replace(/\D/g, ""), 10);
        case "popularity":
        default:
          return (b.rating ?? 0) - (a.rating ?? 0);
      }
    });
  }, [sortBy]);

  const displayedRecipes = showAll ? sortedRecipes : sortedRecipes.slice(0, 12);

  return (
    <main className={styles.main}>
      <Header
        showSearch={true}
        showBackButton
        backButtonLabel="До списку рецептів"
        onBackClick={() => navigate(-1)}
      />

      <div className={styles.headerBlock}>
        <h1>Популярне зараз</h1>
        <div className={styles.headerButtonBlock}>
          <div className={styles.sortWrapper}>
            <button
              className={styles.SortButton}
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              Сортувати за <ChevronDown size={24} />
            </button>
            {dropdownOpen && (
              <div className={styles.dropdownMenu}>
                {(Object.keys(sortLabels) as SortOption[]).map((option) => (
                  <div
                    key={option}
                    className={`${styles.dropdownItem} ${
                      sortBy === option ? styles.activeItem : ""
                    }`}
                    onClick={() => {
                      setSortBy(option);
                      setDropdownOpen(false);
                    }}
                  >
                    {sortLabels[option]}
                    {sortBy === option && <Check size={16} />}
                  </div>
                ))}
              </div>
            )}
          </div>

          <button className={styles.filterButton}>
            Фільтр
            <img src={iconFilter} alt="filter" />
          </button>
        </div>
      </div>

      <div className={styles.grid}>
        {displayedRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} {...recipe} />
        ))}
      </div>

      {!showAll && popularRecipes.length > 12 && (
        <button className={styles.allButton} onClick={() => setShowAll(true)}>
          Показати більше <ArrowDown size={24} />
        </button>
      )}
    </main>
  );
};

export default PopularRecipesPage;
