import React, { useState, useEffect } from "react";
import MeldunekForm from "../MeldunekForm/MeldunekForm.jsx";
import css from "./App.module.css"
import InfoMeldunek from "../InfoMeldunek/InfoMeldunek.jsx";

export default function App() {

  return (
    <div className={css.container}>
      <div className={css.box}>
        <MeldunekForm />
        <InfoMeldunek />
    </div>
    </div>
  );
}
