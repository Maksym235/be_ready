import { FC } from 'react';
import { ModalContainer } from '../../ModalContainer/ModalContainer';
import styles from './WeSendEmail.module.css';
interface IProps {
  toggleModal: () => void;
  isOpen: boolean;
  setCurrentModal: (key: string) => void;
}

export const WeSendEmail: FC<IProps> = ({
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
        <ul className={styles.list_paragraphs}>
          <li className={styles.paragraph}>
            We are pleased to inform you that your password reset request has
            been successfully processed.
          </li>
          <li className={styles.paragraph}>
            Please check the given email address for new emails from BeReady, we
            have sent you a confirmation link to reset your password.
          </li>
        </ul>
        <button onClick={() => setCurrentModal('')} className={styles.go_it}>
          GOT IT
        </button>
      </div>
    </ModalContainer>
  );
};
