// ShoppingListPage.tsx
import React, { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import styles from "./ShoppingListPage.module.scss";
import { Plus, ChevronDown, Trash2 } from "lucide-react";

interface ShoppingItem {
  id: string;
  name: string;
  amount?: number;
  unit?: string;
}

interface ShoppingList {
  id: string;
  name: string;
  items: ShoppingItem[];
   createdAt: string;
}

const ShoppingListPage: React.FC = () => {
  const [lists, setLists] = useState<ShoppingList[]>([]);
  const [products, setProducts] = useState<ShoppingItem[]>([]);
  const [showMenu, setShowMenu] = useState(false);
  const [sortOrder, setSortOrder] = useState<"default" | "az">("default");
  const menuRef = useRef<HTMLDivElement>(null);

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

  // Загрузка данных из localStorage один раз при монтировании
  useEffect(() => {
    const savedLists = JSON.parse(localStorage.getItem("shoppingLists") || "[]");
    const savedProducts = JSON.parse(localStorage.getItem("shoppingProducts") || "[]");
    setLists(savedLists);
    setProducts(savedProducts);
  }, []);

  // --- Функции для работы с localStorage ---
  const updateLists = (updated: ShoppingList[]) => {
    setLists(updated);
    localStorage.setItem("shoppingLists", JSON.stringify(updated));
  };

  const updateProducts = (updated: ShoppingItem[]) => {
    setProducts(updated);
    localStorage.setItem("shoppingProducts", JSON.stringify(updated));
  };

  // --- Обработчики кнопок ---
  const handleAddList = () => {
  const name = prompt("Назва нового списку:");
  if (!name) return;
  const newList: ShoppingList = { 
    id: Date.now().toString(), 
    name, 
    items: [],
    createdAt: new Date().toLocaleDateString() // сохраняем дату
  };
  updateLists([...lists, newList]);
  setShowMenu(false);
};
  const handleDeleteList = (id: string) => {
    if (!window.confirm("Видалити цей список?")) return;
    updateLists(lists.filter(list => list.id !== id));
  };

  const handleDeleteAllLists = () => {
    if (!window.confirm("Видалити всі списки? Це дія незворотна.")) return;
    updateLists([]);
  };

  const handleDeleteProduct = (id: string) => {
    updateProducts(products.filter(p => p.id !== id));
  };

  const handleDeleteAllProducts = () => {
    if (!window.confirm("Видалити всі продукти без списку?")) return;
    updateProducts([]);
  };

  const handleDropProduct = (productId: string, listId: string) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const updatedLists = lists.map(list =>
      list.id === listId ? { ...list, items: [...list.items, product] } : list
    );
    updateLists(updatedLists);

    const remainingProducts = products.filter(p => p.id !== productId);
    updateProducts(remainingProducts);
  };

  // --- Сортировка ---
  const sortedProducts = [...products].sort((a, b) =>
    sortOrder === "az" ? a.name.localeCompare(b.name) : 0
  );

  const sortedLists = [...lists].sort((a, b) =>
    sortOrder === "az" ? a.name.localeCompare(b.name) : 0
  );

  return (
    <main className={styles.main}>
      <Header />

      {/* Верхнее меню */}
      <div className={styles.savePageButtons}>
        <button
          className={styles.SortButton}
          onClick={() =>
            setSortOrder(prev => (prev === "default" ? "az" : "default"))
          }
        >
          Сортувати за <ChevronDown size={20} className={styles.sortIcon} />
        </button>

        <div className={styles.addCollectionWrapper} ref={menuRef}>
          <button
            className={styles.ingredientsAddButton}
            onClick={() => setShowMenu(prev => !prev)}
          >
            Додати <Plus size={20} />
          </button>

          {showMenu && (
            <div className={styles.menuDropdown}>
              <button className={styles.menuBtn} onClick={handleAddList}>
                ➕ Створити новий список
              </button>

              {lists.length > 0 && (
                <>
                  <button
                    className={styles.menuBtn}
                    onClick={handleDeleteAllLists}
                  >
                    ❌ Видалити всі списки
                  </button>

                  {lists.map(list => (
                    <button
                      key={list.id}
                      className={styles.menuBtn}
                      onClick={() => handleDeleteList(list.id)}
                    >
                      <Trash2 size={16} /> {list.name}
                    </button>
                  ))}
                </>
              )}

              {products.length > 0 && (
                <button
                  className={styles.menuBtn}
                  onClick={handleDeleteAllProducts}
                >
                  ❌ Видалити всі продукти без списку
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <div className={styles.shoppingPageGrid}>

        {/* Списки */}
        <div className={styles.listsColumn}>
          {sortedLists.length === 0 && <p>Поки що немає списків. Створіть новий.</p>}
          {sortedLists.map(list => (
            <div
              key={list.id}
              className={styles.collectionCard}
              onDrop={e => {
                e.preventDefault();
                const productId = e.dataTransfer.getData("text/plain");
                handleDropProduct(productId, list.id);
              }}
              onDragOver={e => e.preventDefault()}
            >
              <h3>{list.name}</h3>
               <p className={styles.listDate}>{list.createdAt}</p>
              {list.items.map(item => (
                <div key={item.id} className={styles.listItem}>
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Продукты */}
        <div className={styles.productsColumn}>
          {sortedProducts.length === 0 && <p>Поки що немає продуктів.</p>}
          {sortedProducts.map(product => (
            <div
              key={product.id}
              className={styles.productCard}
              draggable
              onDragStart={e =>
                e.dataTransfer.setData("text/plain", product.id)
              }
            >  
              <span>{product.name}</span>
              <div className={styles.productAmountBlock}>
              <span>{product.amount ? `${product.amount} ${product.unit}` : ""}</span>
              <button
                className={styles.menuBtn}
                onClick={() => handleDeleteProduct(product.id)}
              >
                <Trash2 size={16} />
              </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default ShoppingListPage;
