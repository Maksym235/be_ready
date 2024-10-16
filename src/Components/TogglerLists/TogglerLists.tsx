import { FC, useState } from 'react';
import styles from './ToggleLists.module.css';
interface IProps {
  toggle: (key: string) => void;
  requests: {
    friends: string[];
    trips: string[];
  };
}
export const TogglerLists: FC<IProps> = ({ toggle, requests }) => {
  const [currentList, setCurrentList] = useState('personal');

  const toggleCurrentList = (key: string) => {
    setCurrentList(key);
    toggle(key);
  };
  return (
    <div className={styles.container}>
      <div className={styles.toggle_wrapper}>
        <div
          className={
            currentList === 'personal'
              ? `${styles.toggle_background} ${styles.left}`
              : `${styles.toggle_background} ${styles.right}`
          }
        ></div>
        <button
          onClick={() => toggleCurrentList('personal')}
          className={
            currentList === 'personal'
              ? `${styles.btn} ${styles.active}`
              : `${styles.btn}`
          }
        >
          Personal
        </button>
        <button
          onClick={() => toggleCurrentList('shared')}
          className={
            currentList === 'shared'
              ? `${styles.btn} ${styles.active}`
              : `${styles.btn} `
          }
        >
          Shared
          {requests.trips.length > 0 && (
            <div className={styles.requests_count}>{requests.trips.length}</div>
          )}
        </button>
      </div>
    </div>
  );
};
