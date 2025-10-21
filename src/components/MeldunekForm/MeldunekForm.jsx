import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { fillPdf } from "../utils/meldunekPdfHelper.js";
import InfoMeldunek from "../InfoMeldunek/InfoMeldunek.jsx";
import Input from "../ui/Input/Input.jsx";
import css from "./MeldunekForm.module.css";
import ButtonsGroup from "../ui/ButtonsGroup/ButtonsGroup.jsx";

const polishRegex = /^[a-zA-ZąćęłńóśżźĄĆĘŁŃÓŚŻŹ\s-]+$/;

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
  dataUrodzenia: Yup.date().required("Wymagane / Required / Обов'язково"),
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
  numerLokalu: Yup.string().matches(/^[0-9]*$/, "Tylko cyfry / Only digits / Лише цифри"),
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
  dataPoczatkowa: Yup.date().required("Wymagane / Required / Обов'язково"),
  dataKoncowa: Yup.date().required("Wymagane / Required / Обов'язково"),
});

const fields = [
  { name: "nazwisko", label: "Nazwisko / Surname / Прізвище", placeholder: "Kowalski", autoComplete: "family-name" },
  { name: "imie", label: "Imię / Name / Імʼя", placeholder: "Jan", autoComplete: "given-name" },
  { name: "pesel", label: "PESEL", placeholder: "12345678901", autoComplete: "off" },
  { name: "krajUrodzenia", label: "Kraj urodzenia / Country of birth / Країна народження", placeholder: "Polska", autoComplete: "country-name" },
  { name: "dataUrodzenia", label: "Data urodzenia / Date of birth / Дата народження", type: "date", autoComplete: "off" },
  { name: "miejsceUrodzenia", label: "Miejsce urodzenia / Place of birth / Місто народження", placeholder: "Warszawa", autoComplete: "address-level2" },
  { name: "krajMiejscaZamieszkania", label: "Kraj miejsca zamieszkania / Country of residence / Країна проживання", placeholder: "Polska", autoComplete: "country-name" },
  { name: "telefon", label: "Telefon / Phone / Телефон", placeholder: "600123456", autoComplete: "tel" },
  { name: "email", label: "Email / Електронна пошта", placeholder: "jan@example.com", autoComplete: "email" },
  { name: "ulica", label: "Ulica / Street / Вулиця", placeholder: "Marszałkowska", autoComplete: "street-address" },
  { name: "numerDomu", label: "Numer domu / House number / Номер будинку", placeholder: "10", autoComplete: "off" },
  { name: "numerLokalu", label: "Numer lokalu / Apartment number / Номер квартири", placeholder: "5", autoComplete: "off" },
  { name: "kodPocztowy", label: "Kod pocztowy / Postal code / Поштовий індекс", placeholder: "00-001", autoComplete: "postal-code" },
  { name: "miejscowoscDzielnica", label: "Miejscowość / City / Місто", placeholder: "Warszawa", autoComplete: "address-level2" },
  { name: "gmina", label: "Gmina / Municipality / Гміна", placeholder: "Śródmieście", autoComplete: "off" },
  { name: "wojewodztwo", label: "Województwo / Province / Область", placeholder: "Mazowieckie", autoComplete: "address-level1" },
  { name: "dataPoczatkowa", label: "Data początkowa / Start date / Дата початку", type: "date", autoComplete: "off" },
  { name: "dataKoncowa", label: "Data końcowa / End date / Дата закінчення", type: "date", autoComplete: "off" },
];

export default function MeldunekForm() {
  const [savedValues, setSavedValues] = useState(() => {
    const saved = localStorage.getItem("meldunekForm");
    return saved ? JSON.parse(saved) : fields.reduce((a, f) => ({ ...a, [f.name]: "" }), {});
  });

  const handleChange = (name, value) => {
    const updated = { ...savedValues, [name]: value };
    setSavedValues(updated);
    localStorage.setItem("meldunekForm", JSON.stringify(updated));
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
        {({ values, resetForm, setFieldValue }) => (
          <Form>
            {fields.map((f) => (
              <Input
                key={f.name}
                name={f.name}
                label={f.label}
                placeholder={f.placeholder}
                type={f.type || "text"}
                autoComplete={f.autoComplete}
                value={values[f.name]}
                onChange={(e) => {
                  handleChange(f.name, e.target.value);
                  setFieldValue(f.name, e.target.value);
                }}
              />
            ))}

            <div className={css.buttons}>
            <ButtonsGroup
              resetForm={resetForm}
              setSavedValues={setSavedValues}
              localStorageKey="meldunekForm"
              fields={fields}
            />
            </div>
          </Form>
        )}
      </Formik>

      <InfoMeldunek />
    </div>
  );
}
