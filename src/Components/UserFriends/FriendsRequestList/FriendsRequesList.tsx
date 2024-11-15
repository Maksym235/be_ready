import { FC } from 'react';
import styles from './FriendsRequestList.module.css';
import { useMutation, useQuery } from '@tanstack/react-query';
import { editFriendRequest, getUserRequests } from '../../../Pages/Home/api';
import accept_icon from '../../../assets/SelectedList/icon_dobble_check.svg';
import cross_delete from '../../../assets/icon_close.svg';
import toast from 'react-hot-toast';
import { Spinner } from '../../Spinner/Spinner';
import { IFriendRequestsListProps } from '../../../Types/Components/Profile';
import { IFriendsRequests } from '../../../Types/Components/Home';

export const FriendsRequesList: FC<IFriendRequestsListProps> = ({
  refetch,
  refetchRequest,
}) => {
  const { mutate, isPending } = useMutation({
    mutationFn: editFriendRequest,
    onSuccess: () => {
      refetch();
      refetchReq();
      refetchRequest();
      // toggleModal();
      toast.success('accepted');
    },
  });

  const {
    data,
    isError,
    isLoading,
    refetch: refetchReq,
  } = useQuery({
    queryKey: ['userRequests'],
    queryFn: getUserRequests,
  });

  const handleEditRequest = (key: string, isAccept: boolean) => {
    mutate({
      reqId: key,
      isAccept,
    });
  };

  if (isPending) {
    return <Spinner />;
  }
  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <div>Error...</div>;
  }
  return (
    <div className={styles.list_container}>
      <p className={styles.title}>Awaiting acceptance</p>
      <ul className={styles.list}>
        {data &&
          data.requests.friends.map((el: IFriendsRequests) => (
            <li className={styles.list_item}>
              <img className={styles.avatar} src={el.avatar} />
              {el.name}
              <div className={styles.btn_wrapper}>
                <button
                  onClick={() => handleEditRequest(el._id, true)}
                  className={styles.accept_btn}
                >
                  <img src={accept_icon} alt='accept' />
                </button>
                <button
                  onClick={() => handleEditRequest(el._id, false)}
                  className={styles.delete_btn}
                >
                  <img src={cross_delete} alt='delete' />
                </button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};
