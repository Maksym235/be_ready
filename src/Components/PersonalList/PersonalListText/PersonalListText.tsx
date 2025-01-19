import styles from './PersonalListText.module.css';
export const PersonalListText = ({ isEmpty }: { isEmpty: boolean }) => {
  return (
    <>
      {isEmpty ? (
        <div className={styles.container}>
          <p className={styles.title}>
            You don&rsquo;t have any lists of things created yet.
          </p>
          <p className={styles.content}>
            Let&rsquo;s create a new one by clicking the &quot;+&quot; in the
            lower right corner
          </p>
        </div>
      ) : (
        <div className={styles.container}>
          <p className={styles.title}>
            All personal lists are presented below.
          </p>
          <p className={styles.content}>
            You can always add a new list by clicking &quot;+&quot; in the lower
            right corner
          </p>
        </div>
      )}
    </>
  );
};
