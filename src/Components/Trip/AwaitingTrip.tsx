'use client';
import styles from './AwaitingTrip.module.css';
import acceptIcon from '../../assets/accepRequest.svg';
import disaccept from '../../assets/disacceptRequest.svg';
import { useMutation } from '@tanstack/react-query';
import { editRequest } from '../../Pages/Home/api';
import { Spinner } from '../Spinner/Spinner';
export const AwaitingTrip = ({ name, id }: { name: string; id: string }) => {
  const { mutate, isPending } = useMutation({
    mutationFn: editRequest,
    onSuccess: () => {
      // refetch();
    },
  });

  // if (isLoading) {
  //   return <Spinner />;
  // }
  // if (isError) {
  //   return <div>Error...</div>;
  // }

  const handdleAcceptRequest = (id: string) => {
    mutate({
      tripId: id,
      accept: true,
    });
    // refetch();
  };

  const handdleRejectRequest = (id: string) => {
    mutate({
      tripId: id,
      accept: false,
    });
    // refetch();
  };
  if (isPending) {
    return <Spinner />;
  }
  return (
    <div className={styles.awaitItem}>
      {name}
      <div className={styles.btn_container}>
        <button
          type='submit'
          onClick={() => handdleRejectRequest(id)}
          className={styles.disaccept}
        >
          <img src={disaccept} alt='reject' width={20} height={20} />
        </button>
        <button
          type='submit'
          onClick={() => handdleAcceptRequest(id)}
          className={styles.accept}
        >
          <img src={acceptIcon} alt='accept' width={20} height={20} />
        </button>
      </div>
    </div>
  );
};
