import { Link } from "react-router-dom";
import css from "./HomePage.module.css";

export default function HomePage() {
  return (
    <div className={css.home}>
      <div>
        <h1 className={css.homeTitle}>Documents Portal</h1>
        <p className={css.homeSubtitle}>
          Twój przewodnik po formalnościach w Polsce 🇵🇱
        </p>

        <div className={css.homeSection}>
          <h2>📘 O stronie</h2>
          <p>
            Ten serwis został stworzony, aby pomóc cudzoziemcom mieszkającym w
            Polsce w zrozumieniu i przygotowaniu dokumentów takich jak meldunek i inne.
          </p>
        </div>

        <div className={css.homeSection}>
          <h2>🌍 About the site</h2>
          <p>
            This website helps foreigners living in Poland understand and prepare
            required documents such as temporary residence registration (meldunek) and more.
          </p>
        </div>

        <div className={css.homeSection}>
          <h2>📄 Про сайт</h2>
          <p>
            Цей сайт створений, щоб допомогти іноземцям у Польщі зрозуміти та
            підготувати документи, такі як тимчасова реєстрація (meldunek) та інші.
          </p>
        </div>
        <div className={css.homeButtons}> 
        <Link className={css.btn} to="/meldunek">📝 Meldunek</Link>
        <Link className={css.btn} to="/pesel">📝 Pesel</Link>
        </div>
      </div>
    </div>
  );
}
