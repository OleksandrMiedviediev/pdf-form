import { Link } from "react-router-dom";
import css from "./DocumentsPage.module.css";
import { useTranslation } from "react-i18next";


export default function DocumentsPage() {
  const { t } = useTranslation('documentsPage');
  return (
    <div className={css.home}>
      <div>
        <h1 className={css.homeTitle}>{t('homeTitle')}</h1>
        <p className={css.homeSubtitle}>
          {t('homeSubtitle')} 🇵🇱
        </p>
        <div className={css.homeSection}>
            <h3>{t('homeSectionPesel')}</h3>
        </div>

        <div className={css.homeButtons}> 
        <Link className={css.btn} to="/pesel">📝 {t('btnPesel')}</Link>
        <Link className={css.btn} to="/meldunek">📝 {t('btnMeldunek')}</Link>        
        </div>

        <div className={css.homeSection}>
            <h3>{t('homeSectionKP')}</h3>
        </div>

        <div className={css.homeButtons}> 
        <Link className={css.btn} to="/umozenie">📝 {t('btnUmorzenie')}</Link>
        </div>

        <div className={css.homeButtons}> 
        <Link className={css.btn} to="/zaswiadczenie">📝 {t('btnZaswiadczenie')}</Link>
        </div>

        <div className={css.homeButtons}> 
        <Link className={css.btn} to="/zwrot-oplaty-skarbowej">📝 {t('btnZwrotOplatySkarbowej')}</Link>
        </div>

        <div className={css.homeButtons}> 
        <Link className={css.btn} to="/zwrot-oplaty-za-KP">📝 {t('btnZwrotOplatySkarbowejKP')}</Link>
        </div>

      </div>
    </div>
  );
}
