import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useField } from "formik";
import css from "./Input.module.css";

export default function Input({
  label,
  name,
  type = "text",
  placeholder,
  autoComplete,
  clearable = true,
  options = [],
  ...props
}) {
  const inputId = `input-${name}`;
  const [field, meta, helpers] = useField(name);

  if (type === "radio") {
    return (
      <div className={css.fieldWrapper}>
        {label && <label className={css.label}>{label}</label>}
        <div className={css.radioGroup}>
          {options.map((opt) => (
            <label key={opt.value}>
              <input
                type="radio"
                {...field}
                value={opt.value}
                checked={field.value === opt.value}
                onChange={() => helpers.setValue(opt.value)}
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
        {meta.touched && meta.error && (
          <div className={css.errorMessage}>{meta.error}</div>
        )}
      </div>
    );
  }

  return (
    <div className={css.fieldWrapper}>
      {label && (
        <label htmlFor={inputId} className={css.label}>
          {label}
        </label>
      )}
      <div className={css.inputContainer}>
        <input
          id={inputId}
          {...field}
          {...props}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete || "off"}
          className={`${css.field} ${meta.touched && meta.error ? css.errorInput : ""}`}
        />
        {clearable && field.value && type !== "radio" && type !== "checkbox" && (
          <button
            type="button"
            className={css.clearBtn}
            onClick={() => helpers.setValue("")}
          >
            <AiOutlineCloseCircle />
          </button>
        )}
      </div>
      {meta.touched && meta.error && (
        <div className={css.errorMessage}>{meta.error}</div>
      )}
    </div>
  );
}
