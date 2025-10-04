import React, { useState, useEffect } from "react";
import MeldunekForm from "../MeldunekForm/MeldunekForm.jsx";
import css from "./App.module.css"

export default function App() {

  return (
    <div className={css.container}>
<MeldunekForm />
    </div>
  );
}
