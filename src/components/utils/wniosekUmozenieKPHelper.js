import { PDFDocument } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import { saveAs } from "file-saver";

export async function fillPdf(form) {
  // Загружаем исходный PDF (положи его в public/formularzPesel.pdf)
  const existingPdfBytes = await fetch("/wniosek-o-umorzenie.pdf").then(res => res.arrayBuffer());
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
  setField("imie i nazwisko", form.imieNazwisko);
  setField("data urodzenia", form.dataUrodzenia);
  setField("obywatelstwo", form.obywatelstwo);
  setField("nr sprawy", form.nrSprawy);

  // Miejscowość urzędu
  setField("miejscowość urzędu", form.miejscowoscUrzedu);
  setField("data wypelnienia", form.dataWypelnienia);

  // przedmiot udzielenia
  if (form.przedmiotUdzielenia === "zezwolenia na pobyt czasowy") {
    setField("przedmiot udzielenia", "zezwolenie na pobyt czasowy");
  } else if (form.przedmiotUdzielenia === "pobyt stały") {
    setField("przedmiot udzielenia", "pobyt stały");
  } else if (form.przedmiotUdzielenia === "pobyt rezydenta długoterminowego UE") {
    setField("przedmiot udzielenia", "pobyt rezydenta długoterminowego UE");
  }

  setField("ulica", form.ulica);
  setField("numer ulicy", form.numerUlicy);



  // Kod pocztowy
  const kodPocztowyDigits = (form.kodPocztowy || "").replace(/\D/g, "").split("");
  [ "kod pocztowy 1",
    "kod pocztowy 2",
    "kod pocztowy 3",
    "kod pocztowy 4",
    "kod pocztowy 5"
]
    .forEach((fieldName,i)=>setField(fieldName,kodPocztowyDigits[i]));

  setField("miejscowość wnioskodawcy", form.miejscowoscWnioskodawcy);


  // Сохраняем PDF
  const pdfBytes = await pdfDoc.save();
  saveAs(new Blob([pdfBytes], { type: "application/pdf" }), "wypelniony_formularz_PESEL.pdf");
}
