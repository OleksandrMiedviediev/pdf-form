import React, { useState, useEffect, lazy } from "react";
import Layout from "../Layout/Layout.jsx";
import { Route, Routes } from "react-router-dom";


const NotFoundPage = lazy (()=> import('../../pages/NotFoundPage/NotFoundPage.jsx'))
const HomePage = lazy (()=> import('../../pages/HomePage/HomePage.jsx'))
const MeldunekPage = lazy (()=> import('../MeldunekForm/MeldunekForm.jsx'))
const PeselPage = lazy (()=> import('../PeselForm/PeselForm.jsx'))
const DocumentsPage1 = lazy (()=> import('../../pages/DocumentsPage/DokumentsPage.jsx'))
const WniosekUmorzenieKP = lazy (()=> import('../../components/WniosekUmozenieKP/WniosekUmozenieKP.jsx'))
const WniosekZaswiadczenie = lazy (()=> import('../../components/WniosekZaswiadczenie/WniosekZaswiadczenie.jsx'))

export default function App() {

  return (
    <Layout >
      <Routes>
        <Route path='/' element = {<HomePage  />} />
        <Route path='/meldunek' element = {<MeldunekPage />} />
        <Route path='/pesel' element = {<PeselPage />} />
        <Route path='/documents' element = {<DocumentsPage1 />} />
        <Route path='/umozenie' element = {<WniosekUmorzenieKP />} />
        <Route path='/zaswiadczenie' element = {<WniosekZaswiadczenie />} />
        <Route path='*' element = {<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}
