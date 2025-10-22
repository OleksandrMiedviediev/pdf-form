import { NavLink } from 'react-router-dom';
import css from './Navigation.module.css';
import clsx from 'clsx';
import { useTranslation } from "react-i18next";


const NavLinkClass = ({ isActive }) => clsx(css.link, isActive && css.active);

export default function Navigation() {
    const { i18n } = useTranslation();

    const handleLanguageChange = (e) => {
        const lang = e.target.value;
        i18n.changeLanguage(lang);
        localStorage.setItem("appLanguage", lang);
    };
    const { t } = useTranslation('navigation');
    return (
        <nav className={css.container}>
            <div>
                <NavLink to="/" className={NavLinkClass}>{t('home')}</NavLink>
                <NavLink to="/documents" className={NavLinkClass}>{t('documents')}</NavLink>
            </div>
            <div>
                <label htmlFor="language-select" className={css.srOnly}></label>
                <select
                    id="language-select"
                    value={i18n.language || "pl"}
                    onChange={handleLanguageChange}
                    className={css.languageSwitcher}
                >
                    <option value="pl">🇵🇱 PL</option>
                    <option value="en">🇬🇧 EN</option>
                    <option value="ua">🇺🇦 UA</option>
                </select>
            </div>
        </nav>
    );
}