import React, {useState, useEffect } from "react";
import { fillPdf } from "../utils/pdfHelper.js";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { AiOutlineCloseCircle } from "react-icons/ai";
import css from "./MeldunekForm.module.css";

// 🔹 Валидатор польских букв
const polishRegex = /^[a-zA-ZąćęłńóśżźĄĆĘŁŃÓŚŻŹ\s-]+$/;

// 🔹 Схема валидации Yup
const MeldunekSchema = Yup.object().shape({
  nazwisko: Yup.string()
    .matches(polishRegex, "Dozwolone tylko polskie litery")
    .min(2, "Za krótkie!")
    .max(50, "Za długie!")
    .required("Wymagane!"),
  imie: Yup.string()
    .matches(polishRegex, "Dozwolone tylko polskie litery")
    .min(2, "Za krótkie!")
    .max(50, "Za długie!")
    .required("Wymagane!"),
  pesel: Yup.string()
    .matches(/^[0-9]+$/, "Tylko cyfry")
    .length(11, "PESEL musi mieć 11 cyfr")
    .required("Wymagane!"),
  krajUrodzenia: Yup.string()
    .matches(polishRegex, "Dozwolone tylko polskie litery")
    .required("Wymagane!"),
  dataUrodzenia: Yup.date().required("Wymagane!"),
  miejsceUrodzenia: Yup.string()
    .matches(polishRegex, "Dozwolone tylko polskie litery")
    .required("Wymagane!"),
  krajMiejscaZamieszkania: Yup.string()
    .matches(polishRegex, "Dozwolone tylko polskie litery")
    .required("Wymagane!"),
  telefon: Yup.string()
    .matches(/^[0-9]+$/, "Tylko cyfry")
    .min(9, "Za krótki!")
    .required("Wymagane!"),
  email: Yup.string().email("Niepoprawny email").required("Wymagane!"),
  ulica: Yup.string()
    .matches(polishRegex, "Dozwolone tylko polskie litery")
    .required("Wymagane!"),
  numerDomu: Yup.string()
    .matches(/^[0-9]+$/, "Tylko cyfry")
    .required("Wymagane!"),
  numerLokalu: Yup.string().matches(/^[0-9]*$/, "Tylko cyfry"),
  kodPocztowy: Yup.string()
    .matches(/^[0-9]{2}-[0-9]{3}$/, "Format: 00-000")
    .required("Wymagane!"),
  miejscowoscDzielnica: Yup.string()
    .matches(polishRegex, "Dozwolone tylko polskie litery")
    .required("Wymagane!"),
  gmina: Yup.string()
    .matches(polishRegex, "Dozwolone tylko polskie litery")
    .required("Wymagane!"),
  wojewodztwo: Yup.string()
    .matches(polishRegex, "Dozwolone tylko polskie litery")
    .required("Wymagane!"),
  dataPoczatkowa: Yup.date().required("Wymagane!"),
  dataKoncowa: Yup.date().required("Wymagane!"),
});

// 🔹 Поля формы
const fields = [
  { name: "nazwisko", placeholder: "Nazwisko" },
  { name: "imie", placeholder: "Imię" },
  { name: "pesel", placeholder: "PESEL" },
  { name: "krajUrodzenia", placeholder: "Kraj urodzenia" },
  { name: "dataUrodzenia", placeholder: "Data urodzenia", type: "date" },
  { name: "miejsceUrodzenia", placeholder: "Miejsce urodzenia" },
  { name: "krajMiejscaZamieszkania", placeholder: "Kraj miejsca zamieszkania" },
  { name: "telefon", placeholder: "Telefon" },
  { name: "email", placeholder: "Email" },
  { name: "ulica", placeholder: "Ulica" },
  { name: "numerDomu", placeholder: "Numer domu" },
  { name: "numerLokalu", placeholder: "Numer lokalu" },
  { name: "kodPocztowy", placeholder: "Kod pocztowy" },
  { name: "miejscowoscDzielnica", placeholder: "Miejscowość" },
  { name: "gmina", placeholder: "Gmina" },
  { name: "wojewodztwo", placeholder: "Województwo" },
  { name: "dataPoczatkowa", placeholder: "Data początkowa", type: "date" },
  { name: "dataKoncowa", placeholder: "Data końcowa", type: "date" },
];

// 🔹 Начальные значения
const initialValues = fields.reduce((acc, f) => ({ ...acc, [f.name]: "" }), {});

export default function MeldunekForm() {
    const [savedValues, setSavedValues] = useState(null);
  useEffect(() => {
    const saved = localStorage.getItem("formData");
    if (saved) {
      Object.assign(initialValues, JSON.parse(saved));
    }
  }, []);
  const initialValues = savedValues || fields.reduce((acc, f) => ({ ...acc, [f.name]: "" }), {});

  return (
      <div className={css.formBox}>
        <h2>Zgłoszenie pobytu czasowego</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={MeldunekSchema}
          enableReinitialize
          onSubmit={(values) => {
            fillPdf(values);
            localStorage.setItem("formData", JSON.stringify(values));
          }}
        >
          {({ values, setFieldValue, resetForm }) => (
            <Form>
              <div className={css.formGrid}>
              {fields.map((field) => (
                <div key={field.name} className={css.fieldWrapper}>
                    <label htmlFor={field.name} className={css.label}>
                    {field.placeholder}
                    </label>

                    <div className={css.inputContainer}>
                    <Field
                        id={field.name}       
                        name={field.name}
                        placeholder={field.placeholder}
                        type={field.type || "text"}
                        className={css.field}
                    />
                    {values[field.name] && (
                        <button
                        type="button"
                        className={css.clearBtn}
                        onClick={() => setFieldValue(field.name, "")}
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
                    localStorage.removeItem("formData");
                    setSavedValues(null);
                  }}
                >
                  🧹 Wyczyść formularz
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
  );
}
