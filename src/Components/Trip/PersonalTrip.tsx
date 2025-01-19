import styles from './PersonalTrip.module.css';
export const PersonalTrip = ({ name }: { name: string }) => {
  return (
    <div className={styles.container}>
      <p className={styles.name}>{name}</p>
    </div>
  );
};
