import { FC } from 'react';
import styles from './SliderCard.module.css';
import { ISliderCardProps } from '../../../../Types/Components/Home';
export const SliderCard: FC<ISliderCardProps> = ({ title, content }) => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>{title}</p>
      <p className={styles.content}>{content}</p>
    </div>
  );
};
