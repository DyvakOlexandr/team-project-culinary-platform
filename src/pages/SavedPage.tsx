import React, { useEffect, useState, useRef } from "react";
import { getAllRecipes } from "../data/recipes";
import type { Recipe } from "../data/recipes";
import RecipeCard from "../components/RecipeCard";
import Header from "../components/Header";
import { Plus, ChevronDown } from "lucide-react";
import styles from "./SavedPage.module.scss";
import { useNavigate } from "react-router-dom";
import iconBook from "../assets/menu_icon/icon-park-outline_notebook-one.svg";

interface SavedItem {
  id: string;
  dateSaved: string;
}

interface Collection {
  id: string;
  name: string;
  recipes: SavedItem[];
}

// Утилита для throttling
const throttle = (callback: { (e: React.DragEvent): void; apply?: any; }, delay: number | undefined) => {
  let isThrottled = false;
  let lastArgs = null;
  let lastThis = null;

  const wrapper = (...args: any[]) => {
    lastArgs = args;
    lastThis = this;
    if (!isThrottled) {
      isThrottled = true;
      callback.apply(lastThis, lastArgs);
      setTimeout(() => {
        isThrottled = false;
      }, delay);
    }
  };
  return wrapper;
};

const SavedPage: React.FC = () => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [savedRecipes, setSavedRecipes] = useState<SavedItem[]>([]);
  const [showMenu, setShowMenu] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down" | null>(null);

  const menuRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Закрытие меню при клике вне него
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Загрузка коллекций и сохранённых рецептов
  useEffect(() => {
    const savedCollections = JSON.parse(localStorage.getItem("savedCollections") || "[]");
    if (savedCollections.length > 0) setCollections(savedCollections);

    const recipes = JSON.parse(localStorage.getItem("savedRecipes") || "[]");
    if (recipes.length > 0) setSavedRecipes(recipes);
  }, []);

  // Эффект для автоматической прокрутки при перетаскивании
  useEffect(() => {
    if (!scrollContainerRef.current || !scrollDirection) {
      return;
    }

    let scrollInterval: NodeJS.Timeout;
    const scrollSpeed = 15; // Увеличена скорость для более быстрого скролла

    if (scrollDirection === "up") {
      scrollInterval = setInterval(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTop -= scrollSpeed;
        }
      }, 10); // Уменьшен интервал для более плавного и быстрого скролла
    } else if (scrollDirection === "down") {
      scrollInterval = setInterval(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTop += scrollSpeed;
        }
      }, 15);
    }

    return () => clearInterval(scrollInterval);
  }, [scrollDirection]);

  const updateCollections = (updated: Collection[]) => {
    setCollections(updated);
    localStorage.setItem("savedCollections", JSON.stringify(updated));
  };

  const handleAddCollection = () => {
    const name = prompt("Назва нової колекції:");
    if (!name) return;
    const newCollection: Collection = { id: Date.now().toString(), name, recipes: [] };
    updateCollections([...collections, newCollection]);
    setShowMenu(false);
  };

  const handleDeleteCollection = (id: string) => {
    if (!window.confirm("Видалити цю колекцію?")) return;
    updateCollections(collections.filter(c => c.id !== id));
  };

  const handleDeleteAllCollections = () => {
    if (!window.confirm("Видалити всі колекції? Це дія незворотна.")) return;
    updateCollections([]);
  };

  const handleDeleteRecipeFromCollection = (collectionId: string, recipeId: string) => {
    const updatedCollections = collections.map(col =>
      col.id === collectionId
        ? { ...col, recipes: col.recipes.filter(r => r.id !== recipeId) }
        : col
    );
    updateCollections(updatedCollections);
  };

  const handleDeleteSavedRecipe = (recipeId: string) => {
    if (!window.confirm("Видалити цей рецепт?")) return;
    const updated = savedRecipes.filter(r => r.id !== recipeId);
    setSavedRecipes(updated);
    localStorage.setItem("savedRecipes", JSON.stringify(updated));
  };

  // Оптимизированный обработчик для перетаскивания
  const handleDropRecipe = (recipeId: string, collectionId: string) => {
    const recipe = savedRecipes.find(r => r.id === recipeId);
    if (!recipe) return;

    // Оптимистичное обновление состояния
    setCollections(prevCollections =>
      prevCollections.map(col => {
        if (col.id === collectionId) {
          const exists = col.recipes.some(r => r.id === recipeId);
          if (!exists) return { ...col, recipes: [...col.recipes, recipe] };
        }
        return col;
      })
    );

    setSavedRecipes(prevSavedRecipes => prevSavedRecipes.filter(r => r.id !== recipeId));

    // Асинхронное обновление localStorage
    const updatedCollections = collections.map(col => {
      if (col.id === collectionId) {
        const exists = col.recipes.some(r => r.id === recipeId);
        if (!exists) return { ...col, recipes: [...col.recipes, recipe] };
      }
      return col;
    });
    localStorage.setItem("savedCollections", JSON.stringify(updatedCollections));
    localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes.filter(r => r.id !== recipeId)));
  };

  const navigate = useNavigate();

  // Оптимизированный обработчик для onDragOver с throttling
const throttledDragOver = useRef(
    throttle((e: React.DragEvent) => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const sensitivity = 50;
        
        // Получаем высоту и ширину видимой области окна
        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;

        // Определяем, находится ли курсор близко к верхней или нижней границе
        const nearTop = e.clientY < rect.top + sensitivity;
        const nearBottom = e.clientY > rect.bottom - sensitivity;

        // Если курсор находится вне видимой области окна, прекращаем скролл
        if (e.clientY < 0 || e.clientY > viewportHeight || e.clientX < 0 || e.clientX > viewportWidth) {
            setScrollDirection(null);
            return;
        }

        // Если курсор находится внутри контейнера, но близко к его границе, включаем скролл
        if (nearTop) {
            setScrollDirection("up");
        } else if (nearBottom) {
            setScrollDirection("down");
        } else {
            setScrollDirection(null);
        }
    }, 50)
).current;

  const handleDragEnd = () => {
    setScrollDirection(null);
  };

  return (
    <main
      className={styles.main}
      ref={scrollContainerRef}
      onDragOver={throttledDragOver}
      onDragEnd={handleDragEnd}
    >
      <Header />

      <div className={styles.savePageButtons}>
        <button className={styles.SortButton}>
          Сортувати за <ChevronDown size={16} className={styles.sortIcon} />
        </button>

        <div className={styles.addCollectionWrapper} ref={menuRef}>
          <button
            className={styles.ingredientsAddButton}
            onClick={() => setShowMenu(prev => !prev)}
          >
            Додати колекцію <Plus size={16} />
          </button>

          {showMenu && (
            <div className={styles.menuDropdown}>
              <button className={styles.menuBtn} onClick={handleAddCollection}>
                ➕ Створити нову
              </button>

              {collections.length > 0 && (
                <>
                  <button className={styles.menuBtn} onClick={handleDeleteAllCollections}>
                    ❌ Видалити всі колекції
                  </button>
                  {collections.map(col =>
                    col.recipes.length > 0 || col.name ? (
                      <div key={col.id} className={styles.deleteRecipesGroup}>
                        <p className={styles.collectionTitle}>{col.name || "Без назви"}</p>
                        <button
                          className={styles.menuBtn}
                          onClick={() => handleDeleteCollection(col.id)}
                        >
                          🗑 Видалити колекцію
                        </button>
                        {col.recipes.map(recipeItem => {
                          const recipe = getAllRecipes().find(r => r.id === recipeItem.id);
                          if (!recipe) return null;
                          return (
                            <button
                              key={recipe.id}
                              className={styles.menuBtn}
                              onClick={() => handleDeleteRecipeFromCollection(col.id, recipe.id)}
                            >
                              🗑 {recipe.title}
                            </button>
                          );
                        })}
                      </div>
                    ) : null
                  )}
                </>
              )}

              {savedRecipes.length > 0 && (
                <div className={styles.deleteRecipesGroup}>
                  <p className={styles.collectionTitle}>Моя колекція</p>
                  {savedRecipes.map(recipeItem => {
                    const recipe = getAllRecipes().find(r => r.id === recipeItem.id);
                    if (!recipe) return null;
                    return (
                      <button
                        key={recipe.id}
                        className={styles.menuBtn}
                        onClick={() => handleDeleteSavedRecipe(recipe.id)}
                      >
                        🗑 {recipe.title}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {collections.length === 0 && savedRecipes.length === 0 ? (
        <p className={styles.empty}>У вас поки немає збережених колекцій.</p>
      ) : (
        <>
          <div className={styles.collectionsGrid}>
            {collections.map(col => {
              const savedInCollection: Recipe[] = col.recipes
                .map(item => getAllRecipes().find(r => r.id === item.id))
                .filter((r): r is Recipe => r !== undefined);

              return (
                <div
                  key={col.id}
                  className={styles.collectionCard}
                  onDrop={(e) => {
                    e.preventDefault();
                    const recipeId = e.dataTransfer.getData("text/plain");
                    handleDropRecipe(recipeId, col.id);
                  }}
                  onDragOver={(e) => e.preventDefault()}
                  onClick={() => navigate(`/collection/${col.id}`)}
                >
                  <img className={styles.collectionImage} />
                  <h3 className={styles.collectionName}>{col.name || "Без назви"}</h3>
                  <div className={styles.collectionNameBlock}>
                    <img src={iconBook} alt="book" />
                    <p className={styles.collectionCount}>
                      {savedInCollection.length}{" "}
                      {savedInCollection.length === 1 ? "рецепт" : "рецептів"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {savedRecipes.length > 0 && (
            <div className={styles.savedRecipesGrid}>
              {savedRecipes.map(recipeItem => {
                const recipe = getAllRecipes().find(r => r.id === recipeItem.id);
                if (!recipe) return null;
                return (
                  <div
                    key={recipe.id}
                    className={styles.savedRecipeCard}
                    draggable
                    onDragStart={(e) => e.dataTransfer.setData("text/plain", recipe.id)}
                  >
                    <RecipeCard {...recipe} />
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </main>
  );
};

export default SavedPage;