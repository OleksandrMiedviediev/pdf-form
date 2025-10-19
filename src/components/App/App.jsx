import React, { useState, useEffect, lazy } from "react";
import MeldunekForm from "../MeldunekForm/MeldunekForm.jsx";
import css from "./App.module.css"
import InfoMeldunek from "../InfoMeldunek/InfoMeldunek.jsx";
import Layout from "../Layout/Layout.jsx";
import { Route, Routes } from "react-router-dom";
import PeselForm from "../PeselForm/PeselForm.jsx";


const NotFoundPage = lazy (()=> import('../../pages/NotFoundPage/NotFoundPage.jsx'))
const HomePage = lazy (()=> import('../../pages/HomePage/HomePage.jsx'))
const MeldunekPage = lazy (()=> import('../MeldunekForm/MeldunekForm.jsx'))
const PeselPage = lazy (()=> import('../PeselForm/PeselForm.jsx'))

export default function App() {

  return (
    <Layout >
      <Routes>
        <Route path='/' element = {<HomePage  />} />
        <Route path='/meldunek' element = {<MeldunekPage />} />
        <Route path='/pesel' element = {<PeselPage />} />
        <Route path='*' element = {<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}
