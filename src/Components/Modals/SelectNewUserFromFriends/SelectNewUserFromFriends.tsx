import { FC } from 'react';
import styles from './SelectNewUserFromFriends.module.css';
import { ModalContainer } from '../ModalContainer/ModalContainer';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  addUserToTrip,
  getFriendsTripRequests,
} from '../../../Pages/Lists/api';
import toast from 'react-hot-toast';
import { Spinner } from '../../Spinner/Spinner';
import { ISelectNewUserFromFriendsProps } from '../../../Types/Components/Modals';

export const SelectNewUserFromFriends: FC<ISelectNewUserFromFriendsProps> = ({
  toggleModal,
  isOpen,
  tripId,
}) => {
  const {
    mutate,
    isPending,
    isError: MError,
  } = useMutation({
    mutationFn: addUserToTrip,
    onSuccess: () => {
      toast.success('request sent');
      refetch();
    },
  });
  const { data, isLoading, isError, refetch } = useQuery({
    queryFn: () => getFriendsTripRequests(tripId),
    queryKey: ['friendsRequests'],
  });
  if (isLoading || isPending) {
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
  if (isError || MError) {
    return <div>Error</div>;
  }
  const handleSubmitUser = (invite: boolean, userId: string) => {
    mutate({ tripId: tripId ? tripId : '', userId, invite });
  };
  return (
    <ModalContainer
      toggleModal={toggleModal}
      isOpen={isOpen}
      title='Connect users'
    >
      <div className={styles.container}>
        <p className={styles.title}>Friends List</p>
        <ul className={styles.list}>
          {data &&
            data?.resp.length > 0 &&
            data?.resp.map(
              (friend: {
                name: string;
                _id: string;
                avatar: string;
                invited: boolean;
              }) => (
                <li className={styles.list_item} key={friend._id}>
                  <div className={styles.list_item_info_block}>
                    <img className={styles.avatar} src={friend.avatar} />
                    {friend.name}
                  </div>
                  <button
                    onClick={() =>
                      handleSubmitUser(
                        friend.invited ? false : true,
                        friend._id
                      )
                    }
                    className={styles.invite_btn}
                  >
                    {friend.invited ? `cancel` : `send invite`}
                  </button>
                </li>
              )
            )}
        </ul>
      </div>
    </ModalContainer>
  );
};
