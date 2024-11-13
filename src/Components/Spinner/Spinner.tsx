import { FC } from 'react';
import styles from './Spinner.module.css';
export const Spinner: FC = () => {
  return (
    <div className={styles.container}>
      <span className={styles.loader}></span>
    </div>
  );
};
