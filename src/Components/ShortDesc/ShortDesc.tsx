import { FC } from 'react';
import styles from './ShortDesc.module.css';
import { useNavigate } from 'react-router-dom';
import { IShortDescProps } from '../../Types/Components/Lists';
import { CButton } from '../Button/Button';
import { useTranslation } from 'react-i18next';

export const ShortDesc: FC<IShortDescProps> = ({ toggleModal }) => {
  const { t } = useTranslation();
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
      <p className={styles.text}>{t('shortDesc')}</p>
      <div className={styles.btn_wrapper}>
        <CButton
          disabled={false}
          htmlType='button'
          onClickFn={handleGetStarted}
          type='primary'
        >
          {t('buttons.getStarted')}
        </CButton>
        <CButton disabled={false} htmlType='button' type='secondary'>
          {t('buttons.learnMore')}
        </CButton>
        {/* <button className={styles.lear_more}>
          <span className={styles.lear_more_text}>Lear more</span>
        </button> */}
      </div>
    </div>
  );
};
