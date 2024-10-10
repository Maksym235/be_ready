import { FC } from 'react';
import styles from './PersonalItem.module.css';

export interface IPersonalItemProps {
  name: string;
}
export const PersonalItem: FC<IPersonalItemProps> = ({ name }) => {
  return (
    <div className={styles.container}>
      <p className={styles.name}>{name}</p>
    </div>
  );
};
