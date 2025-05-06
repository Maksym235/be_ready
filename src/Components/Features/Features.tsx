import { FC } from 'react';
import styles from './Features.module.css';
import { SliderWrapper } from './Slider/Slider';
import { useTranslation } from 'react-i18next';
export const Features: FC = () => {
  const { t } = useTranslation();
  return (
    <div id='features' className={styles.features}>
      <p className={styles.title}>{t('features.title')}:</p>
      <SliderWrapper />
    </div>
  );
};
