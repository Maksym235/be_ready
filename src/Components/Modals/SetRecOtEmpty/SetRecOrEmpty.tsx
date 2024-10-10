import { FC } from 'react';
import { ModalContainerCreateList } from '../ModalContainerCreateList/ModalContainerCreateList';
import styles from './SetRecOrEmpty.module.css';
interface IProps {
  isOpen: boolean;
  toggleModal: () => void;
  setCurrentModal: (key: string) => void;
  submit: (type: string) => void;
}
export const SetRecOrEmpty: FC<IProps> = ({
  isOpen,
  toggleModal,
  setCurrentModal,
  submit,
}) => {
  const handleNextPage = (type: string) => {
    submit(type);
  };
  return (
    <ModalContainerCreateList
      isOpen={isOpen}
      toggleModal={toggleModal}
      title='New packing list'
      currentStep='setRecOrEmpty'
    >
      <div className={styles.container}>
        <p className={styles.title}>
          Do you want to get our recommended lists for your trip or start from
          scratch?
        </p>
        <div className={styles.btn_wrapper}>
          <button
            onClick={() => handleNextPage('rec')}
            className={styles.recomend}
          >
            I WANT RECOMMENDATIONS
          </button>
          <button
            onClick={() => handleNextPage('empty')}
            className={styles.empty_back}
          >
            CREATE EMPTY LIST
          </button>
          <button
            onClick={() => setCurrentModal('setTripDuration')}
            className={styles.empty_back}
          >
            BACK
          </button>
        </div>
      </div>
    </ModalContainerCreateList>
  );
};
