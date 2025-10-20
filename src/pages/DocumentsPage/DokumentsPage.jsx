import { Link } from "react-router-dom";
import css from "./DocumentsPage.module.css";

export default function DocumentsPage() {
  return (
    <div className={css.home}>
      <div>
        <h1 className={css.homeTitle}>Documents Portal</h1>
        <p className={css.homeSubtitle}>
          Twój przewodnik po formalnościach w Polsce 🇵🇱
        </p>
        <div className={css.homeSection}>
            <h3>Wniosek o nadanie numeru PESEL oraz zameldowanie</h3>
        </div>

        <div className={css.homeButtons}> 
        <Link className={css.btn} to="/meldunek">📝 Meldunek</Link>
        <Link className={css.btn} to="/pesel">📝 Pesel</Link>
        </div>
        
      </div>
    </div>
  );
}
