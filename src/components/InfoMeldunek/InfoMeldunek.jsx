import { Accordion, AccordionItem } from '@szhsin/react-accordion';
import css from "./InfoMeldunek.module.css";
import { useTranslation } from 'react-i18next';

export default function InfoMeldunek() {
  const { t } = useTranslation('infoMeldunek');

  const listItems = t('prepareList.items', { returnObjects: true });
  const ownershipItems = t('prepareList.ownershipItems', { returnObjects: true });

  return (
    <Accordion className={css.infoBox}>

      <AccordionItem
        className={css.item}
        header={t('headerOne')}
      >
        <p>{t('accordionPOne')}</p>
        <p>{t('accordionPTwo')}</p>
        <ul>
          <li>{t('liOne')}</li>
          <li>{t('liTwo')}</li>
        </ul>
      </AccordionItem>

      <AccordionItem
        className={css.item}
        header={t('headerTwo')}
      >
        <p>{t('prepareTextOne')}</p>
        <p>{t('prepareTextTwo')}</p>
        <ul>
          <li>{t('prepareList.main')}</li>
          <li>{t('prepareList.oneOf')}</li>
          <ul>
            {listItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <li>{t('prepareList.ownership')}</li>
          <ul>
            {ownershipItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <li>{t('prepareList.other')}</li>
        </ul>
      </AccordionItem>

    </Accordion>
  );
}
