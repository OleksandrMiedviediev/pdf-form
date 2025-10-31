import { PDFDocument } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import { saveAs } from "file-saver";

export async function fillPdf(form) {
  const existingPdfBytes = await fetch("/wniosek-o-zwrot-opłaty-skarbowej-za-zezwolenie-na-pobyt.pdf").then(res => res.arrayBuffer());
  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  pdfDoc.registerFontkit(fontkit);

  const fontBytes = await fetch("/NotoSans-VariableFont_wdth,wght.ttf").then(res => res.arrayBuffer());
  const customFont = await pdfDoc.embedFont(fontBytes);

  const formPdf = pdfDoc.getForm();

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
  setField("imię-i-nazwisko-1", form.imieNazwisko);
  setField("data-urodzenia", form.dataUrodzenia);
  setField("obywatelstwo", form.obywatelstwo);
  setField("nr-sprawy", form.nrSprawy);

  // Miejscowość urzędu
  setField("miejscowość-urzędu", form.miejscowoscUrzedu);
  setField("data-wypelnienia", form.dataWypelnienia);

  // przedmiot udzielenia
  if (form.przedmiotUdzielenia === "zezwolenia na pobyt czasowy") {
    setField("przedmiot-udzielenia", "zezwolenie na pobyt czasowy");
  } else if (form.przedmiotUdzielenia === "pobyt stały") {
    setField("przedmiot-udzielenia", "pobyt stały");
  } else if (form.przedmiotUdzielenia === "pobyt rezydenta długoterminowego UE") {
    setField("przedmiot-udzielenia", "pobyt rezydenta długoterminowego UE");
  }

  // kwota
  if (form.kwota === "340 zł.") {
    setField("kwota", "340");
  } else if (form.kwota === "440 zł.") {
    setField("kwota", "440");
  } else if (form.kwota === "640 zł.") {
    setField("kwota", "640");
  }

  if(form.formaZwrotu === "na rachunek bankowy"){
    setField("na-rachunek","X");
    const nrKontaDigits = (form.nrKonta || "").replace(/[^0-9A-Za-zА-Яа-я]/g, "").split("");
  [
    "nr-konta-1",
    "nr-konta-2",
    "nr-konta-3",
    "nr-konta-4",
    "nr-konta-5",
    "nr-konta-6",
    "nr-konta-7",
    "nr-konta-8",
    "nr-konta-9",
    "nr-konta-10",
    "nr-konta-11",
    "nr-konta-12",
    "nr-konta-13",
    "nr-konta-14",
    "nr-konta-15",
    "nr-konta-16",
    "nr-konta-17",
    "nr-konta-18",
    "nr-konta-19",
    "nr-konta-20",
    "nr-konta-21",
    "nr-konta-22",
    "nr-konta-23",
    "nr-konta-24",
    "nr-konta-25",
    "nr-konta-26"
  ].forEach((fieldName,i)=>setField(fieldName,nrKontaDigits[i]));
  setField("na-adress","");
  } else if(form.formaZwrotu === "na adres"){
    setField("na-rachunek","");
  setField("na-adress","X");
  setField("imię-i-nazwisko-2",form.imieNazwisko2);
  setField("dokladny-adress",form.dokladnyAdress);
}

  setField("data-zaplaty", form.dataZaplaty);

  setField("uzasadnienie", form.uzasadnienie)

  setField("ulica-i-numer-domu", form.ulica);



  // Kod pocztowy
  const kodPocztowyDigits = (form.kodPocztowy || "").replace(/\D/g, "").split("");
  [ "kod-pocztowy-1",
    "kod-pocztowy-2",
    "kod-pocztowy-3",
    "kod-pocztowy-4",
    "kod-pocztowy-5"
]
    .forEach((fieldName,i)=>setField(fieldName,kodPocztowyDigits[i]));

  setField("miejscowość-wnioskodawcy", form.miejscowoscWnioskodawcy);


  const pdfBytes = await pdfDoc.save();
  saveAs(new Blob([pdfBytes], { type: "application/pdf" }), "wypelniony_formularz_zwrot-opłaty.pdf");
}
