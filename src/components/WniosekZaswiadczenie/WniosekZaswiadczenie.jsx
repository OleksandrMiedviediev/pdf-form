import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { fillPdf } from "../utils/wniosekZaswiadczenieHelper.js";
import css from "./WniosekZaswiadczenie.module.css";
import ButtonsGroup from "../ui/ButtonsGroup/ButtonsGroup.jsx";
import { useTranslation } from "react-i18next";

// 🟦 Валидатор для польских букв
const polishRegex = /^[a-zA-ZąćęłńóśżźĄĆĘŁŃÓŚŻŹ\s-]+$/;

const defaultValues = {
  miejscowosc: "",
  date: "",
  imieNazwisko: "",
  kodPocztowy: "",
  ulicaNumerMieszkania1: "",
  ulicaNumerMieszkania2: "",
  miastoZamieszkania: "",
  reprezentowanyPrzez1: "",
  reprezentowanyPrzez2: "",
  urzad: "",
  imieNazwiskoWnioskodawcy: "",
  numerPaszportu: "",
  przedmiotUdzielenia: "",
  ulica: "",
  numerUlicy: "",
  miasto: "",
};

export default function WniosekZaswiadczenie() {
  const [savedValues, setSavedValues] = useState(() => {
    const saved = localStorage.getItem("wniosekZaswiadczenie");
    return saved ? { ...defaultValues, ...JSON.parse(saved) } : defaultValues;
  });

  const { t } = useTranslation("wniosekZaswiadczenie");

  // ✅ Схема валидации Yup с сообщениями на 3 языках
const validationSchema = Yup.object().shape({
  miejscowosc: Yup.string()
    .matches(polishRegex, t('zaswiadczenieSchema.polishRegex'))
    .required(t('zaswiadczenieSchema.required')),
  date: Yup.date().max(new Date(),t('zaswiadczenieSchema.date')).required(t('zaswiadczenieSchema.required')),
  imieNazwisko: Yup.string()
    .matches(polishRegex, t('zaswiadczenieSchema.polishRegex'))
    .required(t('zaswiadczenieSchema.required')),
  ulicaNumerMieszkania1: Yup.string()
  .required(t('zaswiadczenieSchema.required')),
  ulicaNumerMieszkania2: Yup.string(),
  miastoZamieszkania: Yup.string().matches(polishRegex, t('zaswiadczenieSchema.polishRegex'))
  .required(t('zaswiadczenieSchema.required')),
  reprezentowanyPrzez1: Yup.string()
  .matches(polishRegex, t('zaswiadczenieSchema.polishRegex'))
  .required(t('zaswiadczenieSchema.required')),
  reprezentowanyPrzez2: Yup.string().matches(polishRegex, t('zaswiadczenieSchema.polishRegex')),
  kodPocztowy: Yup.string()
  .matches(/^[0-9]{2}-[0-9]{3}$/, t('zaswiadczenieSchema.kodPocztowy'))
  .required(t('zaswiadczenieSchema.required')),
  urzad: Yup.string().required(t('zaswiadczenieSchema.required')),
  imieNazwiskoWnioskodawcy: Yup.string()
    .matches(polishRegex, t('zaswiadczenieSchema.polishRegex'))
    .required(t('zaswiadczenieSchema.required')),
  numerPaszportu: Yup.string()
    .required(t('zaswiadczenieSchema.required')),
  przedmiotUdzielenia: Yup.string()
    .required(t('zaswiadczenieSchema.required')),
  ulica: Yup.string()
    .matches(polishRegex, t('zaswiadczenieSchema.polishRegex'))
    .required(t('zaswiadczenieSchema.required')),
  numerUlicy: Yup.string()
    .required(t('zaswiadczenieSchema.required')),
  miasto: Yup.string()
    .matches(polishRegex, t('zaswiadczenieSchema.polishRegex'))
    .required(t('zaswiadczenieSchema.required')),
});

  const handleFieldChange = (field, value, setFieldValue) => {
    setFieldValue(field, value);
    const updated = { ...savedValues, [field]: value };
    setSavedValues(updated);
    localStorage.setItem("wniosekZaswiadczenie", JSON.stringify(updated));
  };

  return (
    <div className={css.formWrapper}>
      <h1 className={css.title}>📝 {t("title")}</h1>

      <Formik
        initialValues={savedValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={(values) => fillPdf(values)}
      >
        {({ values, setFieldValue, resetForm }) => (
          <Form className={css.form}>
            {/* Sekcja Wnioskodawca */}
            <h3 className={css.sectionTitle}>{t("sections.applicant")}</h3>
            <FieldBlock
              name="miejscowosc"
              label={t("labels.miejscowosc")}
              placeholder="np. Warszawa"
              {...{ values, setFieldValue, handleFieldChange }}
            />
            <FieldBlock
              name="date"
              type="date"
              label={t("labels.data")}
              {...{ values, setFieldValue, handleFieldChange }}
            />
            <FieldBlock
              name="imieNazwisko"
              label={t("labels.imieNazwisko")}
              placeholder="Jan Kowalski"
              {...{ values, setFieldValue, handleFieldChange }}
            />
            <FieldBlock
              name="kodPocztowy"
              label={t("labels.kodPocztowy")}
              placeholder="00-001"
              {...{ values, setFieldValue, handleFieldChange }}
            />
            <FieldBlock
              name="ulicaNumerMieszkania1"
              label={t("labels.ulicaNumerMieszkania1")}
              placeholder="Marszałkowska 10A/5"
              {...{ values, setFieldValue, handleFieldChange }}
            />
            <FieldBlock
              name="ulicaNumerMieszkania2"
              label={t("labels.ulicaNumerMieszkania2")}
              placeholder="np. druga linia adresu"
              {...{ values, setFieldValue, handleFieldChange }}
            />
            <FieldBlock
              name="miastoZamieszkania"
              label={t("labels.miastoZamieszkania")}
              placeholder="Warszawa"
              {...{ values, setFieldValue, handleFieldChange }}
            />
            <FieldBlock
              name="reprezentowanyPrzez1"
              label={t("labels.reprezentowanyPrzez1")}
              placeholder="Imię i nazwisko pełnomocnika"
              {...{ values, setFieldValue, handleFieldChange }}
            />
            <FieldBlock
              name="reprezentowanyPrzez2"
              label={t("labels.reprezentowanyPrzez2")}
              placeholder="Dane kontaktowe pełnomocnika"
              {...{ values, setFieldValue, handleFieldChange }}
            />

            {/* Sekcja Urząd */}
            <h3 className={css.sectionTitle}>{t("sections.office")}</h3>
            <div className={css.single}>
              <Field
                as="select"
                name="urzad"
                className={css.select}
                value={values.urzad}
                onChange={(e) => handleFieldChange("urzad", e.target.value, setFieldValue)}
              >
                <option value="">{t("options.default")}</option>
                <option value="Dolnośląski Urząd Wojewódzki Wydział Spraw Obywatelskich i Cudzoziemców">
                  Dolnośląski Urząd Wojewódzki
                </option>
                <option value="Kujawsko-Pomorski Urząd Wojewódzki Wydział Spraw Obywatelskich i Cudzoziemców">
                  Kujawsko-Pomorski Urząd Wojewódzki
                </option>
                <option value="Lubelski Urząd Wojewódzki w Lublinie Wydział Spraw Obywatelskich i Cudzoziemców">
                  Lubelski Urząd Wojewódzki
                </option>
                <option value="Lubuski Urząd Wojewódzki w Gorzowie Wielkopolskim Wydział Spraw Obywatelskich i Cudzoziemców">
                  Lubuski Urząd Wojewódzki
                </option>
                <option value="Łódzki Urząd Wojewódzki w Łodzi Wydział Spraw Cudzoziemców">
                  Łódzki Urząd Wojewódzki
                </option>
                <option value="Małopolski Urząd Wojewódzki w Krakowie Wydział Spraw Cudzoziemców">
                  Małopolski Urząd Wojewódzki
                </option>
                <option value="Mazowiecki Urząd Wojewódzki w Warszawie Wydział Spraw Cudzoziemców">
                  Mazowiecki Urząd Wojewódzki
                </option>
                <option value="Opolski Urząd Wojewódzki w Opolu Wydział Spraw Obywatelskich i Cudzoziemców">
                  Opolski Urząd Wojewódzki
                </option>
                <option value="Podkarpacki Urząd Wojewódzki w Rzeszowie Wydział Spraw Obywatelskich i Cudzoziemców">
                  Podkarpacki Urząd Wojewódzki
                </option>
                <option value="Podlaski Urząd Wojewódzki w Białymstoku Wydział Spraw Obywatelskich i Cudzoziemców">
                  Podlaski Urząd Wojewódzki
                </option>
                <option value="Pomorski Urząd Wojewódzki w Gdańsku Wydział Spraw Obywatelskich i Cudzoziemców">
                  Pomorski Urząd Wojewódzki
                </option>
                <option value="Śląski Urząd Wojewódzki w Katowicach Wydział Spraw Obywatelskich i Cudzoziemców">
                  Śląski Urząd Wojewódzki
                </option>
                <option value="Świętokrzyski Urząd Wojewódzki w Kielcach Wydział Spraw Obywatelskich i Cudzoziemców">
                  Świętokrzyski Urząd Wojewódzki
                </option>
                <option value="Warmińsko-Mazurski Urząd Wojewódzki w Olsztynie Wydział Spraw Obywatelskich i Cudzoziemców">
                  Warmińsko-Mazurski Urząd Wojewódzki
                </option>
                <option value="Wielkopolski Urząd Wojewódzki w Poznaniu Wydział Spraw Obywatelskich i Cudzoziemców">
                  Wielkopolski Urząd Wojewódzki
                </option>
                <option value="Zachodniopomorski Urząd Wojewódzki w Szczecinie Wydział Spraw Obywatelskich i Cudzoziemców">
                  Zachodniopomorski Urząd Wojewódzki
                </option>

              </Field>
              <ErrorMessage name="urzad" component="div" className={css.error} />
            </div>

            {/* Przedmiot udzielenia */}
            <h3 className={css.sectionTitle}>{t("sections.subject")}</h3>
            <div className={css.single}>
              <Field
                as="select"
                name="przedmiotUdzielenia"
                className={css.select}
                value={values.przedmiotUdzielenia}
                onChange={(e) => handleFieldChange("przedmiotUdzielenia", e.target.value, setFieldValue)}
              >
                <option value="">{t("options.default")}</option>
                <option value="zezwolenia na pobyt czasowy">{t("options.czasowy")}</option>
                <option value="pobyt stały">{t("options.staly")}</option>
                <option value="pobyt rezydenta długoterminowego UE">{t("options.ue")}</option>
              </Field>
              <ErrorMessage name="przedmiotUdzielenia" component="div" className={css.error} />
            </div>

            {/* Dane osoby, której dotyczy wniosek */}
            <h3 className={css.sectionTitle}>{t("sections.additional")}</h3>
            <FieldBlock
              name="imieNazwiskoWnioskodawcy"
              label={t("labels.imieNazwiskoWnioskodawcy")}
              placeholder="Jan Kowalski"
              {...{ values, setFieldValue, handleFieldChange }}
            />
            <FieldBlock
              name="numerPaszportu"
              label={t("labels.numerPaszportu")}
              placeholder="AB1234567"
              {...{ values, setFieldValue, handleFieldChange }}
            />
            <FieldBlock
              name="ulica"
              label={t("labels.ulica")}
              placeholder="ul. Główna"
              {...{ values, setFieldValue, handleFieldChange }}
            />
            <FieldBlock
              name="numerUlicy"
              label={t("labels.numerUlicy")}
              placeholder="10A"
              {...{ values, setFieldValue, handleFieldChange }}
            />
            <FieldBlock
              name="miasto"
              label={t("labels.miasto")}
              placeholder="Warszawa"
              {...{ values, setFieldValue, handleFieldChange }}
            />

            {/* Przyciski */}
            <div className={css.buttons}>
              <ButtonsGroup
                resetForm={resetForm}
                setSavedValues={setSavedValues}
                localStorageKey="wniosekZaswiadczenie"
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

// 🔹 Компонент для поля с кнопкой очистки
function FieldBlock({
  name,
  label,
  values,
  setFieldValue,
  handleFieldChange,
  type = "text",
  placeholder,
}) {
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
