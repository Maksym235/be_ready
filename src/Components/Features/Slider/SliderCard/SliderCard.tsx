import { FC } from 'react';
import styles from './SliderCard.module.css';
import { ISliderCardProps } from '../../../../Types/Components/Home';
import { useTranslation } from 'react-i18next';
export const SliderCard: FC<ISliderCardProps> = ({ title, content }) => {
  const { t } = useTranslation();
  return (
    <div className={styles.container}>
      <p className={styles.title}>{t(title)}</p>
      <p className={styles.content}>{t(content)}</p>
    </div>
  );
};
