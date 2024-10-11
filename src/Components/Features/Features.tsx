import { FC } from 'react';
import styles from './Features.module.css';
import { SliderWrapper } from './Slider/Slider';
export const Features: FC = () => {
  return (
    <div id='features' className={styles.features}>
      <p className={styles.title}>Features:</p>
      <SliderWrapper />
    </div>
  );
};
