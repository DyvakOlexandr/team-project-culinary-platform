// src/components/CollectionModal.tsx
import React from "react";
import styles from "./CollectionModal.module.scss";
import { X, ChevronLeft } from "lucide-react";
import type { Recipe } from "../data/recipes";

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

interface CollectionModalProps {
  isOpen: boolean;
  collection: Collection | null;
  onClose: () => void;
  onBack?: () => void; // кнопка назад
  onSelectRecipe?: (recipe: Recipe) => void;
}

import { getAllRecipes } from "../data/recipes";

const CollectionModal: React.FC<CollectionModalProps> = ({
  isOpen,
  collection,
  onClose,
  onBack,
  onSelectRecipe,
}) => {
  if (!isOpen || !collection) return null;

  // Получаем все рецепты коллекции
  const recipesInCollection: Recipe[] = collection.recipes
    .map(item => getAllRecipes().find(r => r.id === item.id))
    .filter((r): r is Recipe => r !== undefined);

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {/* Header */}
        <div className={styles.header}>
          {onBack && (
            <button className={styles.backBtn} onClick={onBack}>
              <ChevronLeft size={20} />
            </button>
          )}
          <h2 className={styles.title}>{collection.name}</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Recipes Grid */}
        <div className={styles.recipesGrid}>
          {recipesInCollection.map(recipe => (
            <div
              key={recipe.id}
              className={styles.recipeCard}
              onClick={() => {
                if (onSelectRecipe) onSelectRecipe(recipe);
                onClose();
              }}
            >
              <div
                className={styles.recipeImage}
                style={{ backgroundImage: `url(${recipe.image})` }}
              ></div>
              <h4 className={styles.recipeTitle}>{recipe.title}</h4>
            </div>
          ))}
          {recipesInCollection.length === 0 && (
            <p className={styles.emptyText}>Рецепти відсутні</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollectionModal;
