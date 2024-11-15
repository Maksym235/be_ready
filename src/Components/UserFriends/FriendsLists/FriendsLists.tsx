// import React from 'react'
import styles from './FriendsLists.module.css';
import { useMutation } from '@tanstack/react-query';
import { FC } from 'react';
import toast from 'react-hot-toast';
import cross_delete from '../../../assets/icon_close.svg';
import { deleteFriend } from '../../../Pages/Home/api';
import { Spinner } from '../../Spinner/Spinner';
import {
  IFriendsListProps,
  IFriendsRequests,
} from '../../../Types/Components/Home';

export const FriendsLists: FC<IFriendsListProps> = ({ user, refetch }) => {
  const { mutate, isPending } = useMutation({
    mutationFn: deleteFriend,
    onSuccess: () => {
      refetch();
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
