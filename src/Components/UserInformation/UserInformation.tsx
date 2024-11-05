import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { UserData } from './UserData/UserData';
import styles from './UserIfnormation.module.css';
import { UserImage } from './UserImage/UserImage';
import { getCurrent, updateUserData } from '../../Pages/Home/api';
import { ReactNode, useState } from 'react';
import { EditUserName } from '../Modals/EditUserName/EditUserName';
import { EditUserEmail } from '../Modals/EditUserEmail/EditUserEmail';
import { EditUserPassword } from '../Modals/EditUserPassoword/EditUserPassword';
import { Spinner } from '../Spinner/Spinner';
export interface IUserDataToUpdate {
  name: string;
  email: string;
  curPassword: string;
  password: string;
}
export const UserInformation = () => {
  const [currentModal, setCurrentModal] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: updateUserData,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrent,
  });

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <div>Something went wrong.</div>;
  }

  const handleSubmit = (data: IUserDataToUpdate) => {
    mutate(data);
    if (!isPending) {
      refetch();
      toggleModal();
    }
  };
  const toggleModal = () => {
    setIsModalOpen((state) => !state);
  };
  const Modals: Record<string, ReactNode> = {
    editName: (
      <EditUserName
        isOpen={isModalOpen}
        toggleModal={toggleModal}
        submit={handleSubmit}
      />
    ),
    editEmail: (
      <EditUserEmail
        isOpen={isModalOpen}
        toggleModal={toggleModal}
        submit={handleSubmit}
      />
    ),
    editPassword: (
      <EditUserPassword
        isOpen={isModalOpen}
        toggleModal={toggleModal}
        submit={handleSubmit}
      />
    ),
  };
  const handleToggleModal = (key: string) => {
    if (isModalOpen) {
      document.body.style.overflow = 'unset';
      setIsModalOpen((state) => !state);
      return;
    }
    document.body.style.overflow = 'hidden';
    setCurrentModal(key);
    setIsModalOpen((state) => !state);
  };
  return (
    <section className={styles.container}>
      <UserImage user={data?.user} refetch={refetch} />
      <UserData user={data?.user} openModal={handleToggleModal} />
      {Modals[currentModal]}
    </section>
  );
};
