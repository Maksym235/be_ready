import { ChangeEvent, FC, useState } from 'react';
import { ModalContainerCreateList } from '../ModalContainerCreateList/ModalContainerCreateList';
import styles from './CreateList.module.css';
interface IProps {
  isOpen: boolean;
  toggleModal: () => void;
  setCurrentModal: (key: string) => void;
  changeTripName: (name: string) => void;
}
export const CreateList: FC<IProps> = ({
  isOpen,
  toggleModal,
  setCurrentModal,
  changeTripName,
}) => {
  const [tripName, setTripName] = useState('');

  const handleSetTripName = (evt: ChangeEvent<HTMLInputElement>) => {
    // setTripName(evt);
    setTripName(evt.target.value);
  };
  const handleNextPage = () => {
    setCurrentModal('setTripType');
    changeTripName(tripName);
  };
  return (
    <ModalContainerCreateList
      isOpen={isOpen}
      toggleModal={toggleModal}
      title='New packing list'
      currentStep='setTripName'
    >
      <div className={styles.container}>
        <input
          onChange={handleSetTripName}
          className={styles.input}
          type='text'
          placeholder='Enter packing list name...*'
        />
        <div className={styles.btn_wrapper}>
          <button
            onClick={handleNextPage}
            disabled={tripName.length < 1}
            className={styles.next_step}
          >
            Next step
          </button>
          <button className={styles.cancel}>Cancel</button>
        </div>
      </div>
    </ModalContainerCreateList>
  );
};
