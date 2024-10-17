import { FC } from 'react';
import styles from './DeleteTrip.module.css';
import { ModalContainer } from '../ModalContainer/ModalContainer';
import { useMutation } from '@tanstack/react-query';
import { deleteTrip } from '../../../Pages/Lists/api';
import { useNavigate } from 'react-router-dom';
interface IProps {
  toggleModal: () => void;
  isOpen: boolean;
  tripId: string;
}
export const DeleteTrip: FC<IProps> = ({ toggleModal, isOpen, tripId }) => {
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
        <button
          type='button'
          onClick={() => {
            //   toggleModal('newItem');
          }}
          className={styles.cancel}
        >
          Cancel
        </button>
      </div>
    </ModalContainer>
  );
};
