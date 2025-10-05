import React, { useState, useEffect } from "react";
import { fillPdf } from "../utils/meldunekPdfHelper.js";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { AiOutlineCloseCircle } from "react-icons/ai";
import css from "./MeldunekForm.module.css";
import InfoMeldunek from "../InfoMeldunek/InfoMeldunek.jsx";

// 🔹 Валидатор польских букв
const polishRegex = /^[a-zA-ZąćęłńóśżźĄĆĘŁŃÓŚŻŹ\s-]+$/;

// 🔹 Схема валидации Yup
const MeldunekSchema = Yup.object().shape({
    nazwisko: Yup.string()
      .matches(polishRegex, "Dozwolone tylko polskie litery / Only Polish letters / Лише польські літери")
      .min(2, "Za krótkie / Too short / Забагато коротке")
      .max(50, "Za długie / Too long / Забагато довге")
      .required("Wymagane / Required / Обов'язково"),
    imie: Yup.string()
      .matches(polishRegex, "Dozwolone tylko polskie litery / Only Polish letters / Лише польські літери")
      .min(2, "Za krótkie / Too short / Забагато коротке")
      .max(50, "Za długie / Too long / Забагато довге")
      .required("Wymagane / Required / Обов'язково"),
    pesel: Yup.string()
      .matches(/^[0-9]+$/, "Tylko cyfry / Only digits / Лише цифри")
      .length(11, "PESEL musi mieć 11 cyfr / PESEL must have 11 digits / PESEL має містити 11 цифр")
      .required("Wymagane / Required / Обов'язково"),
    krajUrodzenia: Yup.string()
      .matches(polishRegex, "Dozwolone tylko polskie litery / Only Polish letters / Лише польські літери")
      .required("Wymagane / Required / Обов'язково"),
    dataUrodzenia: Yup.date()
      .required("Wymagane / Required / Обов'язково"),
    miejsceUrodzenia: Yup.string()
      .matches(polishRegex, "Dozwolone tylko polskie litery / Only Polish letters / Лише польські літери")
      .required("Wymagane / Required / Обов'язково"),
    krajMiejscaZamieszkania: Yup.string()
      .matches(polishRegex, "Dozwolone tylko polskie litery / Only Polish letters / Лише польські літери")
      .required("Wymagane / Required / Обов'язково"),
    telefon: Yup.string()
      .matches(/^[0-9]+$/, "Tylko cyfry / Only digits / Лише цифри")
      .min(9, "Za krótki / Too short / Забагато короткий")
      .required("Wymagane / Required / Обов'язково"),
    email: Yup.string()
      .email("Niepoprawny email / Invalid email / Невірний email")
      .required("Wymagane / Required / Обов'язково"),
    ulica: Yup.string()
      .matches(polishRegex, "Dozwolone tylko polskie litery / Only Polish letters / Лише польські літери")
      .required("Wymagane / Required / Обов'язково"),
    numerDomu: Yup.string()
      .matches(/^[0-9]+$/, "Tylko cyfry / Only digits / Лише цифри")
      .required("Wymagane / Required / Обов'язково"),
    numerLokalu: Yup.string()
      .matches(/^[0-9]*$/, "Tylko cyfry / Only digits / Лише цифри"),
    kodPocztowy: Yup.string()
      .matches(/^[0-9]{2}-[0-9]{3}$/, "Format: 00-000 / Format: 00-000 / Формат: 00-000")
      .required("Wymagane / Required / Обов'язково"),
    miejscowoscDzielnica: Yup.string()
      .matches(polishRegex, "Dozwolone tylko polskie litery / Only Polish letters / Лише польські літери")
      .required("Wymagane / Required / Обов'язково"),
    gmina: Yup.string()
      .matches(polishRegex, "Dozwolone tylko polskie litery / Only Polish letters / Лише польські літери")
      .required("Wymagane / Required / Обов'язково"),
    wojewodztwo: Yup.string()
      .matches(polishRegex, "Dozwolone tylko polskie litery / Only Polish letters / Лише польські літери")
      .required("Wymagane / Required / Обов'язково"),
    dataPoczatkowa: Yup.date()
      .required("Wymagane / Required / Обов'язково"),
    dataKoncowa: Yup.date()
      .required("Wymagane / Required / Обов'язково"),
  });
  

// 🔹 Поля формы с label и placeholder
const fields = [
  { name: "nazwisko", label: "Nazwisko / Surname / Прізвище", placeholder: "Doe" },
  { name: "imie", label: "Imię / Name / Імʼя", placeholder: "John" },
  { name: "pesel", label: "PESEL", placeholder: "12345678901" },
  { name: "krajUrodzenia", label: "Kraj urodzenia / Country of birth / Країна народження", placeholder: "Polska" },
  { name: "dataUrodzenia", label: "Data urodzenia / Date of birth / Дата народження", placeholder: "YYYY-MM-DD", type: "date" },
  { name: "miejsceUrodzenia", label: "Miejsce urodzenia / Place of birth / Місто народження", placeholder: "Warszawa" },
  { name: "krajMiejscaZamieszkania", label: "Kraj miejsca zamieszkania / Country of residence / Країна проживання", placeholder: "Polska" },
  { name: "telefon", label: "Telefon / Phone / Телефон", placeholder: "600123456" },
  { name: "email", label: "Email / Email / Електронна пошта", placeholder: "jan@example.com" },
  { name: "ulica", label: "Ulica / Street / Вулиця", placeholder: "Marszałkowska" },
  { name: "numerDomu", label: "Numer domu / House number / Номер будинку", placeholder: "10" },
  { name: "numerLokalu", label: "Numer lokalu / Apartment number / Номер квартири", placeholder: "5" },
  { name: "kodPocztowy", label: "Kod pocztowy / Postal code / Поштовий індекс", placeholder: "00-001" },
  { name: "miejscowoscDzielnica", label: "Miejscowość / City / Місто", placeholder: "Warszawa" },
  { name: "gmina", label: "Gmina / Municipality / Гміна", placeholder: "Śródmieście" },
  { name: "wojewodztwo", label: "Województwo / Province / Область", placeholder: "Mazowieckie" },
  { name: "dataPoczatkowa", label: "Data początkowa / Start date / Дата початку", placeholder: "YYYY-MM-DD", type: "date" },
  { name: "dataKoncowa", label: "Data końcowa / End date / Дата закінчення", placeholder: "YYYY-MM-DD", type: "date" },
];

export default function MeldunekForm() {
  // 🔹 Инициализация состояния с localStorage или пустыми значениями
  const [savedValues, setSavedValues] = useState(() => {
    const saved = localStorage.getItem("formData");
    return saved ? JSON.parse(saved) : fields.reduce((acc, f) => ({ ...acc, [f.name]: "" }), {});
  });

  // 🔹 Обновление localStorage при изменении любого поля
  const handleFieldChange = (field, value, setFieldValue) => {
    setFieldValue(field, value);
    const newValues = { ...savedValues, [field]: value };
    setSavedValues(newValues);
    localStorage.setItem("formData", JSON.stringify(newValues));
  };

  return (
    <div className={css.formBox}>
        <h2>Zgłoszenie pobytu czasowego / Temporary residence registration / Заявка на тимчасове проживання</h2>
        <div className={css.infoText}>
            <p>
                Jeśli mieszkasz w Polsce – zamelduj się na pobyt stały lub czasowy (czyli powyżej 3 miesięcy). 
                Nie musisz się meldować, jeśli wiesz, że twój pobyt w Polsce nie będzie trwał dłużej niż 30 dni – 
                na przykład, gdy spędzasz w Polsce urlop.
            </p>
            <p>
                If you live in Poland – register for permanent or temporary residence (i.e., over 3 months). 
                You do not need to register if your stay in Poland will not exceed 30 days – for example, when you are on vacation in Poland.
            </p>
            <p>
                Якщо ви живете в Польщі – зареєструйтеся для постійного або тимчасового проживання (тобто понад 3 місяці). 
                Реєструватися не потрібно, якщо ваше перебування в Польщі не триватиме більше 30 днів – наприклад, коли ви проводите відпустку в Польщі.
            </p>
        </div>


      <Formik
        initialValues={savedValues}
        validationSchema={MeldunekSchema}
        enableReinitialize
        onSubmit={(values) => fillPdf(values)}
      >
        {({ values, setFieldValue, resetForm }) => (
          <Form>
            <div className={css.formGrid}>
              {fields.map((field) => (
                <div key={field.name} className={css.fieldWrapper}>
                  <label htmlFor={field.name} className={css.label}>
                    {field.label}
                  </label>

                  <div className={css.inputContainer}>
                    <Field
                      id={field.name}
                      name={field.name}
                      type={field.type || "text"}
                      placeholder={field.placeholder}
                      className={css.field}
                      value={values[field.name] || ""}
                      onChange={(e) =>
                        handleFieldChange(field.name, e.target.value, setFieldValue)
                      }
                    />
                    {values[field.name] && (
                      <button
                        type="button"
                        className={css.clearBtn}
                        onClick={() => handleFieldChange(field.name, "", setFieldValue)}
                      >
                        <AiOutlineCloseCircle />
                      </button>
                    )}
                  </div>

                  <ErrorMessage
                    name={field.name}
                    component="div"
                    className={css.errorMessage}
                  />
                </div>
              ))}
            </div>

            <div className={css.buttons}>
              <button type="submit">📄 Pobierz PDF</button>
              <button
                type="button"
                className={css.btn}
                onClick={() => {
                  resetForm();
                  const emptyValues = fields.reduce((acc, f) => ({ ...acc, [f.name]: "" }), {});
                  setSavedValues(emptyValues);
                  localStorage.removeItem("formData");
                }}
              >
                🧹 Wyczyść
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <InfoMeldunek />
    </div>
    
  );
  
}
