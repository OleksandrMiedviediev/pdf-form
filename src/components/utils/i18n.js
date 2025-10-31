import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import homePagePL from "../../locales/pl/homePage.json";
import homePageEN from "../../locales/en/homePage.json";
import homePageUA from "../../locales/ua/homePage.json";
import homePageES from "../../locales/es/homePage.json";

import navigationPL from "../../locales/pl/navigation.json";
import navigationEN from "../../locales/en/navigation.json";
import navigationUA from "../../locales/ua/navigation.json";
import navigationES from "../../locales/es/navigation.json";

import documentsPagePL from "../../locales/pl/documentsPage.json";
import documentsPageEN from "../../locales/en/documentsPage.json";
import documentsPageUA from "../../locales/ua/documentsPage.json";
import documentsPageES from "../../locales/es/documentsPage.json";

import infoMeldunekPL from "../../locales/pl/infoMeldunek.json";
import infoMeldunekEN from "../../locales/en/infoMeldunek.json";
import infoMeldunekUA from "../../locales/ua/infoMeldunek.json";
import infoMeldunekES from "../../locales/es/infoMeldunek.json";

import peselFormPL from "../../locales/pl/peselForm.json";
import peselFormEN from "../../locales/en/peselForm.json";
import peselFormUA from "../../locales/ua/peselForm.json";
import peselFormES from "../../locales/es/peselForm.json";

import buttonsGroupPL from "../../locales/pl/buttonsGroup.json";
import buttonsGroupEN from "../../locales/en/buttonsGroup.json";
import buttonsGroupUA from "../../locales/ua/buttonsGroup.json";
import buttonsGroupES from "../../locales/es/buttonsGroup.json";

import meldunekFormPL from "../../locales/pl/meldunekForm.json";
import meldunekFormEN from "../../locales/en/meldunekForm.json";
import meldunekFormUA from "../../locales/ua/meldunekForm.json";
import meldunekFormES from "../../locales/es/meldunekForm.json";

import wniosekUmozenieKPPL from "../../locales/pl/wniosekUmozenieKP.json";
import wniosekUmozenieKPEN from "../../locales/en/wniosekUmozenieKP.json";
import wniosekUmozenieKPUA from "../../locales/ua/wniosekUmozenieKP.json";
import wniosekUmozenieKPES from "../../locales/es/wniosekUmozenieKP.json";

import wniosekZaswiadczeniePL from "../../locales/pl/wniosekZaswiadczenie.json";
import wniosekZaswiadczenieEN from "../../locales/en/wniosekZaswiadczenie.json";
import wniosekZaswiadczenieUA from "../../locales/ua/wniosekZaswiadczenie.json";
import wniosekZaswiadczenieES from "../../locales/es/wniosekZaswiadczenie.json";

import wniosekZwrotOplatySkarbowejPL from "../../locales/pl/wniosekZwrotOplatySkarbowej.json";
import wniosekZwrotOplatySkarbowejEN from "../../locales/en/wniosekZwrotOplatySkarbowej.json";
import wniosekZwrotOplatySkarbowejUA from "../../locales/ua/wniosekZwrotOplatySkarbowej.json";
import wniosekZwrotOplatySkarbowejES from "../../locales/es/wniosekZwrotOplatySkarbowej.json";

import wniosekZwrotOplatyKPPL from "../../locales/pl/wniosekZwrotOplatyKP.json";
import wniosekZwrotOplatyKPEN from "../../locales/en/wniosekZwrotOplatyKP.json";
import wniosekZwrotOplatyKPUA from "../../locales/ua/wniosekZwrotOplatyKP.json";
import wniosekZwrotOplatyKPES from "../../locales/es/wniosekZwrotOplatyKP.json";


i18n
  .use(initReactI18next)
  .init({
    resources: {
      pl: 
        { 
            homePage: homePagePL, 
            navigation: navigationPL, 
            documentsPage: documentsPagePL,
            infoMeldunek: infoMeldunekPL,
            peselForm: peselFormPL,
            buttonsGroup: buttonsGroupPL,
            meldunekForm: meldunekFormPL,
            wniosekUmozenieKP: wniosekUmozenieKPPL,
            wniosekZaswiadczenie: wniosekZaswiadczeniePL,
            wniosekZwrotOplatySkarbowej: wniosekZwrotOplatySkarbowejPL,
            wniosekZwrotOplatyKP: wniosekZwrotOplatyKPPL,
        },
      en: 
        { 
            homePage: homePageEN, 
            navigation: navigationEN, 
            documentsPage: documentsPageEN,
            infoMeldunek: infoMeldunekEN,
            peselForm: peselFormEN,
            buttonsGroup: buttonsGroupEN,
            meldunekForm: meldunekFormEN,
            wniosekUmozenieKP: wniosekUmozenieKPEN,
            wniosekZaswiadczenie: wniosekZaswiadczenieEN,
            wniosekZwrotOplatySkarbowej: wniosekZwrotOplatySkarbowejEN,
            wniosekZwrotOplatyKP: wniosekZwrotOplatyKPEN,
        },
      ua: 
        { homePage: homePageUA, 
            navigation: navigationUA, 
            documentsPage: documentsPageUA,
            infoMeldunek: infoMeldunekUA,
            peselForm: peselFormUA,
            buttonsGroup: buttonsGroupUA,
            meldunekForm: meldunekFormUA,
            wniosekUmozenieKP: wniosekUmozenieKPUA,
            wniosekZaswiadczenie: wniosekZaswiadczenieUA,
            wniosekZwrotOplatySkarbowej: wniosekZwrotOplatySkarbowejUA,
            wniosekZwrotOplatyKP: wniosekZwrotOplatyKPUA,
        },
      es: 
        { homePage: homePageES, 
            navigation: navigationES, 
            documentsPage: documentsPageES,
            infoMeldunek: infoMeldunekES,
            peselForm: peselFormES,
            buttonsGroup: buttonsGroupES,
            meldunekForm: meldunekFormES,
            wniosekUmozenieKP: wniosekUmozenieKPES,
            wniosekZaswiadczenie: wniosekZaswiadczenieES,
            wniosekZwrotOplatySkarbowej: wniosekZwrotOplatySkarbowejES,
            wniosekZwrotOplatyKP: wniosekZwrotOplatyKPES,
        },
    },
    lng: localStorage.getItem("appLanguage") || 'en',
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });


export default i18n;
