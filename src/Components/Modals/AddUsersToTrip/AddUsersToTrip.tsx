import { FC, FormEvent, useState } from 'react';
import { ModalContainer } from '../ModalContainer/ModalContainer';
import styles from './AddUsersToTrip.module.css';
import { useMutation } from '@tanstack/react-query';
import { addUserToTrip } from '../../../Pages/Lists/api';
import { useParams } from 'react-router-dom';
import { Spinner } from '../../Spinner/Spinner';
import { DownloadList } from '../../DownloadList/DownloadList';
import { IAddUsersToTripProps } from '../../../Types/Components/Modals';

export const AddUsersToTrip: FC<IAddUsersToTripProps> = ({
  toggleModal,
  isOpen,
  setModal,
  listId,
  tripName,
}) => {
  const user = JSON.parse(localStorage.getItem('user')!);
  const params = useParams();
  const tripId = params.id;
  const [userId, setUserId] = useState('');
  // const queryClient = useQueryClient();
  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: addUserToTrip,
    onSuccess: () => {
      toggleModal();
    },
  });

  if (isPending) {
    return (
      <ModalContainer
        toggleModal={toggleModal}
        isOpen={isOpen}
        title='Connect users'
      >
        <Spinner />
      </ModalContainer>
    );
  }
  if (isError) {
    return <div>Error</div>;
  }
  const handdleSetUserId = (evt: FormEvent<HTMLInputElement>) => {
    setUserId(evt.currentTarget.value);
  };

  const handleSubmitUser = () => {
    mutate({ tripId: tripId ? tripId : '', userId, invite: true });
  };
  if (isSuccess) {
    toggleModal();
  }
  const handleSelectFriend = () => {
    setModal('shareTripSelectFromFriends');
  };
  return (
    <ModalContainer
      toggleModal={toggleModal}
      isOpen={isOpen}
      title='Connect users'
    >
      <div className={styles.container}>
        <input
          onChange={handdleSetUserId}
          className={styles.input}
          type='text'
          value={userId}
          placeholder='Enter new user id...*'
        />
        <div className={styles.btn_wrapper}>
          <button
            onClick={handleSubmitUser}
            disabled={userId.length < 1}
            className={styles.create}
          >
            Connect
          </button>
          <button onClick={toggleModal} className={styles.cancel}>
            Cancel
          </button>
        </div>
        <button
          onClick={handleSelectFriend}
          disabled={user?.friends.length < 1}
          className={styles.create}
        >
          SELECT FROM FRIENDS
        </button>
        <DownloadList tripName={tripName} listId={listId} />
      </div>
    </ModalContainer>
  );
};
