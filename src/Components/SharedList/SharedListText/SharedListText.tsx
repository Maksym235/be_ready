import styles from './SharedListText.module.css';
import copy from '../../../assets/icon_copy.svg';
import toast from 'react-hot-toast';
export const SharedListText = ({ isEmpty }: { isEmpty: boolean }) => {
  const user = JSON.parse(localStorage.getItem('user')!);
  const handdleCopy = (id: string) => {
    toast.success('Скопійовано');
    navigator.clipboard.writeText(id);
  };
  return (
    <>
      {isEmpty ? (
        <div className={styles.container}>
          <p className={styles.title}>
            You have not yet been invited to shared lists.
          </p>
          <p className={styles.content}>
            You can share your ID with the author of the list they want to add
            you to
          </p>
          <div className={styles.bnt_wrapper}>
            <p className={styles.id}>
              {user.id.slice(user.id.length - 10, user.id.length - 1)}
            </p>
            <button
              type='button'
              onClick={() => handdleCopy(user.id)}
              className={styles.copy_id}
            >
              <img src={copy} />
              Copy id
            </button>
          </div>
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
              {user.id.slice(user.id.length - 10, user.id.length - 1)}
            </p>
            {/* <button className={styles.copy_id}>
              <img src={copy} alt='copy icon' width={20} height={20} />
              Copy id
            </button> */}

            <button
              type='button'
              onClick={() => handdleCopy(user.id)}
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
