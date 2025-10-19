import { PDFDocument } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import { saveAs } from "file-saver";

export async function fillPdf(form) {
  // Загружаем исходный PDF (положи его в public/formularzPesel.pdf)
  const existingPdfBytes = await fetch("/formularzPesel.pdf").then(res => res.arrayBuffer());
  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  // Регистрируем fontkit для поддержки Unicode
  pdfDoc.registerFontkit(fontkit);

  // Грузим Unicode-шрифт
  const fontBytes = await fetch("/NotoSans-VariableFont_wdth,wght.ttf").then(res => res.arrayBuffer());
  const customFont = await pdfDoc.embedFont(fontBytes);

  const formPdf = pdfDoc.getForm();

  // Хелпер для заполнения текстового поля
  const setField = (name, value) => {
    try {
      const field = formPdf.getTextField(name);
      field.setText((value || "").toUpperCase());
      field.updateAppearances(customFont);
    } catch {
      console.warn("Поле не найдено:", name);
    }
  };

  // 🔹 Wnioskodawca
  setField("imię", form.imie);
  setField("nazwisko", form.nazwisko);
  setField("ulica", form.ulica);

  // Номер domu
  const numerDomuDigits = (form.numerDomu || "").replace(/[^0-9A-Za-zА-Яа-я]/g, "").split("");
  [
    "numer-domu-1","numer-domu-2","numer-domu-3","numer-domu-4",
    "numer-domu-5","numer-domu-6","numer-domu-7","numer-domu-8","numer-domu-9"
  ].forEach((fieldName,i)=>setField(fieldName,numerDomuDigits[i]));

  // Numer lokalu
  const numerLokaluDigits = (form.numerLokalu || "").replace(/[^0-9A-Za-zА-Яа-я]/g, "").split("");
  [
    "numer-lokalu-1","numer-lokalu-2","numer-lokalu-3","numer-lokalu-4",
    "numer-lokalu-5","numer-lokalu-6","numer-lokalu-8"
  ].forEach((fieldName,i)=>setField(fieldName,numerLokaluDigits[i]));

  // Kod pocztowy
  const kodPocztowyDigits = (form.kodPocztowy || "").replace(/\D/g, "").split("");
  ["kod-pocztowy-1","kod-pocztowy-2","kod-pocztowy-3","kod-pocztowy-4","kod-pocztowy-5"]
    .forEach((fieldName,i)=>setField(fieldName,kodPocztowyDigits[i]));

  setField("miejscowość", form.miejscowosc);

  // 🔹 Dane osoby, której dotyczy wniosek
  setField("imię-pierwsze-której-dotyczy-wniosek", form.imiePierwszeKtorejDotyczyWniosek);
  setField("imie-drugie-której-dotyczy-wniosek", form.imieDrugieKtorejDotyczyWniosek);
  setField("imie-kolejne-której-dotyczy-wniosek", form.imieKolejneKtorejDotyczyWniosek);
  setField("nazwisko-której-dotyczy-wniosek", form.nazwiskoKtorejDotyczyWniosek);

  if (form.plec === "kobieta") {
    setField("płeć-kobieta","X");
    setField("płeć-mężczyzna","");
  } else if (form.plec === "mezczyzna") {
    setField("płeć-mężczyzna","X");
    setField("płeć-kobieta","");
  }

  // Data urodzenia
  if(form.dataUrodzenia){
    const[rok, miesiac, dzien] = form.dataUrodzenia.split("-");
    const digits = {
      dzien: (dzien || "").split(""),
      miesiac:(miesiac || "").split(""),
      rok: (rok || "").split(""),
    };
    setField("data-urodzenia-1", digits.dzien[0]);
    setField("data-urodzenia-2", digits.dzien[1]);
    setField("data-urodzenia-3", digits.miesiac[0]);
    setField("data-urodzenia-4", digits.miesiac[1]);
    setField("data-urodzenia-5", digits.rok[0]);
    setField("data-urodzenia-6", digits.rok[1]);
    setField("data-urodzenia-7", digits.rok[2]);
    setField("data-urodzenia-8", digits.rok[3]);
  }


  setField("kraj-urodzenia", form.krajUrodzenia);
  setField("kraj-miejsca-zamieszkania", form.krajMiejscaZamieszkania);

  // Obywatelstwo
  if(form.obywatelstwo === "obywatelstwo-polskie") {
    setField("obywatelstwo-polskie","X");
    setField("bezpaństwowiec","");
    setField("inne","");
    setField("obywatelstwo-inne","");
  } else if(form.obywatelstwo === "bezpaństwowiec") {
    setField("obywatelstwo-polskie","");
    setField("bezpaństwowiec","X");
    setField("inne","");
    setField("obywatelstwo-inne","");
  } else if(form.obywatelstwo === "inne") {
    setField("obywatelstwo-polskie","");
    setField("bezpaństwowiec","");
    setField("inne","X");
    setField("obywatelstwo-inne", form.obywatelstwoInne || "");
  }

  // 🔹 Dokumenty tożsamości
  const numerPaszportuDigits = (form.numerPaszportu || "").replace(/[^0-9A-Za-zА-Яа-я]/g, "").split("");
  [
    "seria-i-numer-paszportu-1","seria-i-numer-paszportu-2","seria-i-numer-paszportu-3",
    "seria-i-numer-paszportu-4","seria-i-numer-paszportu-5","seria-i-numer-paszportu-6",
    "seria-i-numer-paszportu-7","seria-i-numer-paszportu-8","seria-i-numer-paszportu-9",
    "seria-i-numer-paszportu-10","seria-i-numer-paszportu-11"
  ].forEach((fieldName,i)=>setField(fieldName,numerPaszportuDigits[i]));


  if(form.dataWaznosciPaszportu){
    const[rok, miesiac, dzien] = form.dataWaznosciPaszportu.split("-");
    const digits = {
      dzien: (dzien || "").split(""),
      miesiac:(miesiac || "").split(""),
      rok: (rok || "").split(""),
    };
    setField("data-ważności-paszportu-1", digits.dzien[0]);
    setField("data-ważności-paszportu-2", digits.dzien[1]);
    setField("data-ważności-paszportu-3", digits.miesiac[0]);
    setField("data-ważności-paszportu-4", digits.miesiac[1]);
    setField("data-ważności-paszportu-5", digits.rok[0]);
    setField("data-ważności-paszportu-6", digits.rok[1]);
    setField("data-ważności-paszportu-7", digits.rok[2]);
    setField("data-ważności-paszportu-8", digits.rok[3]);
  }
  const numerPodrozyDigits = (form.numerPodrozy || "").replace(/[^0-9A-Za-zА-Яа-я]/g, "").split("");
  [
    "seria-i-numer-dokumentu-podróży-1","seria-i-numer-dokumentu-podróży-2","seria-i-numer-dokumentu-podróży-3",
    "seria-i-numer-dokumentu-podróży-4","seria-i-numer-dokumentu-podróży-5","seria-i-numer-dokumentu-podróży-6",
    "seria-i-numer-dokumentu-podróży-7","seria-i-numer-dokumentu-podróży-8","seria-i-numer-dokumentu-podróży-9",
    "seria-i-numer-dokumentu-podróży-10","seria-i-numer-dokumentu-podróży-11"
  ].forEach((fieldName,i)=>setField(fieldName,numerPodrozyDigits[i]));

  if(form.dataWaznosciPodrozy){
    const[rok, miesiac, dzien] = form.dataWaznosciPodrozy.split("-");
    const digits = {
      dzien: (dzien || "").split(""),
      miesiac:(miesiac || "").split(""),
      rok: (rok || "").split(""),
    };
    setField("data-ważności-dokumentu-1", digits.dzien[0]);
    setField("data-ważności-dokumentu-2", digits.dzien[1]);
    setField("data-ważności-dokumentu-3", digits.miesiac[0]);
    setField("data-ważności-dokumentu-4", digits.miesiac[1]);
    setField("data-ważności-dokumentu-5", digits.rok[0]);
    setField("data-ważności-dokumentu-6", digits.rok[1]);
    setField("data-ważności-dokumentu-7", digits.rok[2]);
    setField("data-ważności-dokumentu-8", digits.rok[3]);
  }
  // 🔹 Dane dodatkowe
  setField("nazwisko-rodowe", form.nazwiskoRodowe);
  setField("miejsce-urodzenia", form.miejsceUrodzenia);
  setField("oznaczenie-aktu-urodzenia", form.oznaczenieAktuUrodzenia);
  setField("oznaczenie-urzędu-akt-urodzenia", form.oznaczenieUrzeduAktUrodzenia);
  setField("imię-ojca", form.imieOjca);
  setField("nazwisko-rodowe-ojca", form.nazwiskoRodoweOjca);
  setField("imię-matki", form.imieMatki);
  setField("nazwisko-rodowe-matki", form.nazwiskoRodoweMatki);

  const numerDowoduDigits = (form.numerDowodu || "").replace(/[^0-9A-Za-zА-Яа-я]/g, "").split("");
  [
    "seria-i-numer-dowódu-1","seria-i-numer-dowódu-2","seria-i-numer-dowódu-3","seria-i-numer-dowódu-4",
    "seria-i-numer-dowódu-5","seria-i-numer-dowódu-6","seria-i-numer-dowódu-7","seria-i-numer-dowódu-8",
    "seria-i-numer-dowódu-9","seria-i-numer-dowódu-10","seria-i-numer-dowódu-11"
  ].forEach((fieldName,i)=>setField(fieldName,numerDowoduDigits[i]));

  if(form.dataWaznosciDowodu){
    const[rok, miesiac, dzien] = form.dataWaznosciDowodu.split("-");
    const digits = {
      dzien: (dzien || "").split(""),
      miesiac:(miesiac || "").split(""),
      rok: (rok || "").split(""),
    };
    setField("data-ważności-dowódu-1", digits.dzien[0]);
    setField("data-ważności-dowódu-2", digits.dzien[1]);
    setField("data-ważności-dowódu-3", digits.miesiac[0]);
    setField("data-ważności-dowódu-4", digits.miesiac[1]);
    setField("data-ważności-dowódu-5", digits.rok[0]);
    setField("data-ważności-dowódu-6", digits.rok[1]);
    setField("data-ważności-dowódu-7", digits.rok[2]);
    setField("data-ważności-dowódu-8", digits.rok[3]);
  }

  setField("oznaczenie-organu-który-wydał-dowód", form.oznaczenieOrganuKtoryWydalDowod);

  // 🔹 Stan cywilny
  if(form.stanCywilny === "kawaler-panna") {
    setField("kawaler-panna","X");
    setField("żonaty-zamężna","");
    setField("imię-małżonka","");
    setField("nazwisko-rodowe-małżonka","");
    setField("rozwiedziony-rozwiedziona","");
    setField("wdowiec-wdowa","");
  } else if(form.stanCywilny === "żonaty-zamężna") {
    setField("kawaler-panna","");
    setField("żonaty-zamężna","X");
    setField("imię-małżonka", `${form.imieMalzonka || ""} ${form.nazwiskoRodoweMalzonka || ""}`.trim());
    setField("nazwisko-rodowe-małżonka", form.nazwiskoRodoweMalzonka || "");
    const numerPeselMalzonkaDigits = (form.numerPeselMalzonka || "").replace(/\D/g,"").split("");
    [
      "numer-pesel-małżonka-1","numer-pesel-małżonka-2","numer-pesel-małżonka-3","numer-pesel-małżonka-4",
      "numer-pesel-małżonka-5","numer-pesel-małżonka-6","numer-pesel-małżonka-7","numer-pesel-małżonka-8",
      "numer-pesel-małżonka-9","numer-pesel-małżonka-10","numer-pesel-małżonka-11"
    ].forEach((fieldName,i)=>setField(fieldName,numerPeselMalzonkaDigits[i]));
    setField("rozwiedziony-rozwiedziona","");
    setField("wdowiec-wdowa","");
  } else if(form.stanCywilny === "rozwiedziony-rozwiedziona") {
    setField("kawaler-panna","");
    setField("żonaty-zamężna","");
    setField("imię-małżonka","");
    setField("nazwisko-rodowe-małżonka","");
    setField("rozwiedziony-rozwiedziona","X");
    setField("wdowiec-wdowa","");
  } else if(form.stanCywilny === "wdowiec-wdowa") {
    setField("kawaler-panna","");
    setField("żonaty-zamężna","");
    setField("imię-małżonka","");
    setField("nazwisko-rodowe-małżonka","");
    setField("rozwiedziony-rozwiedziona","");
    setField("wdowiec-wdowa","X");
  }
  // 🔹 Zdazenia

  if(form.zdazenie === "zawarcie-związku"){
    setField("zawarcie-związku", "X");
    setField("rozwiązanie-związku","");
    setField("unieważnienie-związku", "");
    setField("zgon-małżonka", "");
    setField("zgon-małżonka-bez-daty-zgonu","")
  } else if(form.zdazenie === "rozwiązanie-związku"){
    setField("zawarcie-związku", "");
    setField("rozwiązanie-związku","X");
    setField("unieważnienie-związku", "");
    setField("zgon-małżonka", "");
    setField("zgon-małżonka-bez-daty-zgonu","")
  } else if(form.zdazenie === "unieważnienie-związku"){
    setField("zawarcie-związku", "");
    setField("rozwiązanie-związku","");
    setField("unieważnienie-związku", "X");
    setField("zgon-małżonka", "");
    setField("zgon-małżonka-bez-daty-zgonu","")
  } else if(form.zdazenie === "zgon-małżonka"){
    setField("zawarcie-związku", "");
    setField("rozwiązanie-związku","");
    setField("unieważnienie-związku", "");
    setField("zgon-małżonka", "X");
    setField("zgon-małżonka-bez-daty-zgonu","")
  } else if(form.zdazenie === "zgon-małżonka-bez-daty-zgonu"){
    setField("zawarcie-związku", "");
    setField("rozwiązanie-związku","");
    setField("unieważnienie-związku", "");
    setField("zgon-małżonka", "");
    setField("zgon-małżonka-bez-daty-zgonu","X")
  }
  if(form.dataZdazenia){
    const[rok, miesiac, dzien] = form.dataZdazenia.split("-");
    const digits = {
      dzien: (dzien || "").split(""),
      miesiac:(miesiac || "").split(""),
      rok: (rok || "").split(""),
    };
    setField("data-zdazenia-1", digits.dzien[0]);
    setField("data-zdazenia-2", digits.dzien[1]);
    setField("data-zdazenia-3", digits.miesiac[0]);
    setField("data-zdazenia-4", digits.miesiac[1]);
    setField("data-zdazenia-5", digits.rok[0]);
    setField("data-zdazenia-6", digits.rok[1]);
    setField("data-zdazenia-7", digits.rok[2]);
    setField("data-zdazenia-8", digits.rok[3]);
  }
  setField("oznaczenie-aktu-malzenstwa", form.oznaczenieAktuMalzenstwa);
  setField("oznaczenie-urzędu-stanu-cywilnego", form.oznaczenieUrzeduStanuCywilnego);
  if(form.version === "papierowa"){
    setField("papierowa", "X");
    setField("elektroniczna","");
  } else if(form.version ==="elektroniczna"){
    setField("papierowa", "");
    setField("elektroniczna", "X");
    setField("adres-elektroniczny", form.adresElektroniczny || "");
  }



  // Сохраняем PDF
  const pdfBytes = await pdfDoc.save();
  saveAs(new Blob([pdfBytes], { type: "application/pdf" }), "wypelniony_formularz_PESEL.pdf");
}
