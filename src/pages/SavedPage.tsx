// src/pages/SavedPage.tsx
import React, { useEffect, useState, useRef } from "react";
import { getAllRecipes } from "../data/recipes";
import type { Recipe } from "../data/recipes";
import RecipeCard from "../components/RecipeCard";
import Header from "../components/Header";
import { Plus, ChevronDown } from "lucide-react";
import styles from "./SavedPage.module.scss";
import { useNavigate } from "react-router-dom";
import iconBook from "../assets/menu_icon/icon-park-outline_notebook-one.svg";
import iconEmpty from "../assets/EmptyPage.png";
import iconRedact from "../assets/redactCollelection.svg";

interface SavedItem {
  id: string;
  dateSaved: string;
}

interface Collection {
  id: string;
  name: string;
  description?: string;
  collaborators?: string[];
  recipes: SavedItem[];
}

// Throttle утилита
const throttle = <T extends (...args: any[]) => void>(callback: T, delay: number) => {
  let isThrottled = false;
  return (...args: Parameters<T>) => {
    if (!isThrottled) {
      isThrottled = true;
      callback(...args);
      setTimeout(() => { isThrottled = false; }, delay);
    }
  };
};

const SavedPage: React.FC = () => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [savedRecipes, setSavedRecipes] = useState<SavedItem[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editCollectionId, setEditCollectionId] = useState<string | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollDirectionRef = useRef<"up" | "down" | null>(null);
  const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const navigate = useNavigate();
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const [sortOption, setSortOption] = useState<string | null>(null);

  const [newCollectionName, setNewCollectionName] = useState("");
  const [newCollectionDescription, setNewCollectionDescription] = useState("");
  const [newCollectionCollaborators, setNewCollectionCollaborators] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);

  useEffect(() => {
    const savedCollections = JSON.parse(localStorage.getItem("savedCollections") || "[]");
    const recipes = JSON.parse(localStorage.getItem("savedRecipes") || "[]");
    setCollections(savedCollections);
    setSavedRecipes(recipes);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(`.${styles.menuWrapper}`)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const updateCollections = (updated: Collection[]) => {
    setCollections(updated);
    localStorage.setItem("savedCollections", JSON.stringify(updated));
  };

  const handleSaveCollection = () => {
    if (!newCollectionName.trim()) return;

    if (editCollectionId) {
      const updatedCollections = collections.map(col =>
        col.id === editCollectionId
          ? {
              ...col,
              name: newCollectionName,
              description: newCollectionDescription,
              collaborators: newCollectionCollaborators.split(",").map(c => c.trim()),
            }
          : col
      );
      updateCollections(updatedCollections);
    } else {
      const newCollection: Collection = {
        id: Date.now().toString(),
        name: newCollectionName,
        description: newCollectionDescription,
        collaborators: newCollectionCollaborators.split(",").map(c => c.trim()),
        recipes: [],
      };
      updateCollections([...collections, newCollection]);
    }

    setShowModal(false);
    setEditCollectionId(null);
    setNewCollectionName("");
    setNewCollectionDescription("");
    setNewCollectionCollaborators("");
    setIsPrivate(false);
  };

  const handleDropRecipe = (recipeId: string, collectionId: string) => {
    const recipe = savedRecipes.find(r => r.id === recipeId);
    if (!recipe) return;

    const updatedCollections = collections.map(col => {
      if (col.id === collectionId) {
        const exists = col.recipes.some(r => r.id === recipeId);
        if (!exists) return { ...col, recipes: [...col.recipes, recipe] };
      }
      return col;
    });

    updateCollections(updatedCollections);

    const newSavedRecipes = savedRecipes.filter(r => r.id !== recipeId);
    setSavedRecipes(newSavedRecipes);
    localStorage.setItem("savedRecipes", JSON.stringify(newSavedRecipes));
  };

  const throttledDragOver = throttle((e: React.DragEvent) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const sensitivity = 100;

    if (e.clientY < rect.top + sensitivity) {
      scrollDirectionRef.current = "up";
    } else if (e.clientY > rect.bottom - sensitivity) {
      scrollDirectionRef.current = "down";
    } else {
      scrollDirectionRef.current = null;
    }

    if (!scrollIntervalRef.current && scrollDirectionRef.current) {
      scrollIntervalRef.current = setInterval(() => {
        if (!scrollDirectionRef.current) {
          clearInterval(scrollIntervalRef.current!);
          scrollIntervalRef.current = null;
          return;
        }
        container.scrollTop += scrollDirectionRef.current === "up" ? -15 : 15;
      }, 20);
    }
  }, 100);

  const handleDragEnd = () => {
    scrollDirectionRef.current = null;
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
      scrollIntervalRef.current = null;
    }
  };

  const isEmpty = collections.length === 0 && savedRecipes.length === 0;

  const onEdit = (id: string) => {
    const collection = collections.find(c => c.id === id);
    if (!collection) return;

    setEditCollectionId(id);
    setNewCollectionName(collection.name);
    setNewCollectionDescription(collection.description || "");
    setNewCollectionCollaborators(collection.collaborators?.join(", ") || "");
    setShowModal(true);
    setOpenMenuId(null);
  };

  const onDelete = (id: string) => {
    const updatedCollections = collections.filter(col => col.id !== id);
    updateCollections(updatedCollections);
    setOpenMenuId(null);
  };

  const handleSortSelect = (option: string) => {
    setSortOption(option);
    setSortMenuOpen(false);

    let sortedCollections = [...collections];

    switch(option) {
      case "За популярністю":
        sortedCollections.sort((a, b) => b.recipes.length - a.recipes.length);
        break;
      case "За датою додавання":
        sortedCollections.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        break;
      case "За кількістю рецептів":
        sortedCollections.sort((a, b) => b.recipes.length - a.recipes.length);
        break;
      case "За назвою":
        sortedCollections.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
        break;
    }

    setCollections(sortedCollections);
  };

  

  return (
    <main
      className={`${styles.main} ${isEmpty ? styles.emptyPage : ""}`}
      ref={scrollContainerRef}
      onDragOver={throttledDragOver}
      onDragEnd={handleDragEnd}
    >
      <Header />

      {!isEmpty && (
        <div className={styles.savePageButtons}>
          <div className={styles.sortWrapper}>
            <button
              className={styles.allButton}
              onClick={(e) => { e.stopPropagation(); setSortMenuOpen(!sortMenuOpen); }}
            >
              Сортувати за <ChevronDown size={16} />
            </button>

            {sortMenuOpen && (
              <div className={styles.dropdownMenu} onClick={(e) => e.stopPropagation()}>
                {["За популярністю", "За датою додавання", "За кількістю рецептів", "За назвою"].map(option => (
                  <div
                    key={option}
                    className={`${styles.dropdownItem} ${sortOption === option ? styles.activeItem : ""}`}
                    onClick={() => handleSortSelect(option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className={styles.addCollectionWrapper}>
            <button
              className={styles.ingredientsAddButton}
              onClick={() => setShowModal(true)}
            >
              Додати колекцію <Plus size={16} />
            </button>
          </div>
        </div>
      )}

      {isEmpty ? (
        <div className={styles.emptyBlock}>
          <img className={styles.emptyImage} src={iconEmpty} alt="empty" />
          <h1 className={styles.emptyTitle}>У вас ще немає колекцій</h1>
          <p className={styles.emptyText}>
            Створіть першу, щоб зберігати <br /> улюблені рецепти в одному місці
          </p>
          <button
            className={styles.ingredientsAddButton}
            onClick={() => setShowModal(true)}
          >
            Додати колекцію <Plus size={16} />
          </button>
        </div>
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
                  onDrop={(e) => { e.preventDefault(); handleDropRecipe(e.dataTransfer.getData("text/plain"), col.id); }}
                  onDragOver={(e) => e.preventDefault()}
                  onClick={() => navigate(`/collection/${col.id}`)}
                >
                  <div className={styles.collectionImage}>
                    {savedInCollection.length === 0 ? (
                      <div className={styles.placeholder}></div>
                    ) : savedInCollection.length === 1 ? (
                      <img src={savedInCollection[0].image} alt="img0" className={styles.singleImage} />
                    ) : (
                      <>
                        {savedInCollection[0] && <img src={savedInCollection[0].image} alt="img0" className={styles.image0} />}
                        {savedInCollection[1] && <img src={savedInCollection[1].image} alt="img1" className={styles.image1} />}
                        {savedInCollection[2] && <img src={savedInCollection[2].image} alt="img2" className={styles.image2} />}
                      </>
                    )}

                    <div className={styles.menuWrapper} onClick={(e) => e.stopPropagation()}>
                      <button className={styles.menuButton} onClick={() => setOpenMenuId(openMenuId === col.id ? null : col.id)}>
                        <img src={iconRedact} alt="redact"/>
                      </button>
                      {openMenuId === col.id && (
                        <div className={styles.menuPopup}>
                          <button onClick={() => onEdit(col.id)}> Редагувати</button>
                          <button onClick={() => onDelete(col.id)}> Видалити</button>
                        </div>
                      )}
                    </div>
                  </div>

                  <h3 className={styles.collectionName}>{col.name || "Без назви"}</h3>
                  <div className={styles.collectionNameBlock}>
                    <img src={iconBook} alt="book" />
                    <p className={styles.collectionCount}>
                      {savedInCollection.length} {savedInCollection.length === 1 ? "рецепт" : "рецептів"}
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

      {showModal && (
        <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>{editCollectionId ? "Редагування колекції" : "Створення колекції"}</h2>
              <button className={styles.modalClose} onClick={() => setShowModal(false)}>✖</button>
            </div>

            <p className={styles.inputTitle}>Назва</p>
            <input
              type="text"
              placeholder="Наприклад: «Улюблені десерти»"
              value={newCollectionName}
              onChange={(e) => setNewCollectionName(e.target.value)}
              className={styles.modalInput}
            />

            <p className={styles.inputTitle}>Опис</p>
            <input
              type="text"
              placeholder="Наприклад: «Рецепти, які готую у будні»"
              value={newCollectionDescription}
              onChange={(e) => setNewCollectionDescription(e.target.value)}
              className={styles.modalInput}
            />

            <p className={styles.inputTitle}>Запросити співавторів</p>
            <input
              type="text"
              placeholder="Ім’я, нікнейм або e-mail співавтора"
              value={newCollectionCollaborators}
              onChange={(e) => setNewCollectionCollaborators(e.target.value)}
              className={styles.modalInput}
            />

            <label className={styles.checkboxWrapper}>
              <input type="checkbox" checked={isPrivate} onChange={(e) => setIsPrivate(e.target.checked)} />
              <span className={styles.customCheckbox}></span>
              <div className={styles.checkboxText}>
                <h1 className={styles.checkboxTitle}>Приховати колекцію від інших</h1>
                <p className={styles.checkboxText}>Колекція стане доступною лише вам</p>
              </div>
            </label>

            <button onClick={handleSaveCollection} className={styles.modalCreate}>
              {editCollectionId ? "Зберегти зміни" : "Створити колекцію"}
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default SavedPage;
