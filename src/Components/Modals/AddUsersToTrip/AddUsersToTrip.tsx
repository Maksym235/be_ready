import { FC, FormEvent, useState } from 'react';
import { ModalContainer } from '../ModalContainer/ModalContainer';
import styles from './AddUsersToTrip.module.css';
import { useMutation } from '@tanstack/react-query';
import { addUserToTrip } from '../../../Pages/Lists/api';
import { useParams } from 'react-router-dom';
import { Spinner } from '../../Spinner/Spinner';
interface IFriend {
  _id: string;
  avatar: string;
  name: string;
}

interface IProps {
  toggleModal: () => void;
  isOpen: boolean;
  setModal: (key: string) => void;
  friends: IFriend[];
}
export const AddUsersToTrip: FC<IProps> = ({
  toggleModal,
  isOpen,
  setModal,
  friends,
}) => {
  const params = useParams();
  const tripId = params.id;
  const [userId, setUserId] = useState('');
  // const queryClient = useQueryClient();
  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: addUserToTrip,
    onSuccess: () => {
      // Invalidate and refetch
      toggleModal();
      // queryClient.invalidateQueries({ queryKey: ['user'] });
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
    mutate({ tripId: tripId ? tripId : '', userId });
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
        {/* <select
          className={styles.select}
          onChange={handleSelectFriend}
          name='friends'
          id=''
        >
          <option value=''>select friend</option>
          {data.user.friends.map((friend: { name: string; _id: string }) => (
            <option className={styles.select_option} value={friend._id}>
              {friend.name}
            </option>
          ))}
        </select> */}
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
          disabled={friends.length < 1}
          className={styles.create}
        >
          SELECT FROM FRIENDS
        </button>
      </div>
    </ModalContainer>
  );
};
