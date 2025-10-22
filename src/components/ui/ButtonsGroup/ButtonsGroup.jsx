import React from "react";
import css from "./ButtonsGroup.module.css";
import { useTranslation } from "react-i18next";

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
const {t} = useTranslation('buttonsGroup')
  return (
    <div className={css.buttons}>
      <button type="submit" className={css.buttonMain}>
        📄 {t('buttonMain')}
      </button>
      <button type="button" className={css.buttonClear} onClick={handleClear}>
        🧹 {t('buttonClear')}
      </button>
    </div>
  );
}
