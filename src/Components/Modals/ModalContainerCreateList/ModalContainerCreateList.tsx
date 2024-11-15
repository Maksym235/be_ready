import { FC } from 'react';
import { createPortal } from 'react-dom';
import styles from './ModalContainerCreateList.module.css';
import cross from '../../../assets/cross.svg';
import { IModalContainerCreateListProps } from '../../../Types/Components/Modals';

export const ModalContainerCreateList: FC<IModalContainerCreateListProps> = ({
  isOpen,
  children,
  toggleModal,
  title,
  currentStep,
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
        <ul className={styles.steps}>
          <li
            className={
              currentStep === 'setTripName'
                ? `${styles.steps_item} ${styles.active}`
                : `${styles.steps_item}`
            }
          ></li>
          <li
            className={
              currentStep === 'setTripType'
                ? `${styles.steps_item} ${styles.active}`
                : `${styles.steps_item}`
            }
          ></li>
          <li
            className={
              currentStep === 'setTripDuration'
                ? `${styles.steps_item} ${styles.active}`
                : `${styles.steps_item}`
            }
          ></li>
          <li
            className={
              currentStep === 'setRecOrEmpty'
                ? `${styles.steps_item} ${styles.active}`
                : `${styles.steps_item}`
            }
          ></li>
        </ul>
      </div>
    </div>,
    root
  );
};
