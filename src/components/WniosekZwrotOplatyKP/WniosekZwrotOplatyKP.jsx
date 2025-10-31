import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { fillPdf } from "../utils/wniosekZwrotOplatyKP.js";
import css from "./WniosekZwrotOplatyKP.module.css";
import ButtonsGroup from "../ui/ButtonsGroup/ButtonsGroup.jsx";
import { useTranslation } from "react-i18next";

const polishRegex = /^[a-zA-ZąćęłńóśżźĄĆĘŁŃÓŚŻŹ\s-]+$/;

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
  kwota: "",
  nrKonta: "",
  formaZwrotu: "",
  imieNazwisko2: "",
  dokladnyAdress: "",
  dataZaplaty: "",
  uzasadnienie: "",
  kodPocztowy: "",
  miejscowoscWnioskodawcy: "",
};

export default function WniosekZwrotOplatyKP() {
  const { t } = useTranslation("wniosekZwrotOplatyKP");

  const [savedValues, setSavedValues] = useState(() => {
    const saved = localStorage.getItem("wniosekZwrotOplatyKP");
    return saved ? { ...defaultValues, ...JSON.parse(saved) } : defaultValues;
  });

  const handleFieldChange = (field, value, setFieldValue) => {
    setFieldValue(field, value);
    const updated = { ...savedValues, [field]: value };
    setSavedValues(updated);
    localStorage.setItem("wniosekZwrotOplatyKP", JSON.stringify(updated));
  };

  const validationSchema = Yup.object().shape({
    imieNazwisko: Yup.string()
      .matches(polishRegex, t("schema.polishRegex"))
      .required(t("schema.required")),
    dataUrodzenia: Yup.date()
      .max(new Date(), t("schema.dataUrodzenia"))
      .required(t("schema.required")),
    obywatelstwo: Yup.string()
      .matches(polishRegex, t("schema.polishRegex"))
      .required(t("schema.required")),
    nrSprawy: Yup.string().required(t("schema.required")),
    miejscowoscUrzedu: Yup.string()
      .matches(polishRegex, t("schema.polishRegex"))
      .required(t("schema.required")),
    dataWypelnienia: Yup.date().required(t("schema.required")),
    przedmiotUdzielenia: Yup.string().required(t("schema.required")),
    kwota: Yup.string().required(t("schema.required")),
    formaZwrotu: Yup.string().required(t("schema.required")),
    nrKonta: Yup.string().when("formaZwrotu", {
      is: "na rachunek bankowy",
      then: (schema) =>
        schema
          .matches(/^[0-9A-Za-z]+$/, t("schema.numerKontaValid"))
          .min(1, t("schema.required"))
          .required(t("schema.required")),
      otherwise: (schema) => schema.notRequired(),
    }),
    imieNazwisko2: Yup.string().matches(polishRegex, t("schema.polishRegex")),
    dokladnyAdress: Yup.string(),
    dataZaplaty: Yup.date().required(t("schema.required")),
    uzasadnienie: Yup.string().required(t("schema.required")),
    ulica: Yup.string()
      .required(t("schema.required")),
    kodPocztowy: Yup.string()
      .matches(/^[0-9]{2}-[0-9]{3}$/, t("schema.kodPocztowy"))
      .required(t("schema.required")),
    miejscowoscWnioskodawcy: Yup.string()
      .matches(polishRegex, t("schema.polishRegex"))
      .required(t("schema.required")),
  });

  return (
    <div className={css.formWrapper}>
      <h1 className={css.title}>📝 {t("title")}</h1>

      <Formik
        initialValues={savedValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={(values) => fillPdf(values)}
      >
        {({ values, setFieldValue, resetForm }) => (
          <Form className={css.form}>
            {/* Sekcja Wnioskodawca */}
            <h3 className={css.sectionTitle}>{t("sections.applicant")}</h3>
            <FieldBlock
              name="imieNazwisko"
              label={t("labels.imieNazwisko")}
              placeholder="Jan Kowalski"
              {...{ values, setFieldValue, handleFieldChange }}
            />
            <FieldBlock
              name="dataUrodzenia"
              type="date"
              label={t("labels.dataUrodzenia")}
              {...{ values, setFieldValue, handleFieldChange }}
            />
            <FieldBlock
              name="obywatelstwo"
              label={t("labels.obywatelstwo")}
              placeholder="Polska"
              {...{ values, setFieldValue, handleFieldChange }}
            />
            <FieldBlock
              name="nrSprawy"
              label={t("labels.nrSprawy")}
              placeholder="SO-VII.1234.12.20"
              {...{ values, setFieldValue, handleFieldChange }}
            />

            {/* Sekcja urząd */}
            <h3 className={css.sectionTitle}>{t("sections.office")}</h3>
            <FieldBlock
              name="miejscowoscUrzedu"
              label={t("labels.miejscowoscUrzedu")}
              placeholder="Warszawa"
              {...{ values, setFieldValue, handleFieldChange }}
            />
            <FieldBlock
              name="dataWypelnienia"
              type="date"
              label={t("labels.dataWypelnienia")}
              {...{ values, setFieldValue, handleFieldChange }}
            />

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

            {/* Kwota */}
            <h3 className={css.sectionTitle}>{t("sections.kwota")}</h3>
            <div className={css.single}>
              <Field
                as="select"
                name="kwota"
                className={css.select}
                value={values.kwota}
                onChange={(e) => handleFieldChange("kwota", e.target.value, setFieldValue)}
              >
                <option value="">{t("options.default")}</option>
                <option value="100 zł.">{t("options.100")}</option>
                <option value="50 zł.">{t("options.50")}</option>
              </Field>
              <ErrorMessage name="kwota" component="div" className={css.error} />
            </div>

            {/* Data wniesienia kwoty */}
            <FieldBlock
              name="dataZaplaty"
              type="date"
              label={t("labels.dataZaplaty")}
              {...{ values, setFieldValue, handleFieldChange }}
            />

            <FieldBlock
              name="uzasadnienie"
              label={t("labels.uzasadnienie")}
              placeholder="Wniosek o wydanie Karty pobytu został wycofany, w związku z tym proszę o zwrot uiszczonej opłaty."
              {...{ values, setFieldValue, handleFieldChange }}
            />

            {/* Forma zwrotu */}
            <h3 className={css.sectionTitle}>{t("sections.formaZwrotu")}</h3>
            <div className={css.single}>
              <Field
                as="select"
                name="formaZwrotu"
                className={css.select}
                value={values.formaZwrotu}
                onChange={(e) => handleFieldChange("formaZwrotu", e.target.value, setFieldValue)}
              >
                <option value="">{t("options.default")}</option>
                <option value="na rachunek bankowy">{t("options.naRachunekBankowy")}</option>
                <option value="na adres">{t("options.naAdres")}</option>
              </Field>
              <ErrorMessage name="formaZwrotu" component="div" className={css.error} />
            </div>

            {values.formaZwrotu === "na rachunek bankowy" && (
              <FieldBlock
                name="nrKonta"
                label={t("labels.nrKonta")}
                placeholder="26109010140000071219812874"
                {...{ values, setFieldValue, handleFieldChange }}
              />
            )}

            {values.formaZwrotu === "na adres" && (
              <>
                <FieldBlock
                  name="imieNazwisko2"
                  label={t("labels.imieNazwisko2")}
                  placeholder="Jan Kowalski"
                  {...{ values, setFieldValue, handleFieldChange }}
                />
                <FieldBlock
                  name="dokladnyAdress"
                  label={t("labels.dokladnyAdress")}
                  placeholder="ul. Marszałkowska 10A, 00-123 Warszawa"
                  {...{ values, setFieldValue, handleFieldChange }}
                />
              </>
            )}

            {/* Adres wnioskodawcy */}
            <h3 className={css.sectionTitle}>{t("sections.address")}</h3>
            <FieldBlock
              name="ulica"
              label={t("labels.ulica")}
              placeholder="ul. Marszałkowska 3/6"
              {...{ values, setFieldValue, handleFieldChange }}
            />
            <FieldBlock
              name="kodPocztowy"
              label={t("labels.kodPocztowy")}
              placeholder="00-123"
              {...{ values, setFieldValue, handleFieldChange }}
            />
            <FieldBlock
              name="miejscowoscWnioskodawcy"
              label={t("labels.miejscowoscWnioskodawcy")}
              placeholder="Warszawa"
              {...{ values, setFieldValue, handleFieldChange }}
            />

            {/* Przyciski */}
            <div className={css.buttons}>
              <ButtonsGroup
                resetForm={resetForm}
                setSavedValues={setSavedValues}
                localStorageKey="wniosekZwrotOplaty"
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

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
