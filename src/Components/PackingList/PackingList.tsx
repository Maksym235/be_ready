import { FC, useState } from 'react';
import styles from './PackingList.module.css';
import { TogglerLists } from '../TogglerLists/TogglerLists';
import { EmptyLists } from '../EmptyLists/EmptyLists';
import { PersonalItem } from './PersonalItem/PersonalItem';
// import { AllListBelow } from "../AllListBelow/AllListBelow";
import { Link, useLocation } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { editRequest, getUserRequests } from '../../Pages/Home/api';
import acceptIcon from '../../assets/accepRequest.svg';
import disaccept from '../../assets/disacceptRequest.svg';
import { AllListBelow } from '../AllListBelow/AllListBelow';
export interface IProps {
  lists: any;
}
export const PackingList: FC<IProps> = ({ lists }) => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user')!);

  const userLists: any = {
    personal: lists.personal,
    shared: lists.connected,
  };
  const [currentList, setCurrentList] = useState('personal');
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['todos'],
    queryFn: getUserRequests,
  });
  const { mutate, isPending } = useMutation({
    mutationFn: editRequest,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['tours'] });
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error...</div>;
  }

  const handdleAcceptRequest = (id: string) => {
    mutate({
      tripId: id,
      accept: true,
    });
  };

  const handdleRejectRequest = (id: string) => {
    mutate({
      tripId: id,
      accept: false,
    });
  };
  if (isPending) {
    return <div>Loading...</div>;
  }
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <p className={styles.title}>Packing list </p>
        <TogglerLists toggle={setCurrentList} />
        <AllListBelow id={user.id} list={currentList} />
        {userLists[currentList] ? (
          <>
            <p className={styles.awaitAccept}>
              {currentList === 'shared' ? 'Accepted' : ''}
            </p>
            <ul className={styles.list}>
              {userLists[currentList].map((el: any, index: number) => (
                <li key={index}>
                  <Link
                    state={{ from: location }}
                    to={`/selectedList/${el._id}`}
                  >
                    <PersonalItem name={el.name} />
                  </Link>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <EmptyLists list={currentList} />
        )}
        {currentList === 'shared' && (
          <div>
            <p className={styles.awaitAccept}>Awaiting acceptance</p>
            <ul className={styles.list}>
              {data &&
                data.requests['trips'].map(
                  ({ id, name }: { name: string; id: string }) => (
                    <li className={styles.awaitItem} key={id}>
                      {name}
                      <div className={styles.btn_container}>
                        <button
                          type='submit'
                          onClick={() => handdleRejectRequest(id)}
                          className={styles.disaccept}
                        >
                          <img src={disaccept} alt='reject' />
                        </button>
                        <button
                          type='submit'
                          onClick={() => handdleAcceptRequest(id)}
                          className={styles.accept}
                        >
                          <img src={acceptIcon} alt='accept' />
                        </button>
                      </div>
                    </li>
                  )
                )}
            </ul>
          </div>
        )}
        {/* {lists.length === 0 ? (
					<EmptyLists list={currentList} />
				) : (
					<AllListBelow list={currentList} />
				)} */}
        {/*========================================================== */}
        {/* {lists.length > 0 && (
					<ul className={styles.list}>
						{lists.map((el: any, index: number) => (
							<li key={index}>
								<Link
									state={{ from: location }}
									to={`/selectedList/${el.name}`}
								>
									<PersonalItem name={el.name} />
								</Link>
							</li>
						))}
					</ul>
				)} */}
      </div>
    </div>
  );
};
