import React from "react";
export default function FormInputs({ form, onChange, onSubmit }) {
    return (
      <div>
        <h2>Formularz pobytu czasowego</h2>
        <input name="nazwisko" placeholder="Nazwisko" value={form.nazwisko} onChange={onChange} />
        <input name="imie" placeholder="Imię" value={form.imie} onChange={onChange} />
        <input name="pesel" placeholder="PESEL" value={form.pesel} onChange={onChange} />
        <input name="kraj" placeholder="Kraj urodzenia" value={form.kraj} onChange={onChange} />
        <input name="dataUrodzenia" placeholder="Data urodzenia" value={form.dataUrodzenia} onChange={onChange} />
        <input name="miejsceUrodzenia" placeholder="Miejsce urodzenia" value={form.miejsceUrodzenia} onChange={onChange} />
        <input name="telefon" placeholder="Telefon" value={form.telefon} onChange={onChange} />
        <input name="email" placeholder="Email" value={form.email} onChange={onChange} />
        <br />
        <button onClick={onSubmit}>Pobierz PDF</button>
      </div>
    );
  }
  