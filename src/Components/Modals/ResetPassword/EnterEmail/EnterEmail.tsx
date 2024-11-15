import { FC } from 'react';
import { ModalContainer } from '../../ModalContainer/ModalContainer';
import styles from './EnterEmail.module.css';
import { IAuthModalProps } from '../../../../Types/Components/Modals';

export const EnterEmail: FC<IAuthModalProps> = ({
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
        <input
          className={styles.input}
          placeholder='Enter your email...*'
          type='email'
        />
        <button
          onClick={() => setCurrentModal('resetPassWeSendEmail')}
          className={styles.button}
        >
          Send code to my email
        </button>
        <button
          onClick={() => setCurrentModal('login')}
          className={styles.resetPass}
        >
          cancel
        </button>
      </div>
    </ModalContainer>
  );
};
