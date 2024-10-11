import { FC } from 'react';
import styles from './Footer.module.css';
export const Footer: FC = () => {
  return (
    <div className={styles.container}>
      <p className={styles.text}>&#169;BeReady2023.</p>
    </div>
  );
};
