import React from "react";
import css from "./ButtonsGroup.module.css";

export default function ButtonsGroup({ resetForm, setSavedValues, localStorageKey, fields }) {
  const handleClear = () => {
    resetForm();
    if (setSavedValues && fields) {
      const cleared = fields.reduce((acc, f) => ({ ...acc, [f.name]: "" }), {});
      setSavedValues(cleared);
    } else if (setSavedValues) {
      setSavedValues({});
    }
    if (localStorageKey) {
      localStorage.removeItem(localStorageKey);
    }
  };

  return (
    <div className={css.buttons}>
      <button type="submit" className={css.buttonMain}>
        📄 Pobierz PDF / Download PDF / Завантажити PDF
      </button>
      <button type="button" className={css.buttonClear} onClick={handleClear}>
        🧹 Wyczyść / Clear / Очистити
      </button>
    </div>
  );
}
