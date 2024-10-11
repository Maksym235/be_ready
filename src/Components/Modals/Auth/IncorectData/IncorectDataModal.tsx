import { FC } from 'react';
import styles from './IncorectDataModal.module.css';
import { ModalContainer } from '../../ModalContainer/ModalContainer';
interface IProps {
  toggleModal: () => void;
  isOpen: boolean;
  setCurrentModal: (key: string) => void;
}
export const IncorectDataModal: FC<IProps> = ({
  toggleModal,
  isOpen,
  setCurrentModal,
}) => {
  return (
    <ModalContainer
      toggleModal={toggleModal}
      isOpen={isOpen}
      title='Log in to account'
    >
      <div className={styles.container}>
        <div className={styles.text_wrapper}>
          <p className={styles.incorectData}>
            The authorization data is incorrect.
          </p>
          <p className={styles.information}>
            The information you provided is incorrect. Check your spelling or
            reset your password.
          </p>
        </div>
        <div className={styles.btn_wrapper}>
          <button
            onClick={() => setCurrentModal('login')}
            className={styles.try_again}
          >
            try again
          </button>
          <button className={styles.reset_password}>reset password</button>
        </div>
      </div>
    </ModalContainer>
  );
};
