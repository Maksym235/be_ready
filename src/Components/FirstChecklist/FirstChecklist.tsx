import { FC } from 'react';
import styles from './FirstChecklist.module.css';
import { IFirstChecklistProps } from '../../Types/Components/Lists';
import { CButton } from '../Button/Button';

export const FirstChecklist: FC<IFirstChecklistProps> = ({ toggleModal }) => {
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <p className={styles.title}>ready to create first checklist?</p>
        <CButton
          onClickFn={toggleModal}
          type='full'
          htmlType='button'
          disabled={false}
        >
          Sing up
        </CButton>
        {/* <button onClick={toggleModal} className={styles.btn}>
          Sing up
        </button> */}
      </div>
    </div>
  );
};
