import React, { useState, useEffect } from "react";
import { fillPdf } from "./utils/pdfHelper.js";

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

const initialForm = fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {});

function App() {
  const [form, setForm] = useState(initialForm);

  // Загрузка данных
  useEffect(() => {
    const saved = localStorage.getItem("formData");
    if (saved) {
      setForm(JSON.parse(saved));
    }
  }, []);

  // Сохранение при изменении
  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(form));
  }, [form]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    fillPdf(form);
  };

  const handleClear = () => {
    setForm(initialForm);
    localStorage.removeItem("formData");
  };

  return (
    <div style={{ padding: 20, maxWidth: 400 }}>
      <h2>Formularz</h2>

      {fields.map((field) => (
        <input
          key={field.name}
          name={field.name}
          placeholder={field.placeholder}
          type={field.type || "text"}
          value={form[field.name]}
          onChange={handleChange}
          style={{ display: "block", marginBottom: 10, width: "100%" }}
        />
      ))}

      <button onClick={handleSubmit}>📄 Pobierz PDF</button>
      <button onClick={handleClear} style={{ marginLeft: 10 }}>🧹 Wyczyść formularz</button>
    </div>
  );
}

export default App;
