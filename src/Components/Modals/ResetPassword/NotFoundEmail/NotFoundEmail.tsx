import { FC } from 'react';
import { ModalContainer } from '../../ModalContainer/ModalContainer';
import styles from './NotFoundEmail.module.css';
import { IAuthModalProps } from '../../../../Types/Components/Modals';

export const NotFoundEmail: FC<IAuthModalProps> = ({
  isOpen,
  toggleModal,
  setCurrentModal,
}) => {
  return (
    <ModalContainer
      isOpen={isOpen}
      toggleModal={toggleModal}
      title='Reset password'
    >
      <div className={styles.container}>
        <p className={styles.title}>
          No account found for this email. Please check the spelling or create a
          new one.
        </p>
        <div className={styles.btn_wrapper}>
          <button
            className={styles.try_again}
            onClick={() => setCurrentModal('login')}
          >
            TRY AGAIN
          </button>
          <button
            className={styles.create}
            onClick={() => setCurrentModal('register')}
          >
            CREATE AN ACCOUNT
          </button>
        </div>
      </div>
    </ModalContainer>
  );
};
