// src/pages/CollectionPage.tsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAllRecipes } from "../data/recipes";
import type { Recipe } from "../data/recipes";
import RecipeCard from "../components/RecipeCard";
import Header from "../components/Header";
import styles from "./CollectionPage.module.scss";
import iconBook from "../assets/menu_icon/icon-park-outline_notebook-one.svg";
import iconEmpty from "../assets/EmptyPage.png"; 
import { Plus, ChevronDown } from "lucide-react";
import iconEdit from "../assets/icon-park-outline_edit.svg";

interface Collection {
  id: string;
  name: string;
  recipes: { id: string; dateSaved: string }[];
}

const CollectionPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [collections, setCollections] = useState<Collection[]>(
    JSON.parse(localStorage.getItem("savedCollections") || "[]")
  );
  const [openMenu, setOpenMenu] = useState(false);
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const [sortOption, setSortOption] = useState<
    "За популярністю" | "За кількістю рецептів" | "За новизною" | "За залученістю"
  >("За популярністю");

  const collection = collections.find(c => c.id === id);
  if (!collection) return <p>Колекція не знайдена</p>;

  const savedRecipes: Recipe[] = collection.recipes
    .map(item => getAllRecipes().find(r => r.id === item.id))
    .filter((r): r is Recipe => r !== undefined);

  const isEmptyCollection = savedRecipes.length === 0;

  const handleDeleteRecipe = (recipeId: string) => {
    const updatedCollections = collections.map(col => {
      if (col.id === collection.id) {
        return { ...col, recipes: col.recipes.filter(r => r.id !== recipeId) };
      }
      return col;
    });
    localStorage.setItem("savedCollections", JSON.stringify(updatedCollections));
    setCollections(updatedCollections);
    setOpenMenu(false);
  };

  const handleSortSelect = (option: typeof sortOption) => {
    setSortOption(option);
    setSortMenuOpen(false);

    const updatedCollections = collections.map(col => {
      if (col.id !== collection.id) return col;

      let sortedRecipes: Recipe[] = col.recipes
        .map(item => getAllRecipes().find(r => r.id === item.id))
        .filter((r): r is Recipe => r !== undefined);

      switch (option) {
        case "За популярністю":
          sortedRecipes.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
          break;
        case "За кількістю рецептів":
          sortedRecipes.sort((a, b) => b.title.length - a.title.length);
          break;
        case "За новизною":
          sortedRecipes.sort((a, b) => {
            const aDate = col.recipes.find(r => r.id === a.id)?.dateSaved || "";
            const bDate = col.recipes.find(r => r.id === b.id)?.dateSaved || "";
            return bDate.localeCompare(aDate);
          });
          break;
      case "За залученістю":
             // Используем только рейтинг как метрику вовлеченности
             sortedRecipes.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
           break;
      }

      return {
        ...col,
        recipes: sortedRecipes.map(r => ({
          id: r.id,
          dateSaved: col.recipes.find(c => c.id === r.id)?.dateSaved || "",
        })),
      };
    });

    setCollections(updatedCollections);
  };

  return (
    <main className={styles.main}>
   <Header
  showSearch
  showBackButton
  backButtonLabel="До колекцій"
  onBackClick={() => navigate("/saved")}
/>

      {/* Заголовок коллекции с меню */}
      <div className={styles.collectionInfoLine}>
        <div className={styles.collectionNameBlock}>
          <div className={styles.collectionTitleBlock}>
             <div className={styles.titleBlock}>
            <h1 className={styles.collectionName}>{collection.name}</h1>

            <div className={styles.menuWrapper}>
  <button
    className={styles.menuButton}
    onClick={() => setOpenMenu(prev => !prev)}
  >
    <img src={iconEdit} alt="edit" />
  </button>

  {openMenu && (
    <div className={styles.menuPopup}>
      {/* Переход на RecipesPage с передачей collectionId */}
      <button
        onClick={() => navigate("/recipes", { state: { collectionId: collection.id } })}
      >
        Додати рецепт
      </button>

      {/* Список для удаления рецептов */}
      {savedRecipes.length > 0 && (
        <div>
          {savedRecipes.map(r => (
            <button key={r.id} onClick={() => handleDeleteRecipe(r.id)}>
              Видалити {r.title}
            </button>
          ))}
        </div>
      )}
    </div>
  )}
</div>
            </div>

            {/* Кнопка сортировки */}
<div className={styles.savePageButtons}>
  <div className={styles.sortWrapper}>
    <button
      className={styles.allButton}
      onClick={(e) => { e.stopPropagation(); setSortMenuOpen(prev => !prev); }}
    >
      Сортувати за <ChevronDown size={16} />
    </button>

    {sortMenuOpen && (
      <div className={styles.dropdownMenu} onClick={(e) => e.stopPropagation()}>
        {["За популярністю", "За кількістю рецептів", "За новизною", "За залученістю"].map(option => (
          <div
            key={option}
            className={`${styles.dropdownItem} ${sortOption === option ? styles.activeItem : ""}`}
            onClick={() => handleSortSelect(option as typeof sortOption)}
          >
            {option}
          </div>
        ))}
      </div>
    )}
  </div>
</div>

          </div>

          <div className={styles.recipeCountBlock}>
            <img src={iconBook} alt="book" />
            <p className={styles.recipeCount}>
              {savedRecipes.length} {savedRecipes.length === 1 ? "рецепт" : "рецептів"}
            </p>
          </div>
        </div>
      </div>

      {/* Контент */}
      {isEmptyCollection ? (
        <div className={styles.emptyBlock}>
          <img className={styles.emptyImage} src={iconEmpty} alt="empty" />
          <h2 className={styles.emptyTitle}>Ваша колекція порожня</h2>
          <p className={styles.emptyText}>
            Збирайте свої улюблені рецепти <br /> разом в одному місці
          </p>
          <button
            className={styles.ingredientsAddButton}
             onClick={() => navigate("/recipes", { state: { collectionId: collection.id } })}
          >
            Додати рецепт <Plus size={16} />
          </button>
        </div>
      ) : (
        <div className={styles.recipesGrid}>
          {savedRecipes.map(recipe => (
            <RecipeCard key={recipe.id} {...recipe} />
          ))}
        </div>
      )}
    </main>
  );
};

export default CollectionPage;
