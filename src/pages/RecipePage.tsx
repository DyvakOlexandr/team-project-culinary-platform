// src/pages/RecipesPage.tsx
import React, { useState, useMemo } from "react";
import Header from "../components/Header";
import RecipeCard from "../components/RecipeCard";
import styles from "./RecipesPage.module.scss";
import { sections, summerOffers } from "../data/recipes";
import type { Recipe } from "../data/recipes";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronDown, ArrowDown } from "lucide-react";
import iconFilter from "../assets/icon-park-outline_center-alignment.svg";
import FilterModal from "../components/FilterModal";

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

const getAllRecipes = (): Recipe[] => {
  const sectionRecipes = sections
    .filter((s) => s.type === "recipes")
    .flatMap((s) => s.items as Recipe[]);
  return [...sectionRecipes, ...summerOffers];
};

interface Collection {
  id: string;
  name: string;
  recipes: { id: string; dateSaved: string }[];
}

const RecipesPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const targetCategory = location.state?.category || "Сніданок";
  const selectedDate = location.state?.date;
  const collectionId = location.state?.collectionId;

  const allRecipes = getAllRecipes();

  const [showAll, setShowAll] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("popularity");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [filters, setFilters] = useState<{
    cuisines?: string[];
    category?: string;
    time?: string;
    complexity?: string;
    diet?: string;
  }>({});

  const sortedRecipes = useMemo(() => {
    return [...allRecipes].sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return (b.rating ?? 0) - (a.rating ?? 0);
        case "time":
          return parseTime(a.time) - parseTime(b.time);
        case "complexity":
          return (
            (complexityOrder[a.complexity] ?? 99) -
            (complexityOrder[b.complexity] ?? 99)
          );
        case "newest":
          return (
            parseInt(b.id.replace(/\D/g, ""), 10) -
            parseInt(a.id.replace(/\D/g, ""), 10)
          );
        case "popularity":
        default:
          return (b.rating ?? 0) - (a.rating ?? 0);
      }
    });
  }, [sortBy, allRecipes]);

  const filteredRecipes = useMemo(() => {
  return sortedRecipes.filter((r) => {
    // Кухня
    if (filters.cuisines && filters.cuisines.length > 0) {
      if (!r.cuisine || !filters.cuisines.includes(r.cuisine)) return false;
    }

    // Категорія
    if (filters.category) {
      if (!r.category || !r.category.toLowerCase().includes(filters.category.toLowerCase())) {
        return false;
      }
    }

    // Час (до N хв)
    if (filters.time) {
      const match = filters.time.match(/до\s*(\d+)\s*хв/);
      if (match) {
        const maxMinutes = parseInt(match[1], 10);
        if (parseTime(r.time) > maxMinutes) return false;
      }
    }

    // Складність
    if (filters.complexity) {
      if (!r.complexity || r.complexity !== filters.complexity) return false;
    }

    // Дієта
    if (filters.diet) {
      if (!r.diet || !r.diet.includes(filters.diet)) return false;
    }

    return true;
  });
}, [sortedRecipes, filters]);


  const displayedRecipes = showAll
    ? filteredRecipes
    : filteredRecipes.slice(0, 9);

  const handleSelectRecipe = (recipe: Recipe) => {
    if (collectionId) {
      const savedCollections: Collection[] = JSON.parse(localStorage.getItem("savedCollections") || "[]");
      const updatedCollections = savedCollections.map(col => {
        if (col.id === collectionId) {
          if (!col.recipes.some(r => r.id === recipe.id)) {
            col.recipes.push({ id: recipe.id, dateSaved: new Date().toISOString() });
          }
        }
        return col;
      });
      localStorage.setItem("savedCollections", JSON.stringify(updatedCollections));
      navigate(`/collection/${collectionId}`);
    } else {
      navigate("/planner", {
        state: { addedRecipe: recipe, category: targetCategory, date: selectedDate },
      });
    }
  };

  return (
    <main className={styles.main}>
      <Header />

      <div className={styles.headerBlock}>
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
              
                  </div>
                ))}
              </div>
            )}
          </div>

          <button className={styles.filterButton} onClick={() => setFilterModalOpen(true)}>
            Фільтр
            <img src={iconFilter} alt="filter" />
          </button>
        </div>
      </div>
      {/* Под кнопкой фильтра, сразу после headerBlock */}
{filters.cuisines?.length || filters.category || filters.time || filters.complexity || filters.diet ? (
  <div className={styles.selectedFilters}>
    <button
      className={styles.clearFiltersButton}
      onClick={() =>
        setFilters({ cuisines: [], category: "", time: "", complexity: "", diet: "" })
      }
    >
      Очистити
    </button>

    {/* Кухни */}
    {filters.cuisines?.map(c => (
      <span key={c} className={styles.filterTag}>{c}</span>
    ))}

    {/* Категория */}
    {filters.category && <span className={styles.filterTag}>{filters.category}</span>}

    {/* Время */}
    {filters.time && <span className={styles.filterTag}>{filters.time}</span>}

    {/* Сложность */}
    {filters.complexity && <span className={styles.filterTag}>{filters.complexity}</span>}

    {/* Диета */}
    {filters.diet && <span className={styles.filterTag}>{filters.diet}</span>}
  </div>
) : null}


      <div className={styles.grid}>
        {displayedRecipes.map(recipe => (
          <div key={recipe.id} onClick={() => handleSelectRecipe(recipe)} style={{ cursor: "pointer" }}>
            <RecipeCard {...recipe} />
          </div>
        ))}
      </div>

      {!showAll && filteredRecipes.length > 9 && (
        <button className={styles.allButton} onClick={() => setShowAll(true)}>
          Показати більше <ArrowDown size={24} />
        </button>
      )}

      <FilterModal
        isOpen={filterModalOpen}
        onClose={() => setFilterModalOpen(false)}
        onApply={(f) => {
          setFilters(f);
          setFilterModalOpen(false);
        }}
      />
    </main>
  );
};

export default RecipesPage;
