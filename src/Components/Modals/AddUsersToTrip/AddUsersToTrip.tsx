import { FC, FormEvent, useState } from 'react';
import { ModalContainer } from '../ModalContainer/ModalContainer';
import styles from './AddUsersToTrip.module.css';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addUserToTrip } from '../../../Pages/Lists/api';
import { useParams } from 'react-router-dom';
import { getCurrent } from '../../../Pages/Home/api';
interface IProps {
  toggleModal: () => void;
  isOpen: boolean;
}
export const AddUsersToTrip: FC<IProps> = ({ toggleModal, isOpen }) => {
  const params = useParams();
  const tripId = params.id;
  const [userId, setUserId] = useState('');
  const queryClient = useQueryClient();
  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: addUserToTrip,
    onSuccess: () => {
      // Invalidate and refetch
      // queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
  const {
    data,
    isLoading,
    isError: isErrorCurrent,
  } = useQuery({
    queryKey: ['current'],
    queryFn: getCurrent,
  });
  if (isPending || isLoading) {
    return <div>Loading...</div>;
  }
  if (isError || isErrorCurrent) {
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
  const handleSelectFriend = (evt: any) => {
    console.log(evt.target.value);
    setUserId(evt.target.value);
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
        <select
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
        </select>
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
      </div>
    </ModalContainer>
  );
};
