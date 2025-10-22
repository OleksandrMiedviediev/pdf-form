import React, { useState } from "react";
import { fillPdf } from "../utils/peselPdfHelper.js";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { AiOutlineCloseCircle } from "react-icons/ai";
import css from "./PeselForm.module.css";
import ButtonsGroup from "../ui/ButtonsGroup/ButtonsGroup.jsx";
import { useTranslation } from "react-i18next";


// ✅ Валидатор польских букв
const polishRegex = /^[a-zA-ZąćęłńóśżźĄĆĘŁŃÓŚŻŹ\s-]+$/;

// ✅ Схема валидации Yup
const PeselSchema = Yup.object().shape({
  imie: Yup.string()
    .matches(polishRegex, "Dozwolone tylko polskie litery / Only Polish letters allowed / Дозволено лише польські літери")
    .required("Wymagane / Required / Обов’язково"),
  nazwisko: Yup.string()
    .matches(polishRegex, "Dozwolone tylko polskie litery / Only Polish letters allowed / Дозволено лише польські літери")
    .required("Wymagane / Required / Обов’язково"),
  ulica: Yup.string()
    .matches(polishRegex, "Dozwolone tylko polskie litery / Only Polish letters allowed / Дозволено лише польські літери")
    .required("Wymagane / Required / Обов’язково"),
  numerDomu: Yup.string().required("Wymagane / Required / Обов’язково"),
  numerLokalu: Yup.string(),
  kodPocztowy: Yup.string()
    .matches(/^[0-9]{2}-[0-9]{3}$/, "Format: 00-000 / Format: 00-000 / Формат: 00-000"),
  miejscowosc: Yup.string()
    .matches(polishRegex, "Dozwolone tylko polskie litery / Only Polish letters allowed / Дозволено лише польські літери")
    .required("Wymagane / Required / Обов’язково"),
  imiePierwszeKtorejDotyczyWniosek: Yup.string()
    .matches(polishRegex, "Dozwolone tylko polskie litery / Only Polish letters allowed / Дозволено лише польські літери")
    .required("Wymagane / Required / Обов’язково"),
  imieDrugieKtorejDotyczyWniosek: Yup.string()
    .matches(polishRegex, "Dozwolone tylko polskie litery / Only Polish letters allowed / Дозволено лише польські літери"),
  imieKolejneKtorejDotyczyWniosek: Yup.string()
    .matches(polishRegex, "Dozwolone tylko polskie litery / Only Polish letters allowed / Дозволено лише польські літери"),
  nazwiskoKtorejDotyczyWniosek: Yup.string()
    .matches(polishRegex, "Dozwolone tylko polskie litery / Only Polish letters allowed / Дозволено лише польські літери")
    .required("Wymagane / Required / Обов’язково"),
  plec: Yup.string().required("Wymagane / Required / Обов’язково"),
  dataUrodzenia: Yup.date().required("Wymagane / Required / Обов’язково"),
  krajUrodzenia: Yup.string()
    .matches(polishRegex, "Dozwolone tylko polskie litery / Only Polish letters allowed / Дозволено лише польські літери")
    .required("Wymagane / Required / Обов’язково"),
  krajMiejscaZamieszkania: Yup.string()
    .matches(polishRegex, "Dozwolone tylko polskie litery / Only Polish letters allowed / Дозволено лише польські літери")
    .required("Wymagane / Required / Обов’язково"),
  obywatelstwo: Yup.string().required("Wymagane / Required / Обов’язково"),
  obywatelstwoInne: Yup.string()
    .matches(polishRegex, "Dozwolone tylko polskie litery / Only Polish letters allowed / Дозволено лише польські літери"),
  numerPaszportu: Yup.string(),
  dataWaznosciPaszportu: Yup.date(),
  numerPodrozy: Yup.string().required("Wymagane / Required / Обов’язково"),
  dataWaznosciPodrozy: Yup.date().required("Wymagane / Required / Обов’язково"),
  nazwiskoRodowe: Yup.string()
    .matches(polishRegex, "Dozwolone tylko polskie litery / Only Polish letters allowed / Дозволено лише польські літери")
    .required("Wymagane / Required / Обов’язково"),
  miejsceUrodzenia: Yup.string()
    .matches(polishRegex, "Dozwolone tylko polskie litery / Only Polish letters allowed / Дозволено лише польські літери")
    .required("Wymagane / Required / Обов’язково"),
  oznaczenieAktuUrodzenia: Yup.string().required("Wymagane / Required / Обов’язково"),
  oznaczenieUrzeduAktUrodzenia: Yup.string().required("Wymagane / Required / Обов’язково"),
  imieOjca: Yup.string()
    .matches(polishRegex, "Dozwolone tylko polskie litery / Only Polish letters allowed / Дозволено лише польські літери")
    .required("Wymagane / Required / Обов’язково"),
  nazwiskoRodoweOjca: Yup.string()
    .matches(polishRegex, "Dozwolone tylko polskie litery / Only Polish letters allowed / Дозволено лише польські літери")
    .required("Wymagane / Required / Обов’язково"),
  imieMatki: Yup.string()
    .matches(polishRegex, "Dozwolone tylko polskie litery / Only Polish letters allowed / Дозволено лише польські літери")
    .required("Wymagane / Required / Обов’язково"),
  nazwiskoRodoweMatki: Yup.string()
    .matches(polishRegex, "Dozwolone tylko polskie litery / Only Polish letters allowed / Дозволено лише польські літери")
    .required("Wymagane / Required / Обов’язково"),
  numerDowodu: Yup.string(),
  dataWaznosciDowodu: Yup.date(),
  oznaczenieOrganuKtoryWydalDowod: Yup.string(),
  stanCywilny: Yup.string().required("Wymagane / Required / Обов’язково"),
  imieMalzonka: Yup.string()
    .matches(polishRegex, "Dozwolone tylko polskie litery / Only Polish letters allowed / Дозволено лише польські літери"),
  nazwiskoRodoweMalzonka: Yup.string()
    .matches(polishRegex, "Dozwolone tylko polskie litery / Only Polish letters allowed / Дозволено лише польські літери"),
  numerPeselMalzonka: Yup.string()
    .matches(/^[0-9]+$/, "Tylko cyfry / Only digits / Лише цифри")
    .length(11, "PESEL musi mieć 11 cyfr / PESEL must have 11 digits / PESEL має містити 11 цифр"),
  zdazenie: Yup.string(),
  dataZdazenia: Yup.date(),
  oznaczenieAktuMalzenstwa: Yup.string(),
  oznaczenieUrzeduStanuCywilnego: Yup.string(),
  version: Yup.string().required("Wymagane / Required / Обов’язково"),
  adresElektroniczny: Yup.string().email("Niepoprawny email / Invalid email / Невірний email"),
});


// ✅ Стандартные значения
const defaultValues = {
  imie: "",
  nazwisko: "",
  ulica: "",
  numerDomu: "",
  numerLokalu: "",
  kodPocztowy: "",
  miejscowosc: "",
  imiePierwszeKtorejDotyczyWniosek: "",
  imieDrugieKtorejDotyczyWniosek: "",
  imieKolejneKtorejDotyczyWniosek: "",
  nazwiskoKtorejDotyczyWniosek: "",
  plec: "",
  dataUrodzenia: "",
  krajUrodzenia: "",
  krajMiejscaZamieszkania: "",
  obywatelstwo: "",
  obywatelstwoInne: "",
  numerPaszportu: "",
  dataWaznosciPaszportu: "",
  numerPodrozy: "",
  dataWaznosciPodrozy: "",
  nazwiskoRodowe: "",
  miejsceUrodzenia: "",
  oznaczenieAktuUrodzenia: "",
  oznaczenieUrzeduAktUrodzenia: "",
  imieOjca: "",
  nazwiskoRodoweOjca: "",
  imieMatki: "",
  nazwiskoRodoweMatki: "",
  numerDowodu: "",
  dataWaznosciDowodu: "",
  oznaczenieOrganuKtoryWydalDowod: "",
  stanCywilny: "",
  imieMalzonka: "",
  nazwiskoRodoweMalzonka: "",
  numerPeselMalzonka: "",
  zdazenie: "",
  dataZdazenia: "",
  oznaczenieAktuMalzenstwa: "",
  oznaczenieUrzeduStanuCywilnego: "",
  version: "",
  adresElektroniczny: "",
};

export default function PeselForm() {

  const {t} = useTranslation('peselForm')

  // ✅ Подгружаем сохранённые данные
  const [savedValues, setSavedValues] = useState(() => {
    const saved = localStorage.getItem("peselFormData");
    return saved ? { ...defaultValues, ...JSON.parse(saved) } : defaultValues;
  });

  // ✅ Обновление поля и сохранение в localStorage
  const handleFieldChange = (field, value, setFieldValue) => {
    setFieldValue(field, value);
    const updated = { ...savedValues, [field]: value };
    setSavedValues(updated);
    localStorage.setItem("peselFormData", JSON.stringify(updated));
  };

  return (
    <div className={css.formBox}>
      <h2>{t('title')}</h2>

      <Formik
        initialValues={savedValues}
        validationSchema={PeselSchema}
        enableReinitialize
        onSubmit={(values) => fillPdf(values)}
      >
        {({ values, setFieldValue, resetForm }) => (
          <Form>
          <div className={css.formGrid}>
            {/* 🔹 Wnioskodawca / Applicant / Заявник */}
            <h3 className={css.sectionTitle}>{t('applicantSection')}</h3>
            <FieldBlock name="imie" label={t('labels.imie')} placeholder="np. Jan" {...{ values, setFieldValue, handleFieldChange }} />
            <FieldBlock name="nazwisko" label={t('labels.nazwisko')} placeholder="np. Kowalski" {...{ values, setFieldValue, handleFieldChange }} />
            {/* 🔹 Adres do korespondencji osoby, która składa wniosek */}
            <h3 className={css.sectionTitle}>{t('addressSection')}</h3>
            <FieldBlock name="ulica" label={t('labels.ulica')} placeholder="np. Piękna" {...{ values, setFieldValue, handleFieldChange }} />
            <FieldBlock name="numerDomu" label={t('labels.numerDomu')} placeholder="np. 12" {...{ values, setFieldValue, handleFieldChange }} />
            <FieldBlock name="numerLokalu" label={t('labels.numerLokalu')} placeholder="np. 4" {...{ values, setFieldValue, handleFieldChange }} />
            <FieldBlock name="kodPocztowy" label={t('labels.kodPocztowy')} placeholder="np. 00-950" {...{ values, setFieldValue, handleFieldChange }} />
            <FieldBlock name="miejscowosc" label={t('labels.miejscowosc')} placeholder="np. Warszawa" {...{ values, setFieldValue, handleFieldChange }} />
        
            {/* 🔹 Dane osoby, której dotyczy wniosek */}
            <h3 className={css.sectionTitle}>{t('personSection')}</h3>
            <FieldBlock name="imiePierwszeKtorejDotyczyWniosek" label={t('labels.imiePierwszeKtorejDotyczyWniosek')} placeholder="np. Anna" {...{ values, setFieldValue, handleFieldChange }} />
            <FieldBlock name="imieDrugieKtorejDotyczyWniosek" label={t('labels.imieDrugieKtorejDotyczyWniosek')} placeholder="opcjonalne" {...{ values, setFieldValue, handleFieldChange }} />
            <FieldBlock name="imieKolejneKtorejDotyczyWniosek" label={t('labels.imieKolejneKtorejDotyczyWniosek')} placeholder="opcjonalne" {...{ values, setFieldValue, handleFieldChange }} />
            <FieldBlock name="nazwiskoKtorejDotyczyWniosek" label={t('labels.nazwisko')} placeholder="np. Nowak" {...{ values, setFieldValue, handleFieldChange }} />
            <RadioGroup
              label={t('labels.plec')}
              name="plec"
              options={[
                { value: "kobieta", label: t('options.plec.kobieta') },
                { value: "mezczyzna", label: t('options.plec.mezczyzna') },
              ]}
              {...{ values, setFieldValue, handleFieldChange }}
            />
            {/* 🔹 Data urodzenia / Date of birth / Дата народження */}
            <FieldBlock name="dataUrodzenia" type="date" label={t('labels.dataUrodzenia')} placeholder="RRRR-MM-DD" {...{ values, setFieldValue, handleFieldChange }} />
            <FieldBlock name="krajUrodzenia" label={t('labels.krajUrodzenia')} placeholder="np. Polska" {...{ values, setFieldValue, handleFieldChange }} />
            <FieldBlock name="krajMiejscaZamieszkania" label={t('labels.krajMiejscaZamieszkania')} placeholder="np. Polska" {...{ values, setFieldValue, handleFieldChange }} />
        
            {/* 🔹 Obywatelstwo / Citizenship / Громадянство */}
            <h3 className={css.sectionTitle}>{t('citizenshipSection')}</h3>
            <RadioGroup
              label={t('citizenshipSection')}
              name="obywatelstwo"
              options={[
                { value: "obywatelstwo-polskie", label: t('options.obywatelstwo.polskie') },
                { value: "bezpaństwowiec", label: t('options.obywatelstwo.bezpanstwowiec') },
                { value: "inne", label: t('options.obywatelstwo.inne') },
              ]}
              {...{ values, setFieldValue, handleFieldChange }}
            />
            {values.obywatelstwo === "inne" && (
              <FieldBlock name="obywatelstwoInne" label={t('labels.obywatelstwoInne')} placeholder="np. Ukraina" {...{ values, setFieldValue, handleFieldChange }} />
            )}
        
            {/* 🔹 Ostatnio wydany paszport obywatela polskiego */}
            {values.obywatelstwo === "obywatelstwo-polskie" && (
              <>
                <h3 className={css.sectionTitle}>{t('sectionTitle')}</h3>
                <FieldBlock name="numerPaszportu" label={t('labels.numerPaszportu')} placeholder="np. AB123456" {...{ values, setFieldValue, handleFieldChange }} />
                <FieldBlock name="dataWaznosciPaszportu" type="date" label={t('labels.dataWaznosciPaszportu')} placeholder="RRRR-MM-DD" {...{ values, setFieldValue, handleFieldChange }} />
              </>
            )}

            {/* 🔹 Dokument podróży cudzoziemca lub inny dokument potwierdzający tożsamość i obywatelstwo */}
            {values.obywatelstwo && values.obywatelstwo !== "obywatelstwo-polskie" &&(
              <>
              <h3 className={css.sectionTitle}>{t('sectionTitleDP')}</h3>
              <FieldBlock name="numerPodrozy" label={t('labels.numerPodrozy')} placeholder="np. TR123456" {...{ values, setFieldValue, handleFieldChange }} />
              <FieldBlock name="dataWaznosciPodrozy" type="date" label={t('labels.dataWaznosciPodrozy')} placeholder="RRRR-MM-DD" {...{ values, setFieldValue, handleFieldChange }} />
              </>)}
            {/* 🔹 Dodatkowe dane osoby, której wniosek dotyczy, oraz dane jej rodziców */}
              <h3 className={css.sectionTitle}>{t('sectionTitleDDO')}</h3>
              <FieldBlock name="nazwiskoRodowe" label={t('labels.nazwiskoRodowe')} placeholder="np. Kowalska" {...{ values, setFieldValue, handleFieldChange }} />
              <FieldBlock name="miejsceUrodzenia" label={t('labels.miejsceUrodzenia')} placeholder="np. Warszawa" {...{ values, setFieldValue, handleFieldChange }} />
              <FieldBlock name="oznaczenieAktuUrodzenia" label={t('labels.oznaczenieAktuUrodzenia')} placeholder="np. 123/2020" {...{ values, setFieldValue, handleFieldChange }} />
              <FieldBlock name="oznaczenieUrzeduAktUrodzenia" label={t('labels.oznaczenieUrzeduAktUrodzenia')} placeholder="np. Urząd Stanu Cywilnego Warszawa" {...{ values, setFieldValue, handleFieldChange }} />
              <FieldBlock name="imieOjca" label={t('labels.imieOjca')} placeholder="np. Piotr" {...{ values, setFieldValue, handleFieldChange }} />
              <FieldBlock name="nazwiskoRodoweOjca" label={t('labels.nazwiskoRodoweOjca')} placeholder="np. Kowalski" {...{ values, setFieldValue, handleFieldChange }} />
              <FieldBlock name="imieMatki" label={t('labels.imieMatki')} placeholder="np. Maria" {...{ values, setFieldValue, handleFieldChange }} />
              <FieldBlock name="nazwiskoRodoweMatki" label={t('labels.nazwiskoRodoweMatki')} placeholder="np. Nowak" {...{ values, setFieldValue, handleFieldChange }} />

            {/* 🔹 Ostatnio wydany dowód osobisty obywatela polskiego */}
          {values.obywatelstwo === "obywatelstwo-polskie" && (
            <>
              <h3 className={css.sectionTitle}>{t('sectionTitleOWD')}</h3>
              <FieldBlock name="numerDowodu" label={t('labels.numerDowodu')} {...{ values, setFieldValue, handleFieldChange }} />
              <FieldBlock name="dataWaznosciDowodu" type="date" label={t('labels.dataWaznosciDowodu')} {...{ values, setFieldValue, handleFieldChange }} />
              <FieldBlock name="oznaczenieOrganuKtoryWydalDowod" label={t('labels.oznaczenieOrganuKtoryWydalDowod')} {...{ values, setFieldValue, handleFieldChange }} />
            </>
          )}

            {/* 🔹 Dane o stanie cywilnym osoby, której wniosek dotyczy */}
            <h3 className={css.sectionTitle}>{t('sectionTitleDOSC')}</h3>
            <RadioGroup
              label={t('labels.stanCywilny')}
              name="stanCywilny"
              options={[
                { value: "kawaler-panna", label: t('options.stanCywilny.kawaler-panna') },
                { value: "żonaty-zamężna", label: t('options.stanCywilny.żonaty-zamężna') },
                { value: "rozwiedziony-rozwiedziona", label: t('options.stanCywilny.rozwiedziony-rozwiedziona') },
                { value: "wdowiec-wdowa", label: t('options.stanCywilny.wdowiec-wdowa') },
              ]}
              {...{ values, setFieldValue, handleFieldChange }}
            />
            {values.stanCywilny === "żonaty-zamężna" && (
              <>
                <FieldBlock name="imieMalzonka" label={t('labels.imieMalzonka')} placeholder="np. Piotr" {...{ values, setFieldValue, handleFieldChange }} />
                <FieldBlock name="nazwiskoRodoweMalzonka" label={t('labels.nazwiskoRodoweMalzonka')} placeholder="np. Kowalska" {...{ values, setFieldValue, handleFieldChange }} />
                <FieldBlock name="numerPeselMalzonka" label={t('labels.numerPeselMalzonka')} placeholder="np. 44051401359" {...{ values, setFieldValue, handleFieldChange }} />
              </>
            )}
        
            {/* 🔹 Zdarzenia / Events affecting marriage / Події, що впливають на шлюб */}
            {values.stanCywilny && values.stanCywilny !== "kawaler-panna" &&(
            <>
              <h3 className={css.sectionTitle}>
                {t('sectionTitleOZ')}
              </h3>
              <RadioGroup
                label={t('labels.zdarzenie')}
                name="zdarzenie"
                options={[
                  { value: "zawarcie-związku", label: t('options.zdarzenie.zawarcie-związku') },
                  { value: "rozwiązanie-związku", label: t('options.zdarzenie.rozwiązanie-związku') },
                  { value: "unieważnienie-związku", label: t('options.zdarzenie.unieważnienie-związku') },
                  { value: "zgon-małżonka", label: t('options.zdarzenie.zgon-małżonka') },
                  { value: "zgon-małżonka-bez-daty-zgonu", label: t('options.zdarzenie.zgon-małżonka-bez-daty-zgonu') },
                ]}
                {...{ values, setFieldValue, handleFieldChange }}
              />
              <FieldBlock name="dataZdazenia" type="date" label={t('labels.dataZdazenia')} placeholder="RRRR-MM-DD" {...{ values, setFieldValue, handleFieldChange }} />
              <FieldBlock name="oznaczenieAktuMalzenstwa" label={t('labels.oznaczenieAktuMalzenstwa')} placeholder="np. 123/2020" {...{ values, setFieldValue, handleFieldChange }} />
              <FieldBlock name="oznaczenieUrzeduStanuCywilnego" label={t('labels.oznaczenieUrzeduStanuCywilnego')} placeholder="np. Urząd Stanu Cywilnego Warszawa" {...{ values, setFieldValue, handleFieldChange }} />
            </>)}
          </div>
        
          {/* 🔹 Forma dokumentu / Form of notification / Форма повідомлення */}
          <h3 className={css.sectionTitle}>{t('sectionTitleFP')}</h3>
          <RadioGroup
            name="version"
            options={[
              { value: "papierowa", label: t('options.version.papierowa') },
              { value: "elektroniczna", label: t('options.version.elektroniczna') },
            ]}
            {...{ values, setFieldValue, handleFieldChange }}
          />
          {values.version === "elektroniczna" && (
            <FieldBlock name="adresElektroniczny" label={t('labels.adresElektroniczny')} placeholder="np. jan.kowalski@example.com" {...{ values, setFieldValue, handleFieldChange }} />
          )}
        
          {/* 🔹 Кнопки */}
          <ButtonsGroup 
          resetForm={resetForm} 
          setSavedValues={setSavedValues} 
          localStorageKey="peselFormData" />
        </Form>        
        
        )}
      </Formik>
    </div>
  );
}

// 🔸 Компонент для обычных полей
function FieldBlock({ name, label, values, setFieldValue, handleFieldChange, type = "text", placeholder }) {
  return (
    <div className={css.fieldWrapper}>
      <label htmlFor={name}>{label}</label>
      <div className={css.inputContainer}>
        <Field
          id={name}
          name={name}
          type={type}
          className={css.field}
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
      <ErrorMessage name={name} component="div" className={css.errorMessage} />
    </div>
  );
}


// 🔸 Радио-группа
function RadioGroup({ label, name, options, values, setFieldValue, handleFieldChange }) {
  return (
    <div className={css.fieldWrapper}>
      {label && <label>{label}</label>}
      <div className={css.radioGroup}>
        {options.map((opt) => (
          <label key={opt.value}>
            <Field
              type="radio"
              name={name}
              value={opt.value}
              checked={values[name] === opt.value}
              onChange={() => handleFieldChange(name, opt.value, setFieldValue)}
            />
            <span>{opt.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
