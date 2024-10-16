// import React from 'react'

import { FC, useState } from 'react';
import { FriendsLists } from './FriendsLists/FriendsLists';
import { TextAndId } from './TextAndId/TextAndId';
import styles from './UserFriends.module.css';
import plus from '../../assets/button plus.svg';
import { AddNewFriend } from '../Modals/AddNewFriend/AddNewFriend';
import { useQuery } from '@tanstack/react-query';
import { getCurrent } from '../../Pages/Home/api';
import { FriendsRequesList } from './FriendsRequestList/FriendsRequesList';
// import copy from "../../assets/icon_copy.svg";
export interface IUserFriendsProps {
  refetchRequest: any;
  requests: {
    friends: any[];
    trips: any[];
  };
}
export const UserFriends: FC<IUserFriendsProps> = ({
  refetchRequest,
  requests,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrent,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Something went wrong.</div>;
  }

  const handleToggleModal = () => {
    setIsOpen((state) => !state);
  };
  return (
    <div className={styles.container}>
      <TextAndId user={data?.user} />
      <div className={styles.friends_container}>
        <FriendsLists refetch={refetch} user={data?.user} />
        <FriendsRequesList
          requests={requests}
          refetchRequest={refetchRequest}
          refetch={refetch}
        />
      </div>
      <img
        onClick={handleToggleModal}
        className={styles.plus_btn}
        src={plus}
        alt='Add list'
      />
      <AddNewFriend isOpen={isOpen} toggleModal={handleToggleModal} />
    </div>
  );
};
