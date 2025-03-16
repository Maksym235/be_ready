import { FC } from 'react';
import styles from './ShortDesc.module.css';
import { useNavigate } from 'react-router-dom';
import { IShortDescProps } from '../../Types/Components/Lists';
import { CButton } from '../Button/Button';

export const ShortDesc: FC<IShortDescProps> = ({ toggleModal }) => {
  const navigate = useNavigate();
  const handleGetStarted = () => {
    if (JSON.parse(localStorage.getItem('isLoggedIn')!)) {
      navigate('/lists');
      return;
    }
    toggleModal();
  };
  return (
    <div className={styles.container}>
      <p className={styles.text}>
        BeReady is a cutting-edge tool designed to simplify the packing process,
        ensuring you have everything you need for a successful and enjoyable
        hiking trip.
      </p>
      <div className={styles.btn_wrapper}>
        <CButton
          disabled={false}
          htmlType='button'
          onClickFn={handleGetStarted}
          type='primary'
        >
          get started
        </CButton>
        <CButton disabled={false} htmlType='button' type='secondary'>
          Learn more
        </CButton>
        {/* <button className={styles.lear_more}>
          <span className={styles.lear_more_text}>Lear more</span>
        </button> */}
      </div>
    </div>
  );
};
