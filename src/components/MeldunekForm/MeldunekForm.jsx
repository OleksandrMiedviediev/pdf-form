import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { fillPdf } from "../utils/meldunekPdfHelper.js";
import InfoMeldunek from "../InfoMeldunek/InfoMeldunek.jsx";
import Input from "../ui/Input/Input.jsx";
import css from "./MeldunekForm.module.css";
import ButtonsGroup from "../ui/ButtonsGroup/ButtonsGroup.jsx";
import { useTranslation } from "react-i18next";

const polishRegex = /^[a-zA-ZąćęłńóśżźĄĆĘŁŃÓŚŻŹ\s-]+$/;


export default function MeldunekForm() {
  const {t} = useTranslation('meldunekForm')

const MeldunekSchema = Yup.object().shape({
  nazwisko: Yup.string()
    .matches(polishRegex, t('meldunekSchema.polishRegex'))
    .min(1, t('meldunekSchema.min'))
    .max(50, t('meldunekSchema.max'))
    .required(t('meldunekSchema.required')),
  imie: Yup.string()
  .matches(polishRegex, t('meldunekSchema.polishRegex'))
  .min(1, t('meldunekSchema.min'))
  .max(50, t('meldunekSchema.max'))
  .required(t('meldunekSchema.required')),
  pesel: Yup.string()
    .matches(/^[0-9]+$/, t('meldunekSchema.matches'))
    .length(11, t('meldunekSchema.pesel'))
    .required(t('meldunekSchema.required')),
  krajUrodzenia: Yup.string()
    .matches(polishRegex, t('meldunekSchema.polishRegex'))
    .required(t('meldunekSchema.required')),
  dataUrodzenia: Yup.date().max(new Date(),t('meldunekSchema.dataUrodzenia')).required(t('meldunekSchema.required')),
  miejsceUrodzenia: Yup.string()
  .matches(polishRegex, t('meldunekSchema.polishRegex'))
  .required(t('meldunekSchema.required')),
  krajMiejscaZamieszkania: Yup.string()
  .matches(polishRegex, t('meldunekSchema.polishRegex'))
  .required(t('meldunekSchema.required')),
  telefon: Yup.string()
    .matches(/^[0-9]+$/, t('meldunekSchema.matches'))
    .min(9, t('meldunekSchema.min'))
    .required(t('meldunekSchema.required')),
  email: Yup.string()
    .email(t('meldunekSchema.email'))
    .required(t('meldunekSchema.required')),
  ulica: Yup.string()
    .matches(polishRegex, t('meldunekSchema.polishRegex'))
    .required(t('meldunekSchema.required')),
  numerDomu: Yup.string()
    .matches(/^[0-9]+$/, t('meldunekSchema.matches'))
    .required(t('meldunekSchema.required')),
  numerLokalu: Yup.string(),
  kodPocztowy: Yup.string()
    .matches(/^[0-9]{2}-[0-9]{3}$/, t('meldunekSchema.kodPocztowy'))
    .required(t('meldunekSchema.required')),
  miejscowoscDzielnica: Yup.string()
    .matches(polishRegex, t('meldunekSchema.polishRegex'))
    .required(t('meldunekSchema.required')),
  gmina: Yup.string()
    .matches(polishRegex, t('meldunekSchema.polishRegex'))
    .required(t('meldunekSchema.required')),
  wojewodztwo: Yup.string()
    .matches(polishRegex, t('meldunekSchema.polishRegex'))
    .required(t('meldunekSchema.required')),
  dataPoczatkowa: Yup.date().required(t('meldunekSchema.required')),
  dataKoncowa: Yup.date().required(t('meldunekSchema.required')),
});
  const fields = [
    { name: "nazwisko", label: t('labels.nazwisko'), placeholder: "Kowalski", autoComplete: "family-name" },
    { name: "imie", label: t('labels.imie'), placeholder: "Jan", autoComplete: "given-name" },
    { name: "pesel", label: t('labels.pesel'), placeholder: "12345678901", autoComplete: "off" },
    { name: "krajUrodzenia", label: t('labels.krajUrodzenia'), placeholder: "Polska", autoComplete: "country-name" },
    { name: "dataUrodzenia", label: t('labels.dataUrodzenia'), type: "date", autoComplete: "off" },
    { name: "miejsceUrodzenia", label: t('labels.miejsceUrodzenia'), placeholder: "Warszawa", autoComplete: "address-level2" },
    { name: "krajMiejscaZamieszkania", label: t('labels.krajMiejscaZamieszkania'), placeholder: "Polska", autoComplete: "country-name" },
    { name: "telefon", label: t('labels.telefon'), placeholder: "600123456", autoComplete: "tel" },
    { name: "email", label: t('labels.email'), placeholder: "jan@example.com", autoComplete: "email" },
    { name: "ulica", label: t('labels.ulica'), placeholder: "Marszałkowska", autoComplete: "street-address" },
    { name: "numerDomu", label: t('labels.numerDomu'), placeholder: "10", autoComplete: "off" },
    { name: "numerLokalu", label: t('labels.numerLokalu'), placeholder: "5", autoComplete: "off" },
    { name: "kodPocztowy", label: t('labels.kodPocztowy'), placeholder: "00-001", autoComplete: "postal-code" },
    { name: "miejscowoscDzielnica", label: t('labels.miejscowoscDzielnica'), placeholder: "Warszawa", autoComplete: "address-level2" },
    { name: "gmina", label: t('labels.gmina'), placeholder: "Śródmieście", autoComplete: "off" },
    { name: "wojewodztwo", label: t('labels.wojewodztwo'), placeholder: "Mazowieckie", autoComplete: "address-level1" },
    { name: "dataPoczatkowa", label: t('labels.dataPoczatkowa'), type: "date", autoComplete: "off" },
    { name: "dataKoncowa", label: t('labels.dataKoncowa'), type: "date", autoComplete: "off" },
  ];
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
        <h2>{t('title')}</h2>
        <div className={css.infoText}>
            <p>
                {t('description')}
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
