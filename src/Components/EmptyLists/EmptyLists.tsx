import { FC } from 'react';
import styles from './EmptyLists.module.css';
import copy from '../../assets/icon_copy.svg';
import { IEmptyListsProps } from '../../Types/Components/Lists';

export const EmptyLists: FC<IEmptyListsProps> = ({ list }) => {
  return (
    <>
      {list === 'personal' ? (
        <div className={styles.container}>
          <p className={styles.title}>
            You don't have any lists of things created yet.
          </p>
          <p className={styles.content}>
            Let's create a new one by clicking the "+" in the lower right corner
          </p>
        </div>
      ) : (
        <div className={styles.container}>
          <p className={styles.title}>
            You have not yet been invited to shared lists.
          </p>
          <p className={styles.content}>
            You can share your ID with the author of the list they want to add
            you to
          </p>
          <div className={styles.bnt_wrapper}>
            <p className={styles.id}>a3d912F019</p>
            <button className={styles.copy_id}>
              <img src={copy} />
              Copy id
            </button>
          </div>
        </div>
      )}
    </>
  );
};
