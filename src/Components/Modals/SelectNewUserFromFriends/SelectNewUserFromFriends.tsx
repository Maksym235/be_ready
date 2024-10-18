import { FC } from 'react';
import styles from './SelectNewUserFromFriends.module.css';
import { ModalContainer } from '../ModalContainer/ModalContainer';
import { getCurrent } from '../../../Pages/Home/api';
import { useQuery } from '@tanstack/react-query';
import cross_delete from '../../../assets/icon_close.svg';
interface IFriend {
  _id: string;
  avatar: string;
  name: string;
}

interface IProps {
  toggleModal: () => void;
  isOpen: boolean;
  friends: IFriend[];
}
export const SelectNewUserFromFriends: FC<IProps> = ({
  toggleModal,
  isOpen,
  friends,
}) => {
  const {
    data,
    isLoading,
    isError: isErrorCurrent,
  } = useQuery({
    queryKey: ['current'],
    queryFn: getCurrent,
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isErrorCurrent) {
    return <div>Error</div>;
  }
  return (
    <ModalContainer
      toggleModal={toggleModal}
      isOpen={isOpen}
      title='Connect users'
    >
      <div className={styles.container}>
        <p className={styles.title}>Friends List</p>
        <ul className={styles.list}>
          {friends.length > 0 &&
            friends.map(
              (friend: { name: string; _id: string; avatar: string }) => (
                <li className={styles.list_item} key={friend._id}>
                  <img className={styles.avatar} src={friend.avatar} />
                  {friend.name}
                  <button
                    // onClick={() => handleDeleteFriend(el._id)}
                    className={styles.delete_btn}
                  >
                    <img src={cross_delete} alt='delete' />
                  </button>
                </li>
              )
            )}
        </ul>
      </div>
    </ModalContainer>
  );
};
