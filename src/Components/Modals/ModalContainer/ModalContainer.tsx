import { FC } from 'react';
import { createPortal } from 'react-dom';
import styles from './ModalContainer.module.css';
import cross from '../../../assets/cross.svg';
import { IModalContainerProps } from '../../../Types/Components/Modals';

export const ModalContainer: FC<IModalContainerProps> = ({
  children,
  isOpen,
  toggleModal,
  title,
}) => {
  const root = document.querySelector(`#modal-root`)!;
  return createPortal(
    <div
      className={
        isOpen ? `${styles.backdrop}` : `${styles.backdrop} ${styles.hidden}`
      }
    >
      <div
        className={
          isOpen
            ? `${styles.container}`
            : `${styles.container} ${styles.hidden_container}`
        }
      >
        <div className={styles.title_wrapper}>
          <p className={styles.title}>{title}</p>
          <button onClick={toggleModal} className={styles.close_btn}>
            <img src={cross} alt='close button' />
          </button>
        </div>
        {children}
      </div>
    </div>,
    root
  );
};
