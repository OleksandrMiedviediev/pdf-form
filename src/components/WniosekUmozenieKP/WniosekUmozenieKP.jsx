import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { fillPdf } from "../utils/wniosekUmozenieKPHelper.js";
import css from "./WniosekUmozenieKP.module.css";
import ButtonsGroup from "../ui/ButtonsGroup/ButtonsGroup.jsx";
import { useTranslation } from "react-i18next";

// ✅ Валидатор польских букв
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

  const {t} = useTranslation('wniosekUmozenieKP')

// ✅ Схема валидации Yup с сообщениями на 3 языках
const validationSchema = Yup.object().shape({
  imieNazwisko: Yup.string()
    .matches(polishRegex, t('umorzenieSchema.polishRegex'))
    .required(t('umorzenieSchema.required')),
  dataUrodzenia: Yup.date().max(new Date(),t('umorzenieSchema.dataUrodzenia')).required(t('umorzenieSchema.required')),
  ulica: Yup.string()
    .matches(polishRegex, t('umorzenieSchema.polishRegex'))
    .required(t('umorzenieSchema.required')),
  obywatelstwo: Yup.string()
  .matches(polishRegex, t('umorzenieSchema.polishRegex'))
  .required(t('umorzenieSchema.required')),
  nrSprawy: Yup.string().required(t('umorzenieSchema.required')),
  miejscowoscUrzedu: Yup.string()
  .matches(polishRegex, t('umorzenieSchema.polishRegex'))
  .required(t('umorzenieSchema.required')),
  numerUlicy: Yup.string().required(t('umorzenieSchema.required')),
  kodPocztowy: Yup.string()
  .matches(/^[0-9]{2}-[0-9]{3}$/, t('umorzenieSchema.kodPocztowy'))
  .required(t('umorzenieSchema.required')),
  przedmiotUdzielenia: Yup.string().required(t('umorzenieSchema.required')),
  miejscowoscWnioskodawcy: Yup.string()
    .matches(polishRegex, t('umorzenieSchema.polishRegex'))
    .required(t('umorzenieSchema.required')),
});
  return (
    <div className={css.formWrapper}>
      <h1 className={css.title}>📝 {t('title')}</h1>

      <Formik
        initialValues={savedValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={(values) => fillPdf(values)}
      >
        {({ values, setFieldValue, resetForm }) => (
          <Form className={css.form}>
            {/* Sekcja Wnioskodawca */}
            <h3 className={css.sectionTitle}>{t('sections.applicant')}</h3>
            <FieldBlock
              name="imieNazwisko"
              label={t('labels.imieNazwisko')}
              placeholder="Jan Kowalski"
              {...{ values, setFieldValue, handleFieldChange }}
            />
            <FieldBlock
              name="dataUrodzenia"
              type="date"
              label={t('labels.dataUrodzenia')}
              {...{ values, setFieldValue, handleFieldChange }}
            />
            <FieldBlock
              name="obywatelstwo"
              label={t('labels.obywatelstwo')}
              placeholder="Polska"
              {...{ values, setFieldValue, handleFieldChange }}
            />
            <FieldBlock
              name="nrSprawy"
              label={t('labels.nrSprawy')}
              placeholder="SO-VII.1234.12.20"
              {...{ values, setFieldValue, handleFieldChange }}
            />

            {/* Sekcja urząd */}
            <h3 className={css.sectionTitle}>{t('sections.office')}</h3>
            <FieldBlock
              name="miejscowoscUrzedu"
              label={t('labels.miejscowoscUrzedu')}
              placeholder="Warszawa"
              {...{ values, setFieldValue, handleFieldChange }}
            />
            <FieldBlock
              name="dataWypelnienia"
              type="date"
              label={t('labels.dataWypelnienia')}
              {...{ values, setFieldValue, handleFieldChange }}
            />

            {/* Przedmiot udzielenia */}
            <h3 className={css.sectionTitle}>{t('sections.subject')}</h3>
            <div className={css.single}>
              <Field
                as="select"
                name="przedmiotUdzielenia"
                className={css.select}
                value={values.przedmiotUdzielenia}
                onChange={(e) => setFieldValue("przedmiotUdzielenia", e.target.value)}
              >
                <option value="">{t('options.default')}</option>
                <option value="zezwolenia na pobyt czasowy">
                {t('options.czasowy')}
                </option>
                <option value="pobyt stały">
                {t('options.staly')}
                </option>
                <option value="pobyt rezydenta długoterminowego UE">
                {t('options.ue')}
                </option>
              </Field>
              <ErrorMessage name="przedmiotUdzielenia" component="div" className={css.error} />
            </div>


            {/* Adres wnioskodawcy */}
            <h3 className={css.sectionTitle}>{t('sections.address')}</h3>
            <FieldBlock
              name="ulica"
              label={t('labels.ulica')}
              placeholder="Marszałkowska"
              {...{ values, setFieldValue, handleFieldChange }}
            />
            <FieldBlock
              name="numerUlicy"
              label={t('labels.numerUlicy')}
              placeholder="10A"
              {...{ values, setFieldValue, handleFieldChange }}
            />
            <FieldBlock
              name="kodPocztowy"
              label={t('labels.kodPocztowy')}
              placeholder="00-123"
              {...{ values, setFieldValue, handleFieldChange }}
            />
            <FieldBlock
              name="miejscowoscWnioskodawcy"
              label={t('labels.miejscowoscWnioskodawcy')}
              placeholder="Warszawa"
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
