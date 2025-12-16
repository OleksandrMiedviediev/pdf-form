import { PDFDocument } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import { saveAs } from "file-saver";

export async function fillPdf(form) {
  // Загружаем исходный PDF (положи его в public/formularzPesel.pdf)
  const existingPdfBytes = await fetch("/wniosek-o-wydanie-zaswiadczenie.pdf").then(res => res.arrayBuffer());
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
  setField("miejscowość", form.miejscowosc);
  setField("data", form.date);
  setField("imię-i-nazwisko", form.imieNazwisko);
  setField("kod-pocztowy", form.kodPocztowy);
  setField("ulica-i-numer-mieszkania-1", form.ulicaNumerMieszkania1);
  setField("ulica-i-numer-mieszkania-2", form.ulicaNumerMieszkania2);
  setField("miasto-zamieszkania", form.miastoZamieszkania);
  setField("reprezentowany-przez-1", form.reprezentowanyPrzez1);
  setField("reprezentowany-przez-2", form.reprezentowanyPrzez2);

  // Miejscowość urzędu

  if(form.urzad === "Dolnośląski Urząd Wojewódzki Wydział Spraw Obywatelskich i Cudzoziemców"){
    setField("urząd", "Dolnośląski Urząd Wojewódzki Wydział Spraw Obywatelskich i Cudzoziemców");
    setField("adres-urzędu", "pl. Powstańców Warszawy 1, 50-153 Wrocław")
  } else if (form.urzad === "Kujawsko-Pomorski Urząd Wojewódzki Wydział Spraw Obywatelskich i Cudzoziemców") {
    setField("urząd", "Kujawsko-Pomorski Urząd Wojewódzki Wydział Spraw Obywatelskich i Cudzoziemców");
    setField("adres-urzędu", "ul. Konarskiego 1-3, 85-066 Bydgoszcz") 
  } else if (form.urzad === "Lubelski Urząd Wojewódzki w Lublinie Wydział Spraw Obywatelskich i Cudzoziemców") {
    setField("urząd", "Lubelski Urząd Wojewódzki w Lublinie Wydział Spraw Obywatelskich i Cudzoziemców");
    setField("adres-urzędu", "ul. Czechowska 15, 20-072 Lublin")
  } else if (form.urzad === "Lubuski Urząd Wojewódzki w Gorzowie Wielkopolskim Wydział Spraw Obywatelskich i Cudzoziemców") {
    setField("urząd", "Lubuski Urząd Wojewódzki w Gorzowie Wielkopolskim Wydział Spraw Obywatelskich i Cudzoziemców");
    setField("adres-urzędu", "ul. Jagiellończyka 8, 66-400 Gorzów Wielkopolski")
  } else if (form.urzad === "Łódzki Urząd Wojewódzki w Łodzi Wydział Spraw Cudzoziemców") {
    setField("urząd", "Łódzki Urząd Wojewódzki w Łodzi Wydział Spraw Cudzoziemców");
    setField("adres-urzędu", "ul. Piotrkowska 103, 90-425 Łódź")
  } else if (form.urzad === "Małopolski Urząd Wojewódzki w Krakowie Wydział Spraw Cudzoziemców") {
    setField("urząd", "Małopolski Urząd Wojewódzki w Krakowie Wydział Spraw Cudzoziemców");
    setField("adres-urzędu", "ul. Przy Rondzie 6, 31-547 Kraków")
  } else if (form.urzad === "Mazowiecki Urząd Wojewódzki w Warszawie Wydział Spraw Cudzoziemców") {
    setField("urząd", "Mazowiecki Urząd Wojewódzki w Warszawie Wydział Spraw Cudzoziemców");
    setField("adres-urzędu", "ul. Marszałkowska 3/5, 00-624 Warszawa")
  } else if (form.urzad === "Opolski Urząd Wojewódzki w Opolu Wydział Spraw Obywatelskich i Cudzoziemców") {
    setField("urząd", "Opolski Urząd Wojewódzki w Opolu Wydział Spraw Obywatelskich i Cudzoziemców");
    setField("adres-urzędu", "ul. Piastowska 14, 45-082 Opole")
  } else if (form.urzad === "Podkarpacki Urząd Wojewódzki w Rzeszowie Wydział Spraw Obywatelskich i Cudzoziemców") {
    setField("urząd", "Podkarpacki Urząd Wojewódzki w Rzeszowie Wydział Spraw Obywatelskich i Cudzoziemców");
    setField("adres-urzędu", "ul. Grunwaldzka 15, 35-959 Rzeszów")
  } else if (form.urzad === "Podlaski Urząd Wojewódzki w Białymstoku Wydział Spraw Obywatelskich i Cudzoziemców") {
    setField("urząd", "Podlaski Urząd Wojewódzki w Białymstoku Wydział Spraw Obywatelskich i Cudzoziemców");
    setField("adres-urzędu", "ul. Mickiewicza 3, 15-213 Białystok")
  } else if (form.urzad === "Pomorski Urząd Wojewódzki w Gdańsku Wydział Wydział Spraw Obywatelskich i Cudzoziemców") {
    setField("urząd", "Pomorski Urząd Wojewódzki w Gdańsku Wydział Spraw Obywatelskich i Cudzoziemców");
    setField("adres-urzędu", "ul. Chmielna 74/76, 80-748 Gdańsk")
  } else if (form.urzad === "Śląski Urząd Wojewódzki w Katowicach Wydział Spraw Obywatelskich i Cudzoziemców") {
    setField("urząd", "Śląski Urząd Wojewódzki w Katowicach Wydział Spraw Obywatelskich i Cudzoziemców");
    setField("adres-urzędu", "ul. Jagiellońska 25, 40-032 Katowice")
  } else if (form.urzad === "Świętokrzyski Urząd Wojewódzki w Kielcach Wydział Spraw Obywatelskich i Cudzoziemców") {
    setField("urząd", "Świętokrzyski Urząd Wojewódzki w Kielcach Wydział Spraw Obywatelskich i Cudzoziemców");
    setField("adres-urzędu", "al. IX Wieków Kielc 3, 25-516 Kielce")
  } else if (form.urzad === "Warmińsko-Mazurski Urząd Wojewódzki w Olsztynie Wydział Spraw Obywatelskich i Cudzoziemców") {
    setField("urząd", "Warmińsko-Mazurski Urząd Wojewódzki w Olsztynie Wydział Spraw Obywatelskich i Cudzoziemców");
    setField("adres-urzędu", "Al. Marsz. J. Piłsudskiego 7/9, 10-575 Olsztyn")
  } else if (form.urzad === "Wielkopolski Urząd Wojewódzki w Poznaniu Wydział Spraw Obywatelskich i Cudzoziemców") {
    setField("urząd", "Wielkopolski Urząd Wojewódzki w Poznaniu Wydział Spraw Obywatelskich i Cudzoziemców");
    setField("adres-urzędu", "pl. Wolności 17, 61-739 Poznań")
  } else if (form.urzad === "Zachodniopomorski Urząd Wojewódzki w Szczecinie Wydział Spraw Obywatelskich i Cudzoziemców") {
    setField("urząd", "Zachodniopomorski Urząd Wojewódzki w Szczecinie Spraw Obywatelskich i Cudzoziemców");
    setField("adres-urzędu", "ul. Wały Chrobrego 4, 70-502 Szczecin")
  }


  setField("imię-i-nazwisko-wnióskodawcy", form.imieNazwiskoWnioskodawcy);
  setField("numer-paszportu", form.numerPaszportu);
  
  
  // przedmiot udzielenia
  if (form.przedmiotUdzielenia === "zezwolenia na pobyt czasowy") {
    setField("jaki-wniosek", "zezwolenie na pobyt czasowy");
  } else if (form.przedmiotUdzielenia === "pobyt stały") {
    setField("jaki-wniosek", "pobyt stały");
  } else if (form.przedmiotUdzielenia === "pobyt rezydenta długoterminowego UE") {
    setField("jaki-wniosek", "pobyt rezydenta długoterminowego UE");
  }

  setField("ulica", form.ulica);
  setField("numer-ulicy", form.numerUlicy);



  // Kod pocztowy
  const kodPocztowyDigits = (form.kodPocztowy || "").replace(/\D/g, "").split("");
  [ "kod-pocztowy-1",
    "kod-pocztowy-2",
    "kod-pocztowy-3",
    "kod-pocztowy-4",
    "kod-pocztowy-5"
]
    .forEach((fieldName,i)=>setField(fieldName,kodPocztowyDigits[i]));

  setField("miasto", form.miasto);

  // Сохраняем PDF
  const pdfBytes = await pdfDoc.save();
  saveAs(new Blob([pdfBytes], { type: "application/pdf" }), "wypelniony_formularz_Zaswiadczenie.pdf");
}
