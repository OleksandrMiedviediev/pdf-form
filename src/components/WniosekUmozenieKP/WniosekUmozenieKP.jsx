import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { fillPdf } from "../utils/wniosekUmozenieKPHelper.js";
import css from "./WniosekUmozenieKP.module.css";
import ButtonsGroup from "../ui/ButtonsGroup/ButtonsGroup.jsx";

// ✅ Валидатор польских букв
const polishRegex = /^[a-zA-ZąćęłńóśżźĄĆĘŁŃÓŚŻŹ\s-]+$/;

// ✅ Схема валидации Yup с сообщениями на 3 языках
const validationSchema = Yup.object().shape({
  imieNazwisko: Yup.string()
    .matches(polishRegex, "Dozwolone tylko polskie litery / Only Polish letters allowed / Дозволено лише польські літери")
    .required("Wymagane / Required / Обов’язково"),
  dataUrodzenia: Yup.string().required("Wymagane / Required / Обов’язково"),
  ulica: Yup.string()
    .matches(polishRegex, "Dozwolone tylko polskie litery / Only Polish letters allowed / Дозволено лише польські літери")
    .required("Wymagane / Required / Обов’язково"),
  obywatelstwo: Yup.string()
  .matches(polishRegex, "Dozwolone tylko polskie litery / Only Polish letters allowed / Дозволено лише польські літери")
  .required("Wymagane / Required / Обов’язково"),
  nrSprawy: Yup.string().required("Wymagane / Required / Обов’язково"),
  miejscowoscUrzedu: Yup.string()
  .matches(polishRegex, "Dozwolone tylko polskie litery / Only Polish letters allowed / Дозволено лише польські літери")
  .required("Wymagane / Required / Обов’язково"),
  numerUlicy: Yup.string().required("Wymagane / Required / Обов’язково"),
  kodPocztowy: Yup.string().required("Wymagane / Required / Обов’язково"),
  przedmiotUdzielenia: Yup.string().required("Wymagane / Required / Обов’язково"),
  miejscowoscWnioskodawcy: Yup.string()
    .matches(polishRegex, "Dozwolone tylko polskie litery / Only Polish letters allowed / Дозволено лише польські літери")
    .required("Wymagane / Required / Обов’язково"),
});

const defaultValues = {
  imieNazwisko: "",
  dataUrodzenia: "",
  obywatelstwo: "",
  nrSprawy: "",
  miejscowoscUrzedu: "",
  dataWypelnienia: "",
  przedmiotUdzielenia: "",
  ulica: "",
  numerUlicy: "",
  kodPocztowy: "",
  miejscowoscWnioskodawcy: "",
};

export default function WniosekUmorzenieKP() {
  const [savedValues, setSavedValues] = useState(() => {
    const saved = localStorage.getItem("wniosekUmorzenieKP");
    return saved ? { ...defaultValues, ...JSON.parse(saved) } : defaultValues;
  });

  const handleFieldChange = (field, value, setFieldValue) => {
    setFieldValue(field, value);
    const updated = { ...savedValues, [field]: value };
    setSavedValues(updated);
    localStorage.setItem("wniosekUmorzenieKP", JSON.stringify(updated));
  };

  return (
    <div className={css.formWrapper}>
      <h1 className={css.title}>📝 Wniosek o umorzenie / Application for Cancellation / Заява на скасування</h1>

      <Formik
        initialValues={savedValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={(values) => fillPdf(values)}
      >
        {({ values, setFieldValue, resetForm }) => (
          <Form className={css.form}>
            {/* Sekcja Wnioskodawca */}
            <h3 className={css.sectionTitle}>Dane wnioskodawcy / Applicant Data / Дані заявника</h3>
            <FieldBlock
              name="imieNazwisko"
              label="Imię i nazwisko / Full Name / ПІ"
              placeholder="Jan Kowalski / John Smith / Іван Ковальський"
              {...{ values, setFieldValue, handleFieldChange }}
            />
            <FieldBlock
              name="dataUrodzenia"
              type="date"
              label="Data urodzenia / Date of Birth / Дата народження"
              {...{ values, setFieldValue, handleFieldChange }}
            />
            <FieldBlock
              name="obywatelstwo"
              label="Obywatelstwo / Citizenship / Громадянство"
              placeholder="Polska / Poland / Польща"
              {...{ values, setFieldValue, handleFieldChange }}
            />
            <FieldBlock
              name="nrSprawy"
              label="Numer sprawy / Case Number / Номер справи"
              placeholder="SO-VII.1234.12.20"
              {...{ values, setFieldValue, handleFieldChange }}
            />

            {/* Sekcja urząd */}
            <h3 className={css.sectionTitle}>Dane urzędu / Office Data / Дані установи</h3>
            <FieldBlock
              name="miejscowoscUrzedu"
              label="Miejscowość urzędu / City / Місто"
              placeholder="Warszawa / Warsaw / Варшава"
              {...{ values, setFieldValue, handleFieldChange }}
            />
            <FieldBlock
              name="dataWypelnienia"
              type="date"
              label="Data wypełnienia / Date Filled / Дата заповнення"
              {...{ values, setFieldValue, handleFieldChange }}
            />

            {/* Przedmiot udzielenia */}
            <h3 className={css.sectionTitle}>Przedmiot udzielenia / Subject / Предмет</h3>
            <div className={css.single}>
              <Field
                as="select"
                name="przedmiotUdzielenia"
                className={css.select}
                value={values.przedmiotUdzielenia}
                onChange={(e) => setFieldValue("przedmiotUdzielenia", e.target.value)}
              >
                <option value="">-- wybierz / choose / оберіть --</option>
                <option value="zezwolenia na pobyt czasowy">
                  Zezwolenie na pobyt czasowy / Temporary Stay Permit / Дозвіл на тимчасове перебування
                </option>
                <option value="pobyt stały">
                  Pobyt stały / Permanent Stay / Постійне проживання
                </option>
                <option value="pobyt rezydenta długoterminowego UE">
                  Pobyt rezydenta długoterminowego UE / EU Long-Term Resident / Довгострокове перебування в ЄС
                </option>
              </Field>
            </div>


            {/* Adres wnioskodawcy */}
            <h3 className={css.sectionTitle}>Adres do korespondencji / Correspondence Address / Адреса для кореспонденції</h3>
            <FieldBlock
              name="ulica"
              label="Ulica / Street / Вулиця"
              placeholder="Marszałkowska / Main Street / Головна"
              {...{ values, setFieldValue, handleFieldChange }}
            />
            <FieldBlock
              name="numerUlicy"
              label="Numer ulicy / House Number / Номер будинку"
              placeholder="10A"
              {...{ values, setFieldValue, handleFieldChange }}
            />
            <FieldBlock
              name="kodPocztowy"
              label="Kod pocztowy / Postal Code / Поштовий індекс"
              placeholder="00-123"
              {...{ values, setFieldValue, handleFieldChange }}
            />
            <FieldBlock
              name="miejscowoscWnioskodawcy"
              label="Miejscowość / City / Місто"
              placeholder="Warszawa / Warsaw / Варшава"
              {...{ values, setFieldValue, handleFieldChange }}
            />

            {/* Przyciski */}
            <div className={css.buttons}>
            <ButtonsGroup
              resetForm={resetForm}
              setSavedValues={setSavedValues}
              localStorageKey="wniosekUmorzenieKP"
            />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

// 🔸 Компонент для обычных полей с кнопкой очистки
function FieldBlock({ name, label, values, setFieldValue, handleFieldChange, type = "text", placeholder }) {
  return (
    <div className={css.fieldWrapper}>
      <label htmlFor={name}>{label}</label>
      <div className={css.inputContainer}>
        <Field
          id={name}
          name={name}
          type={type}
          className={css.input}
          value={values[name] || ""}
          onChange={(e) => handleFieldChange(name, e.target.value, setFieldValue)}
          placeholder={placeholder}
        />
        {values[name] && (
          <button
            type="button"
            className={css.clearBtn}
            onClick={() => handleFieldChange(name, "", setFieldValue)}
          >
            <AiOutlineCloseCircle />
          </button>
        )}
      </div>
      <ErrorMessage name={name} component="div" className={css.error} />
    </div>
  );
}
