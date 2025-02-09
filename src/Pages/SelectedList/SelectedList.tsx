import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './SelectedList.module.css';
import { EquipListItemType } from '../../Types/Components/SelectedLists';
import { useQuery } from '@tanstack/react-query';
import { getToursById } from '../Lists/api';
//=====COMPONENTS================================
import { SelectedListFooter } from '../../Components/SelectedList/SelectedListFooter/SelectedListFooter';
import { SelectedListHeader } from '../../Components/SelectedList/SelectedListHeader/SelectedListHeader';
import { Spinner } from '../../Components/Spinner/Spinner';
import { Modals } from '../../Components/SelectedList/Modals/Modals';
import { CategoryList } from '../../Components/SelectedList/CategoryList/CategoryList';

export const SelectedList: FC = () => {
  const [infoItem, setInfoItem] = useState<EquipListItemType | null>(null);
  const [isOpenAddModals, setIsOpenAddModals] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isOpenEditMenu, setIsOpenEditMenu] = useState(false);
  const [currentModal, setCurrentModal] = useState('newCategory');
  const [currentCategory, setCurrentCategory] = useState('');
  const listId = useParams();
  const tripId = listId.id;
  const user = JSON.parse(localStorage.getItem('user')!);
  const { isLoading, isError, data } = useQuery({
    queryKey: ['tours'],
    queryFn: () => getToursById(tripId ? tripId : ''),
  });
  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <div>Error</div>;
  }

  const handleShowInfo = (item: EquipListItemType) => {
    setInfoItem(item);
    handleSetCurrentModal('ShowInfoCategoryItem');
    setIsOpenAddModals((state) => !state);
  };

  const toggleIsOpenAddModal = () => {
    setIsOpenAddModals((state) => !state);
  };
  const toggleIsEditMenu = () => {
    setIsOpenEditMenu((state) => !state);
  };
  const handleSetCurrentModal = (key: string) => {
    setCurrentModal(key);
  };
  const cleanCategory = () => {
    setCurrentCategory('');
  };
  const toogleIsHidden = () => {
    setIsHidden((state) => !state);
  };
  const toggleIsEditing = () => {
    setIsEditing((state) => !state);
  };
  return (
    <>
      <SelectedListHeader
        isOpen={isOpenEditMenu}
        toggleIsOpen={toggleIsEditMenu}
        isEditing={isEditing}
        setCurrentModal={handleSetCurrentModal}
        toggleOpen={toggleIsOpenAddModal}
      />
      <div className={styles.container}>
        <CategoryList
          handleSetCurrentModal={handleSetCurrentModal}
          toggleModal={toggleIsOpenAddModal}
          isEditing={isEditing}
          isHidden={isHidden}
          handleShowInfo={handleShowInfo}
          setCurrentCategory={setCurrentCategory}
        />
        <SelectedListFooter
          isHidden={isHidden}
          toggleIsHidden={toogleIsHidden}
          toggleIsEditMenu={setIsOpenEditMenu}
          toggleIsEditing={toggleIsEditing}
          setModal={handleSetCurrentModal}
          toggleModal={toggleIsOpenAddModal}
        />
      </div>
      <Modals
        currentModal={currentModal}
        toggleModal={toggleIsOpenAddModal}
        isOpen={isOpenAddModals}
        data={data}
        user={user}
        currentCategory={currentCategory}
        cleanCategory={cleanCategory}
        handleSetCurrentModal={handleSetCurrentModal}
        infoItem={infoItem}
      />
    </>
  );
};
