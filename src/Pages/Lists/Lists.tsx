import { FC, ReactNode, useState } from 'react';
import styles from './Lists.module.css';
import { PackingList } from '../../Components/PackingList/PackingList';
import plus from '../../assets/button plus.svg';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createNewTour, getTours } from './api';
import { Spinner } from '../../Components/Spinner/Spinner';
import {
  CreateList,
  SetRecOrEmpty,
  SetTripDuration,
  SetTripType,
} from '../../Components/Modals';

const Lists: FC = () => {
  const [currentModal, setCurrentModal] = useState<string>('setTripName');
  const [tripName, setTripName] = useState('');
  const [tripDuration, setTripDuration] = useState('');
  // const [_, setTripType] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['tours'],
    queryFn: getTours,
  });
  const { mutate } = useMutation({
    mutationFn: createNewTour,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tours'] });
      setIsModalOpen(false);
    },
  });

  if (isPending) {
    return <Spinner />;
  }
  if (isError) {
    // console.log(query);
    return <div>{error.message}</div>;
  }

  const handleToggleModal = () => {
    if (isModalOpen) {
      document.body.style.overflow = 'unset';
      setIsModalOpen((state) => !state);
      return;
    }
    document.body.style.overflow = 'hidden';
    setIsModalOpen((state) => !state);
  };

  const toggleCurrentModal = (key: string) => {
    setCurrentModal(key);
  };
  const typesList: Record<string, number> = {
    empty: 0,
    rec: 1,
    custom: 2,
  };
  const handleSubmitNewTrip = (recOrEmpty: string, data: unknown) => {
    const newTrip = {
      name: tripName,
      // type: tripType,
      duration: Number(tripDuration),
      listType: typesList[recOrEmpty],
      customData: data ? JSON.stringify(data) : JSON.stringify([]),
    };
    mutate(newTrip);
  };
  const Modals: Record<string, ReactNode> = {
    setTripName: (
      <CreateList
        setCurrentModal={toggleCurrentModal}
        isOpen={isModalOpen}
        toggleModal={handleToggleModal}
        changeTripName={setTripName}
      />
    ),
    setTripType: (
      <SetTripType
        setCurrentModal={toggleCurrentModal}
        isOpen={isModalOpen}
        toggleModal={handleToggleModal}
        // changeTripType={setTripType}
      />
    ),
    setTripDuration: (
      <SetTripDuration
        setCurrentModal={toggleCurrentModal}
        isOpen={isModalOpen}
        toggleModal={handleToggleModal}
        changeTripDuration={setTripDuration}
      />
    ),
    setRecOrEmpty: (
      <SetRecOrEmpty
        setCurrentModal={toggleCurrentModal}
        isOpen={isModalOpen}
        toggleModal={handleToggleModal}
        submit={(recOrEmpty, data) => handleSubmitNewTrip(recOrEmpty, data)}
      />
    ),
  };
  return (
    <main className={styles.main}>
      <PackingList lists={data} />
      <img
        onClick={handleToggleModal}
        className={styles.plus_btn}
        src={plus}
        alt='Add list'
      />
      {Modals[currentModal]}
    </main>
  );
};

export default Lists;
