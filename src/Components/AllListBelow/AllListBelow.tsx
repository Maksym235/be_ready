import { FC } from 'react';
import styles from './AllListBelow.module.css';
import copy from '../../assets/icon_copy.svg';
import toast from 'react-hot-toast';
interface IProps {
  list: string;
  id: string;
}
export const AllListBelow: FC<IProps> = ({ list, id }) => {
  const handdleCopy = (id: string) => {
    toast.success('Скопійовано');
    navigator.clipboard.writeText(id);
  };
  return (
    <>
      {list === 'personal' ? (
        <div className={styles.container}>
          <p className={styles.title}>
            All personal lists are presented below.
          </p>
          <p className={styles.content}>
            You can always add a new list by clicking “+” in the lower right
            corner
          </p>
        </div>
      ) : (
        <div className={styles.container}>
          <p className={styles.title}>All shared lists are presented below.</p>
          <p className={styles.content}>
            You can share your ID with the author of the list they want to add
            you to.
          </p>
          <div className={styles.bnt_wrapper}>
            <p className={styles.id}>
              {id.slice(id.length - 10, id.length - 1)}
            </p>
            <button
              type='button'
              onClick={() => handdleCopy(id)}
              className={styles.copy_id}
            >
              <img src={copy} />
              Copy id
            </button>
          </div>
        </div>
      )}
    </>
  );
};
