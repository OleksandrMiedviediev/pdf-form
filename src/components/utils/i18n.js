import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import * as pl from "../../locales/pl";
import * as en from "../../locales/en";
import * as ua from "../../locales/ua";
import * as es from "../../locales/es";

const resources = {
  pl,
  en,
  ua,
  es
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem("appLanguage") || "en",
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });

export default i18n;
