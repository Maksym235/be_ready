import { FC, useState } from 'react';
import styles from './Profile.module.css';
import { ProfileHeader } from '../../Components/ProfileHeader/ProfileHeader';
import { ProfileToggler } from '../../Components/ProfileToggler/ProfileToggler';
import { UserInformation } from '../../Components/UserInformation/UserInformation';
import { UserFriends } from '../../Components/UserFriends/UserFriends';
import { useQuery } from '@tanstack/react-query';
import { getUserRequests } from '../Home/api';
const Profile: FC = () => {
  const [currentTab, setCurrentTab] = useState('info');
  const { data: requestData, refetch } = useQuery({
    queryKey: ['friendsRequest'],
    queryFn: getUserRequests,
  });
  return (
    <main className={styles.backdrop}>
      <div className={styles.container}>
        <div className={styles.content_wrapper}>
          <ProfileHeader />
          <ProfileToggler
            requests={requestData && requestData.requests}
            toggle={setCurrentTab}
          />
          {currentTab === 'info' ? (
            <UserInformation />
          ) : (
            <UserFriends
              requests={requestData && requestData.requests}
              refetchRequest={refetch}
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Profile;
