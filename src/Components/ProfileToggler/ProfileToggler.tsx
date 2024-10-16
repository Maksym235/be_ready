import { useState } from 'react';
import styles from './ProfileToggler.module.css';
// import { useQuery } from '@tanstack/react-query';
// import { getUserRequests } from '../../Pages/Home/api';
export const ProfileToggler = ({ toggle, requests }: any) => {
  const [currentList, setCurrentList] = useState('info');
  const toggleCurrentList = (key: string) => {
    setCurrentList(key);
    toggle(key);
  };
  return (
    <div className={styles.container}>
      <div className={styles.toggle_wrapper}>
        <div
          className={
            currentList === 'info'
              ? `${styles.toggle_background} ${styles.left}`
              : `${styles.toggle_background} ${styles.right}`
          }
        ></div>
        <button
          onClick={() => toggleCurrentList('info')}
          className={
            currentList === 'info'
              ? `${styles.btn} ${styles.active}`
              : `${styles.btn}`
          }
        >
          Informations
        </button>
        <button
          onClick={() => toggleCurrentList('friends')}
          className={
            currentList === 'friends'
              ? `${styles.btn} ${styles.active}`
              : `${styles.btn} `
          }
        >
          Friends
          {requests?.friends.length > 0 && (
            <div className={styles.requests_count}>
              {requests?.friends.length}
            </div>
          )}
          {/* {requestData && requestData.requests.friends.length > 0 &&
                  <div className={styles.requests_count}>
                    {requestData.requests.friends.length}
                  </div>
                } */}
        </button>
      </div>
    </div>
  );
};
