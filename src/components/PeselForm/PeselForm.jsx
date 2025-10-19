import React, { useState } from "react";
import { fillPdf } from "../utils/peselPdfHelper.js";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { AiOutlineCloseCircle } from "react-icons/ai";
import css from "./PeselForm.module.css";

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
    .matches(polishRegex, "Dozwolone tylko polskie litery / Only Polish letters allowed / Дозволено лише польські літери")
    .required("Wymagane / Required / Обов’язково"),
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
    .matches(polishRegex, "Dozwolone tylko polskie litery / Only Polish letters allowed / Дозволено лише польські літери")
    .required("Wymagane / Required / Обов’язково"),
  nazwiskoRodoweMalzonka: Yup.string()
    .matches(polishRegex, "Dozwolone tylko polskie litery / Only Polish letters allowed / Дозволено лише польські літери")
    .required("Wymagane / Required / Обов’язково"),
  numerPeselMalzonka: Yup.string()
    .matches(/^[0-9]+$/, "Tylko cyfry / Only digits / Лише цифри")
    .length(11, "PESEL musi mieć 11 cyfr / PESEL must have 11 digits / PESEL має містити 11 цифр")
    .required("Wymagane / Required / Обов’язково"),
  zdazenie: Yup.string().required("Wymagane / Required / Обов’язково"),
  dataZdazenia: Yup.date().required("Wymagane / Required / Обов’язково"),
  oznaczenieAktuMalzenstwa: Yup.string().required("Wymagane / Required / Обов’язково"),
  oznaczenieUrzeduStanuCywilnego: Yup.string().required("Wymagane / Required / Обов’язково"),
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
      <h2>🧾 Formularz PESEL / Wniosek o nadanie numeru PESEL</h2>

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
            <h3 className={css.sectionTitle}>Wnioskodawca / Applicant / Заявник</h3>
            <FieldBlock name="imie" label="Imię / Name / Ім’я" placeholder="np. Jan" {...{ values, setFieldValue, handleFieldChange }} />
            <FieldBlock name="nazwisko" label="Nazwisko / Surname / Прізвище" placeholder="np. Kowalski" {...{ values, setFieldValue, handleFieldChange }} />
            {/* 🔹 Adres do korespondencji osoby, która składa wniosek */}
            <h3 className={css.sectionTitle}>Adres do korespondencji osoby, która składa wniosek / Correspondence address of the applicant / Адреса для кореспонденції особи, яка подає заяву</h3>
            <FieldBlock name="ulica" label="Ulica / Street / Вулиця" placeholder="np. Piękna" {...{ values, setFieldValue, handleFieldChange }} />
            <FieldBlock name="numerDomu" label="Numer domu / House number / Номер будинку" placeholder="np. 12" {...{ values, setFieldValue, handleFieldChange }} />
            <FieldBlock name="numerLokalu" label="Numer lokalu / Apartment number / Номер квартири" placeholder="np. 4" {...{ values, setFieldValue, handleFieldChange }} />
            <FieldBlock name="kodPocztowy" label="Kod pocztowy / Postal code / Поштовий код" placeholder="np. 00-950" {...{ values, setFieldValue, handleFieldChange }} />
            <FieldBlock name="miejscowosc" label="Miejscowość / City / Місто" placeholder="np. Warszawa" {...{ values, setFieldValue, handleFieldChange }} />
        
            {/* 🔹 Dane osoby, której dotyczy wniosek */}
            <h3 className={css.sectionTitle}>Dane osoby, której dotyczy wniosek / Person concerned / Особа, якої стосується заява</h3>
            <FieldBlock name="imiePierwszeKtorejDotyczyWniosek" label="Imię pierwsze / First name / Перше ім’я" placeholder="np. Anna" {...{ values, setFieldValue, handleFieldChange }} />
            <FieldBlock name="imieDrugieKtorejDotyczyWniosek" label="Imię drugie / Second name / Друге ім’я" placeholder="opcjonalne" {...{ values, setFieldValue, handleFieldChange }} />
            <FieldBlock name="imieKolejneKtorejDotyczyWniosek" label="Imię kolejne / Additional name / Наступне ім’я" placeholder="opcjonalne" {...{ values, setFieldValue, handleFieldChange }} />
            <FieldBlock name="nazwiskoKtorejDotyczyWniosek" label="Nazwisko / Surname / Прізвище" placeholder="np. Nowak" {...{ values, setFieldValue, handleFieldChange }} />
            <RadioGroup
              label="Płeć / Gender / Стать"
              name="plec"
              options={[
                { value: "kobieta", label: "Kobieta / Female / Жінка" },
                { value: "mezczyzna", label: "Mężczyzna / Male / Чоловік" },
              ]}
              {...{ values, setFieldValue, handleFieldChange }}
            />
            {/* 🔹 Data urodzenia / Date of birth / Дата народження */}
            <FieldBlock name="dataUrodzenia" type="date" label="Data urodzenia / Date of birth / Дата народження" placeholder="RRRR-MM-DD" {...{ values, setFieldValue, handleFieldChange }} />
            <FieldBlock name="krajUrodzenia" label="Kraj urodzenia / Country of birth / Країна народження" placeholder="np. Polska" {...{ values, setFieldValue, handleFieldChange }} />
            <FieldBlock name="krajMiejscaZamieszkania" label="Kraj zamieszkania / Country of residence / Країна проживання" placeholder="np. Polska" {...{ values, setFieldValue, handleFieldChange }} />
        
            {/* 🔹 Obywatelstwo / Citizenship / Громадянство */}
            <h3 className={css.sectionTitle}>Obywatelstwo / Citizenship / Громадянство</h3>
            <RadioGroup
              label="Obywatelstwo / Citizenship / Громадянство"
              name="obywatelstwo"
              options={[
                { value: "obywatelstwo-polskie", label: "Polskie / Polish / Польське" },
                { value: "bezpaństwowiec", label: "Bezpaństwowiec / Stateless / Без громадянства" },
                { value: "inne", label: "Inne / Other / Інше" },
              ]}
              {...{ values, setFieldValue, handleFieldChange }}
            />
            {values.obywatelstwo === "inne" && (
              <FieldBlock name="obywatelstwoInne" label="Podaj kraj / Specify country / Вкажіть країну" placeholder="np. Ukraina" {...{ values, setFieldValue, handleFieldChange }} />
            )}
        
            {/* 🔹 Ostatnio wydany paszport obywatela polskiego */}
            {values.obywatelstwo === "obywatelstwo-polskie" && (
              <>
                <h3 className={css.sectionTitle}>Ostatnio wydany paszport obywatela polskiego / Most recently issued passport of a Polish citizen / Останній виданий паспорт громадянина Польщі</h3>
                <FieldBlock name="numerPaszportu" label="Numer paszportu / Passport number / Номер паспорта" placeholder="np. AB123456" {...{ values, setFieldValue, handleFieldChange }} />
                <FieldBlock name="dataWaznosciPaszportu" type="date" label="Data ważności paszportu / Passport expiry date / Термін дії паспорта" placeholder="RRRR-MM-DD" {...{ values, setFieldValue, handleFieldChange }} />
              </>
            )}

                        {/* 🔹 Dokument podróży cudzoziemca lub inny dokument potwierdzający tożsamość i obywatelstwo */}
                        <h3 className={css.sectionTitle}>Dokument podróży cudzoziemca lub inny dokument potwierdzający tożsamość i obywatelstwo</h3>
            <FieldBlock name="numerPodrozy" label="Numer dokumentu podróży / Travel document number / Номер проїзного документа" placeholder="np. TR123456" {...{ values, setFieldValue, handleFieldChange }} />
            <FieldBlock name="dataWaznosciPodrozy" type="date" label="Data ważności dokumentu podróży / Expiry date of travel document / Термін дії проїзного документа" placeholder="RRRR-MM-DD" {...{ values, setFieldValue, handleFieldChange }} />

            {/* 🔹 Dodatkowe dane osoby, której wniosek dotyczy, oraz dane jej rodziców */}
              <h3 className={css.sectionTitle}>Dodatkowe dane osoby, której wniosek dotyczy, oraz dane jej rodziców</h3>
              <FieldBlock name="nazwiskoRodowe" label="Nazwisko rodowe / Maiden name / Дівоче прізвище" placeholder="np. Kowalska" {...{ values, setFieldValue, handleFieldChange }} />
              <FieldBlock name="miejsceUrodzenia" label="Miejsce urodzenia / Place of birth / Місце народження" placeholder="np. Warszawa" {...{ values, setFieldValue, handleFieldChange }} />
              <FieldBlock name="oznaczenieAktuUrodzenia" label="Oznaczenie urzędu stanu cywilnego, w którym został sporządzony akt urodzenia / Birth certificate reference / Номер свідоцтва про народження" placeholder="np. 123/2020" {...{ values, setFieldValue, handleFieldChange }} />
              <FieldBlock name="oznaczenieUrzeduAktUrodzenia" label="Oznaczenie urzędu stanu cywilnego, w którym został sporządzony akt urodzenia / Registry office where the birth certificate was issued / Орган РАЦС, який видав свідоцтво про народження" placeholder="np. Urząd Stanu Cywilnego Warszawa" {...{ values, setFieldValue, handleFieldChange }} />
              <FieldBlock name="imieOjca" label="Imię ojca / Father’s name / Ім’я батька" placeholder="np. Piotr" {...{ values, setFieldValue, handleFieldChange }} />
              <FieldBlock name="nazwiskoRodoweOjca" label="Nazwisko rodowe ojca / Father’s family name / Прізвище батька" placeholder="np. Kowalski" {...{ values, setFieldValue, handleFieldChange }} />
              <FieldBlock name="imieMatki" label="Imię matki / Mother’s name / Ім’я матері" placeholder="np. Maria" {...{ values, setFieldValue, handleFieldChange }} />
              <FieldBlock name="nazwiskoRodoweMatki" label="Nazwisko rodowe matki / Mother’s maiden name / Дівоче прізвище матері" placeholder="np. Nowak" {...{ values, setFieldValue, handleFieldChange }} />

            {/* 🔹 Ostatnio wydany dowód osobisty obywatela polskiego */}
          {values.obywatelstwo === "obywatelstwo-polskie" && (
            <>
              <h3 className={css.sectionTitle}>Ostatnio wydany dowód osobisty obywatela polskiego / Most recently issued ID card of a Polish citizen / Останній виданий паспорт громадянина Польщі</h3>
              <FieldBlock name="numerDowodu" label="Numer dowodu / ID number / Номер документа" {...{ values, setFieldValue, handleFieldChange }} />
              <FieldBlock name="dataWaznosciDowodu" type="date" label="Data ważności dowodu / ID expiry date / Термін дії документа" {...{ values, setFieldValue, handleFieldChange }} />
              <FieldBlock name="oznaczenieOrganuKtoryWydalDowod" label="Organ wydający dowód / Issuing authority / Орган, що видав документ" {...{ values, setFieldValue, handleFieldChange }} />
            </>
          )}

            {/* 🔹 Dane o stanie cywilnym osoby, której wniosek dotyczy */}
            <h3 className={css.sectionTitle}>Dane o stanie cywilnym osoby, której wniosek dotyczy / Marital status of the person the application concerns / Дані про сімейний стан особи, якої стосується заява</h3>
            <RadioGroup
              label="Stan cywilny / Marital status / Сімейний стан"
              name="stanCywilny"
              options={[
                { value: "kawaler-panna", label: "Kawaler / Panna / Single / Незаміжній / неодружений" },
                { value: "żonaty-zamężna", label: "Żonaty / Zamężna / Married / Одружений / Заміжня" },
                { value: "rozwiedziony-rozwiedziona", label: "Rozwiedziony / Rozwiedziona / Divorced / Розлучений / Розлучена" },
                { value: "wdowiec-wdowa", label: "Wdowiec / Wdowa / Widower / Widow / Вдівець / Вдова" },
              ]}
              {...{ values, setFieldValue, handleFieldChange }}
            />
            {values.stanCywilny === "żonaty-zamężna" && (
              <>
                <FieldBlock name="imieMalzonka" label="Imię małżonka / Spouse’s name / Ім’я чоловіка або дружини" placeholder="np. Piotr" {...{ values, setFieldValue, handleFieldChange }} />
                <FieldBlock name="nazwiskoRodoweMalzonka" label="Nazwisko rodowe małżonka / Spouse’s maiden name / Дівоче прізвище чоловіка або дружини" placeholder="np. Kowalska" {...{ values, setFieldValue, handleFieldChange }} />
                <FieldBlock name="numerPeselMalzonka" label="PESEL małżonka / Spouse’s PESEL / PESEL чоловіка або дружини" placeholder="np. 44051401359" {...{ values, setFieldValue, handleFieldChange }} />
              </>
            )}
        
            {/* 🔹 Zdarzenia / Events affecting marriage / Події, що впливають на шлюб */}
            <h3 className={css.sectionTitle}>Ostatnie zdarzenie mające wpływ na małżeństwo / Last event affecting marriage / Остання подія, що вплинула на шлюб</h3>
            <RadioGroup
              label="Zdarzenie / Event / Подія"
              name="zdazenie"
              options={[
                { value: "zawarcie-związku", label: "Zawarcie związku małżeńskiego / Marriage / Шлюб" },
                { value: "rozwiązanie-związku", label: "Rozwiązanie małżeństwa / Divorce / Розірвання шлюбу" },
                { value: "unieważnienie-związku", label: "Unieważnienie związku małżeńskiego / Annulment of marriage / Визнання шлюбу недійсним" },
                { value: "zgon-małżonka", label: "Zgon małżonka (zaznacz, jeśli znasz datę zgonu) / Death of spouse (check if you know the date of death) / Смерть чоловіка або дружини (вкажіть, якщо знаєте дату смерті)" },
                { value: "zgon-małżonka-bez-daty-zgonu", label: "Zgon małżonka - znalezienie zwłok (zaznacz, jeśli małżonek zmarł, ale znasz jedynie datę znalezienia ciała) / Death of spouse – body found (check if spouse died but you only know the date the body was found) / Смерть чоловіка або дружини – виявлення тіла (вкажіть, якщо чоловік або дружина померли, але відома лише дата виявлення тіла)" },
              ]}
              {...{ values, setFieldValue, handleFieldChange }}
            />
            <FieldBlock name="dataZdazenia" type="date" label="Data zdarzenia / Event date / Дата події" placeholder="RRRR-MM-DD" {...{ values, setFieldValue, handleFieldChange }} />
            <FieldBlock name="oznaczenieAktuMalzenstwa" label="Oznaczenie aktu małżeństwa albo sygnatura akt sądu, który rozwiązał/unieważnił małżeństwo, albo numer aktu zgonu małżonka / Marriage certificate reference or court file reference that dissolved/annulled the marriage, or spouse’s death certificate number / Номер акту шлюбу або номер справи суду, який розірвав/визнaв шлюб недійсним, або номер свідоцтва про смерть подружжя" placeholder="np. 123/2020" {...{ values, setFieldValue, handleFieldChange }} />
            <FieldBlock name="oznaczenieUrzeduStanuCywilnego" label="Oznaczenie urzędu stanu cywilnego, w którym sporządzono akt małżeństwa albo akt zgonu, albo oznaczenie sądu, który rozwiązał/unieważnił małżeństwo / Registry office where the marriage or death certificate was issued, or court that dissolved/annulled the marriage / Орган РАЦС, де видано акт шлюбу або свідоцтво про смерть, або суд, який розірвав/визнaв шлюб недійсним" placeholder="np. Urząd Stanu Cywilnego Warszawa" {...{ values, setFieldValue, handleFieldChange }} />
          </div>
        
          {/* 🔹 Forma dokumentu / Form of notification / Форма повідомлення */}
          <h3 className={css.sectionTitle}>Forma powiadomienia / Form of notification / Форма повідомлення</h3>
          <RadioGroup
            name="version"
            options={[
              { value: "papierowa", label: "Papierowa / Paper / Паперова" },
              { value: "elektroniczna", label: "Elektroniczna / Electronic / Електронна" },
            ]}
            {...{ values, setFieldValue, handleFieldChange }}
          />
          {values.version === "elektroniczna" && (
            <FieldBlock name="adresElektroniczny" label="Adres elektroniczny / Email address / Електронна адреса" placeholder="np. jan.kowalski@example.com" {...{ values, setFieldValue, handleFieldChange }} />
          )}
        
          {/* 🔹 Кнопки */}
          <div className={css.buttons}>
            <button type="submit">📄 Pobierz PDF / Download PDF / Завантажити PDF</button>
            <button type="button" onClick={() => { resetForm(); setSavedValues(defaultValues); localStorage.removeItem("peselFormData"); }}>
              🧹 Wyczyść / Clear / Очистити
            </button>
          </div>
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
          placeholder={placeholder} // <- Добавляем placeholder сюда
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


// 🔸 Радио-группа (новая красивая версия)
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
