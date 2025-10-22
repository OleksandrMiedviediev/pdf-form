import { Link } from "react-router-dom";
import css from "./HomePage.module.css";
import { useTranslation } from 'react-i18next';

export default function HomePage() {

  const { t } = useTranslation('homePage');

  return (
    <div className={css.home}>
      <div>
        <h1 className={css.homeTitle}>{t('homeTitle')}</h1>
        <p className={css.homeSubtitle}>
        {t('homeSubtitle')} 🇵🇱
        </p>

        <div className={css.homeSection}>
          <h2>📘 {t('homeSection')}</h2>
          <p>
          {t('homeP')}
          </p>
        </div>
        <div className={css.homeButtons}> 
        <Link className={css.btn} to="/documents">🗂️ {t('btn')}</Link>
        </div>
      </div>
    </div>
  );
}
