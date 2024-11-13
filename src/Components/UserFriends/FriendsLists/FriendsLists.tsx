// import React from 'react'
import styles from './FriendsLists.module.css';
import { useMutation } from '@tanstack/react-query';
import { FC } from 'react';
import toast from 'react-hot-toast';
import cross_delete from '../../../assets/icon_close.svg';
import { deleteFriend } from '../../../Pages/Home/api';
import { Spinner } from '../../Spinner/Spinner';

export interface IFriendsRequests {
  _id: string;
  name: string;
  avatar: string;
}
export interface IUser {
  email: string;
  id: string;
  language: string;
  password: string;
  name: string;
  theme: string;
  friends: IFriendsRequests[];
}
export interface IFriendsListProps {
  user: IUser;
  refetch: any;
}
export const FriendsLists: FC<IFriendsListProps> = ({ user, refetch }) => {
  const { mutate, isPending } = useMutation({
    mutationFn: deleteFriend,
    onSuccess: () => {
      refetch();
      // toggleModal();
      toast.success('accepted');
    },
  });
  if (isPending) {
    return <Spinner />;
  }
  const handleDeleteFriend = (userId: string) => {
    mutate(userId);
  };
  return (
    <div className={styles.container}>
      <div className={styles.list_container}>
        <p className={styles.title}>My friends</p>
        <ul className={styles.list}>
          {user &&
            user?.friends?.map((el: IFriendsRequests) => (
              <li className={styles.list_item}>
                <img className={styles.avatar} src={el.avatar} />
                {el.name}
                <button
                  onClick={() => handleDeleteFriend(el._id)}
                  className={styles.delete_btn}
                >
                  <img src={cross_delete} alt='delete' />
                </button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};
