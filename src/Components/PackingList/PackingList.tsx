import { FC, useState } from 'react';
import styles from './PackingList.module.css';
import { TogglerLists } from '../TogglerLists/TogglerLists';
import { useQuery } from '@tanstack/react-query';
import { getUserRequests } from '../../Pages/Home/api';
import { Spinner } from '../Spinner/Spinner';
import { IPackingListProps, ListType } from '../../Types/Components/Profile';
import { PersonalList } from '../PersonalList/PersonalList';
import { SharedList } from '../SharedList/SharedList';

export const PackingList: FC<IPackingListProps> = ({ lists }) => {
  const userLists: Record<string, ListType[]> = {
    personal: lists.personal,
    shared: lists.connected,
  };
  const [currentList, setCurrentList] = useState('personal');
  const { data, isLoading, isError } = useQuery({
    queryKey: ['tripRequests'],
    queryFn: getUserRequests,
  });

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <div>Error...</div>;
  }

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <p className={styles.title}>Packing list </p>
        <TogglerLists requests={data.requests} toggle={setCurrentList} />
        {currentList === 'personal' ? (
          <PersonalList list={userLists['personal']} />
        ) : (
          <SharedList requests={data.requests} list={userLists['shared']} />
        )}
      </div>
    </div>
  );
};
