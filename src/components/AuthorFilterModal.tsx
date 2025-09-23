// src/components/AuthorFilterModal.tsx
import React, { useState, useRef, useEffect } from "react";
import styles from "../components/AuthorFilterModal.module.scss";
import { X } from "lucide-react";
import { ChevronDown } from "lucide-react";

interface AuthorFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: {
    cuisines?: string[];
    specialization?: string[];
  }) => void;
  availableCuisines: string[];
  availableSpecializations?: string[];
}

const AuthorFilterModal: React.FC<AuthorFilterModalProps> = ({
  isOpen,
  onClose,
  onApply,
  availableCuisines,
  availableSpecializations = [
    "Шеф-кухар",
    "Веган-шеф",
    "Кондитер",
    "Фітнес-нутриціолог",
    "Домашній кулінар",
    "Експерт з напоїв"
  ],
}) => {
  const [cuisines, setCuisines] = useState<string[]>([]);
  const [specialization, setSpecialization] = useState<string[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleCuisine = (c: string) =>
    setCuisines(prev => (prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]));

  const toggleSpecialization = (s: string) =>
    setSpecialization(prev => (prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]));

  const resetFilters = () => {
    setCuisines([]);
    setSpecialization([]);
  };

    const toggleAll = () => {
    if (cuisines.length === availableCuisines.length) {
      setCuisines([]);
    } else {
      setCuisines([...availableCuisines]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.headerTitle}>Фільтр</h2>
          <button className={styles.headerButton} onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        
        <div className={styles.content}>
          {/* Кухня */}
          <div className={styles.cuisineFilter} ref={dropdownRef}>
            <label>Кухня</label>
            {cuisines.length > 0 && (
              <div className={styles.cuisineTags}>
                {cuisines.map(c => (
                  <span key={c} className={styles.cuisineTag}>
                    {c}
                    <button
                      className={styles.removeTag}
                      onClick={() => setCuisines(cuisines.filter(x => x !== c))}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
            <div className={styles.inputWrapper} onClick={() => setDropdownOpen(!dropdownOpen)}>
            <input
              readOnly
              value=""
              placeholder="Оберіть кухню"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />
            <ChevronDown size={20} className={styles.chevronIcon} />
            </div>
            {dropdownOpen && (
              <div className={styles.cuisineDropdown}>
                <div className={styles.cuisineOptions}>
                        <label>
                     <input
                       type="checkbox"
                     checked={cuisines.length === availableCuisines.length}
                      onChange={toggleAll}
                         />
                      Всі
                  </label>
                  {availableCuisines.map(c => (
                    <label key={c}>
                      <input
                        type="checkbox"
                        checked={cuisines.includes(c)}
                        onChange={() => toggleCuisine(c)}
                      />
                      {c}
                    </label>
                  ))}
                </div>
                <div className={styles.dropdownActions}>
                  <button onClick={resetFilters}>Скинути</button>
                  <button onClick={() => setDropdownOpen(false)}>Застосувати</button>
                </div>
              </div>
            )}
          </div>

          {/* Спеціалізація */}
          <label>За спеціалізацією</label>
          <div className={styles.specializationButtons}>
            {availableSpecializations.map(s => (
              <button
                key={s}
                type="button"
                className={`${styles.categoryButton} ${specialization.includes(s) ? styles.active : ""}`}
                onClick={() => toggleSpecialization(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.actions}>
          <button className={styles.resetButton} onClick={resetFilters}>
            Очистити фільтр
          </button>
          <button
            className={`${styles.applyButton} ${!cuisines.length && !specialization.length ? styles.disabled : ""}`}
            disabled={!cuisines.length && !specialization.length}
            onClick={() => onApply({ cuisines, specialization })}
          >
            Застосувати
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthorFilterModal;
