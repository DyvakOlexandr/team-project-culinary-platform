import React, { useState} from "react";
import styles from "./CreateListModal.module.scss";
import { X } from "lucide-react";

interface CreateListModalProps {
  onClose: () => void;
  onCreate: (name: string, description: string, color: string) => void;
  onEdit?: (updated: { id: string; name: string; description: string; color: string }) => void;
  initialData?: { id: string; name: string; description?: string; color?: string };
  initialName?: string;
  initialDescription?: string;
  initialColor?: string;
}

const colors = [
  "rgba(255, 70, 70, 1)",
  "rgba(254, 135, 0, 1)",
  "rgba(255, 187, 7, 1)",
  "rgba(1, 87, 155, 1)",
  "rgba(112, 40, 255, 1)",
  "rgba(51, 40, 255, 1)",
  "rgba(2, 136, 209, 1)",
  "rgba(34, 119, 40, 1)",
  "rgba(69, 186, 75, 1)",
  "rgba(0, 194, 168, 1)",
  "rgba(255, 79, 163, 1)",
];

const CreateListModal: React.FC<CreateListModalProps> = ({
  onClose,
  onCreate,
  onEdit,
  initialData,
}) => {
  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [selectedColor, setSelectedColor] = useState(
    initialData?.color || colors[0]
  );

  const isEditMode = Boolean(initialData);

  const handleSubmit = () => {
    if (!name.trim()) return alert("Введіть назву списку!");

    if (isEditMode && onEdit && initialData) {
      onEdit({
        id: initialData.id,
        name,
        description,
        color: selectedColor,
      });
    } else {
      onCreate(name, description, selectedColor);
    }

    onClose();
  };

  

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>{isEditMode ? "Редагувати список" : "Новий список"}</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className={styles.body}>
          <div className={styles.inputGroup}>
            <label htmlFor="listName">Назва</label>
            <input
              id="listName"
              type="text"
              placeholder="Наприклад: «Покупки на тиждень»"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="listDescription">Опис</label>
            <input
              id="listDescription"
              type="text"
              placeholder="Наприклад: «Продукти для вечері з друзями»"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className={styles.colorsBlock}>
            <label>Колір списку</label>
            <div className={styles.colors}>
              {colors.map((color) => (
                <div
                  key={color}
                  className={`${styles.colorCircle} ${
                    selectedColor === color ? styles.active : ""
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                ></div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <button className={styles.cancelBtn} onClick={onClose}>
            Скасувати
          </button>
          <button
            className={styles.createBtn}
            onClick={handleSubmit}
            disabled={!name.trim()}
          >
            {isEditMode ? "Зберегти" : "Створити список"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateListModal;
