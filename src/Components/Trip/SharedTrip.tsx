import styles from './SharedTrip.module.css';
export const SharedTrip = ({ name }: { name: string }) => {
  return (
    <div className={styles.container}>
      <p className={styles.name}>{name}</p>
    </div>
  );
};
