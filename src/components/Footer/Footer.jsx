import React from "react";
import styles from "./Footer.module.css";
import { useTranslation } from "react-i18next";

export default function Footer({
  links = {
    linkedin: "https://www.linkedin.com/in/miedolek/",
    telegram: "https://t.me/miedolek",
    github: "https://github.com/OleksandrMiedviediev",
  },
}) 

{
  const { t } = useTranslation('navigation');
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <h3 className={styles.title}>{t('title')}:</h3>

        <div className={styles.contactRow}>
          <nav className={styles.social} aria-label="Social links">
            <a
              href={links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              💼 LinkedIn
            </a>
            <a
              href={links.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              💬 Telegram
            </a>
            <a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              🧑‍💻 GitHub
            </a>
          </nav>
        </div>
        <p>© 2025 Documents Portal</p>
      </div>
    </footer>
  );
}
