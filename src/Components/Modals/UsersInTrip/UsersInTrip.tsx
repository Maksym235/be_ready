import { FC } from 'react';
import styles from './UsersInTrip.module.css';
import { ModalContainer } from '../ModalContainer/ModalContainer';
import { useQuery } from '@tanstack/react-query';
import { getUsersInTrips } from '../../../Pages/Lists/api';
import { Spinner } from '../../Spinner/Spinner';
interface IProps {
  toggleModal: () => void;
  isOpen: boolean;
  tripId: string;
}
export const UsersInTrip: FC<IProps> = ({ toggleModal, isOpen, tripId }) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['usersInTripInfo'],
    queryFn: () => getUsersInTrips(tripId),
  });
  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <div>Something went wrong.</div>;
  }
  const permisionsText: Record<string, string> = {
    owner: 'CREATOR',
    current_user: 'You',
    user: '',
  };
  return (
    <ModalContainer
      toggleModal={toggleModal}
      isOpen={isOpen}
      title='Users in shared list'
    >
      <div className={styles.container}>
        {/* <p className={styles.title}>Friends List</p> */}
        <ul className={styles.list}>
          {data &&
            data.users.map(
              (friend: {
                _id: string;
                name: string;
                avatar: string;
                permision: string;
              }) => (
                <li className={styles.list_item} key={friend._id}>
                  <div className={styles.list_item_info_block}>
                    <img className={styles.avatar} src={friend.avatar} />
                    {friend.name}
                  </div>

                  <button
                    disabled={
                      friend.permision === 'owner' ||
                      friend.permision === 'current_user'
                    }
                    // onClick={() => handleSubmitUser(false, friend._id)}
                    className={styles[`${friend.permision}`]}
                  >
                    {permisionsText[friend.permision]}
                  </button>
                </li>
              )
            )}
        </ul>
      </div>
    </ModalContainer>
  );
};
