import { PDFDocument } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import { saveAs } from "file-saver";

export async function fillPdf(form) {
  // загружаем исходный PDF (положи его в public/formularz.pdf)
  const existingPdfBytes = await fetch("./formularz.pdf").then(res => res.arrayBuffer());
  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  // регистрируем fontkit для поддержки Unicode
  pdfDoc.registerFontkit(fontkit);

  // грузим Unicode-шрифт
  const fontBytes = await fetch("./NotoSans-VariableFont_wdth,wght.ttf").then(res => res.arrayBuffer());
  const customFont = await pdfDoc.embedFont(fontBytes);

  const formPdf = pdfDoc.getForm();

  // хелпер
  const setField = (name, value) => {
    try {
      const field = formPdf.getTextField(name);
      field.setText((value || "").toUpperCase());
      field.updateAppearances(customFont);
    } catch {
      console.warn("Поле не найдено:", name);
    }
  };

  // 🔹 фамилия + имя
  setField("nazwisko", form.nazwisko);
  setField("imię (imiona)", form.imie);

  // 🔹 PESEL
  const peselDigits = (form.pesel || "").replace(/\D/g, "").split("");
  const peselFields = [
    "pierwsza cyfra PESEL",
    "druga cyfra PESEL",
    "trzecia cyfra PESEL",
    "czwarta cyfra PESEL",
    "piąta cyfra PESEL",
    "szósta cyfra PESEL",
    "siódma cyfra PESEL",
    "ósma cyfra PESEL",
    "dziewiąta cyfra PESEL",
    "dziesiąta cyfra PESEL",
    "jedenasta cyfra PESEL",
  ];
  peselFields.forEach((fieldName, i) => setField(fieldName, peselDigits[i]));

  // 🔹 страна и место рождения
  setField("kraj urodzenia", form.krajUrodzenia);
  setField("miejsce urodzenia", form.miejsceUrodzenia);
  setField("kraj miejsca zamieszkania", form.krajMiejscaZamieszkania);

  // 🔹 дата рождения (YYYY-MM-DD)
  if (form.dataUrodzenia) {
    const [rok, miesiac, dzien] = form.dataUrodzenia.split("-");
    const digits = {
      dzien: (dzien || "").split(""),
      miesiac: (miesiac || "").split(""),
      rok: (rok || "").split(""),
    };
    setField("data urodzenia dzień pierwsza cyfra", digits.dzien[0]);
    setField("data urodzenia dzień druga cyfra", digits.dzien[1]);
    setField("data urodzenia miesiąc pierwsza cyfra", digits.miesiac[0]);
    setField("data urodzenia miesiąc druga cyfra", digits.miesiac[1]);
    setField("data urodzenia rok pierwsza cyfra", digits.rok[0]);
    setField("data urodzenia rok druga cyfra", digits.rok[1]);
    setField("data urodzenia rok trzecia cyfra", digits.rok[2]);
    setField("data urodzenia rok czwarta cyfra", digits.rok[3]);
  }

  // 🔹 телефон (20 цифр)
  const phoneDigits = (form.telefon || "").replace(/\D/g, "").split("");
  const telFields = [
    "pierwsza cyfra numeru telefonu komórkowego",
    "druga cyfra numeru telefonu komórkowego",
    "trzecia cyfra numeru telefonu komórkowego",
    "czwarta cyfra numeru telefonu komórkowego",
    "piąta cyfra numeru telefonu komórkowego",
    "szósta cyfra numeru telefonu komórkowego",
    "siódma cyfra numeru telefonu komórkowego",
    "ósma cyfra numeru telefonu komórkowego",
    "dziewiąta cyfra numeru telefonu komórkowego",
    "dziesiąta cyfra numeru telefonu komórkowego",
    "jedenasta cyfra numeru telefonu komórkowego",
    "dwunasta cyfra numeru telefonu komórkowego",
    "trzynasta cyfra numeru telefonu komórkowego",
    "czternasta cyfra numeru telefonu komórkowego",
    "piętnasta cyfra numeru telefonu komórkowego",
    "szesnasta cyfra numeru telefonu komórkowego",
    "siedemansta cyfra numeru telefonu komórkowego",
    "osiemnasta cyfra numeru telefonu komórkowego",
    "dziewiętnasta cyfra numeru telefonu komórkowego",
    "dwudziesta cyfra numeru telefonu komórkowego",
  ];
  telFields.forEach((fieldName, i) => setField(fieldName, phoneDigits[i]));

  // 🔹 email
  setField("adres poczty elektronicznej", form.email);

  // 🔹 адрес
  setField("ulica", form.ulica);

  const nrDomuDigits = (form.numerDomu || "").split("");
  const nrDomuFields = [
    "numer domu pierwsza cyfra",
    "numer domu druga cyfra",
    "numer domu trzecia cyfra",
    "numer domu czwarta cyfra",
    "numer domu piąta cyfra",
    "numer domu szósta cyfra",
    "numer domu siódma cyfra",
    "numer domu ósma cyfra",
    "numer domu dziewiąta cyfra",
  ];
  nrDomuFields.forEach((fieldName, i) => setField(fieldName, nrDomuDigits[i]));

  const nrLokaluDigits = (form.numerLokalu || "").split("");
  const nrLokaluFields = [
    "numer lokalu pierwsza cyfra",
    "numer lokalu druga cyfra",
    "numer lokalu trzecia cyfra",
    "numer lokalu czwarta cyfra",
    "numer lokalu piąta cyfra",
    "numer lokalu szósta cyfra",
    "numer lokalu siódma cyfra",
  ];
  nrLokaluFields.forEach((fieldName, i) => setField(fieldName, nrLokaluDigits[i]));

  const kodDigits = (form.kodPocztowy || "").replace(/\D/g, "").split("");
  const kodFields = [
    "kod pocztowy pierwsza cyfra",
    "kod pocztowy druga cyfra",
    "kod pocztowy trzecia cyfra",
    "kod pocztowy czwarta cyfra",
    "kod pocztowy piąta cyfra",
  ];
  kodFields.forEach((fieldName, i) => setField(fieldName, kodDigits[i]));

  setField("miejscowość dzielnica", form.miejscowoscDzielnica);
  setField("gmina", form.gmina);
  setField("województwo", form.wojewodztwo);

  // 🔹 дата от (YYYY-MM-DD)
  if (form.dataPoczatkowa) {
    const [rok, miesiac, dzien] = form.dataPoczatkowa.split("-");
    const digits = {
      dzien: (dzien || "").split(""),
      miesiac: (miesiac || "").split(""),
      rok: (rok || "").split(""),
    };
    setField("data początkowa dzień pierwsza cyfra", digits.dzien[0]);
    setField("data początkowa dzień druga cyfra", digits.dzien[1]);
    setField("data początkowa miesiąc pierwsza cyfra", digits.miesiac[0]);
    setField("data początkowa miesiąć druga cyfra", digits.miesiac[1]);
    setField("data początkowa rok pierwsza cyfra", digits.rok[0]);
    setField("data początkowa rok druga cyfra", digits.rok[1]);
    setField("data początkowa rok trzecia cyfra", digits.rok[2]);
    setField("data początkowa rok czwarta cyfra", digits.rok[3]);
  }

  // 🔹 дата до (YYYY-MM-DD)
  if (form.dataKoncowa) {
    const [rok, miesiac, dzien] = form.dataKoncowa.split("-");
    const digits = {
      dzien: (dzien || "").split(""),
      miesiac: (miesiac || "").split(""),
      rok: (rok || "").split(""),
    };
    setField("data końcowa dzień pierwsza cyfra", digits.dzien[0]);
    setField("data końcowa dzień druga cyfra", digits.dzien[1]);
    setField("data końcowa miesiąc pierwsza cyfra", digits.miesiac[0]);
    setField("data końcowa miesiąc druga cyfra", digits.miesiac[1]);
    setField("data końcowa rok pierwsza cyfra", digits.rok[0]);
    setField("data końcowa rok druga cyfra", digits.rok[1]);
    setField("data końcowa rok trzecia cyfra", digits.rok[2]);
    setField("data końcowa rok czwarta cyfra", digits.rok[3]);
  }

  // сохраняем
  const pdfBytes = await pdfDoc.save();
  saveAs(new Blob([pdfBytes], { type: "application/pdf" }), "wypelniony_formularz.pdf");
}
