import { FC } from 'react';
import styles from './DeleteTrip.module.css';
import { ModalContainer } from '../ModalContainer/ModalContainer';
import { useMutation } from '@tanstack/react-query';
import { deleteTrip } from '../../../Pages/Lists/api';
import { useNavigate } from 'react-router-dom';
import { IDeleteTripProps } from '../../../Types/Components/Modals';

export const DeleteTrip: FC<IDeleteTripProps> = ({
  toggleModal,
  isOpen,
  tripId,
}) => {
  const navigation = useNavigate();
  const mutation = useMutation({
    mutationFn: deleteTrip,
    onSuccess: () => {
      navigation('/');
      toggleModal();
    },
  });
  const handleDelete = () => {
    mutation.mutate({
      tripId,
    });
  };

  return (
    <ModalContainer
      toggleModal={() => {
        toggleModal();
      }}
      isOpen={isOpen}
      title='Set new duration'
    >
      <div className={styles.btn_wrapper}>
        <p className={styles.title}>Do you realy want delete trip ?</p>
        <button type='submit' onClick={handleDelete} className={styles.create}>
          Delete
        </button>
        <button type='button' className={styles.cancel}>
          Cancel
        </button>
      </div>
    </ModalContainer>
  );
};
