import { FC } from 'react';
import styles from './ContactUs.module.css';
export const ContactUs: FC = () => {
  return (
    <div id='contactUs' className={styles.background}>
      <div className={styles.container}>
        <p className={styles.title}>Contact us:</p>
        <div className={styles.btn_container}>
          <button className={styles.btn}>Instagram</button>
          <button className={styles.btn}>Telegram</button>
        </div>
        <div className={styles.email_container}>
          <p className={styles.email_label}>Email:</p>
          <h3 className={styles.email}>Beready@gmail.com</h3>
        </div>
      </div>
    </div>
  );
};
