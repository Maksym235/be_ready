import { FC, ReactNode, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './SelectedList.module.css';
import {
  EquipListItemType,
  ICategoryItem,
  IPersons,
} from '../../Types/Components/SelectedLists';
import {
  // QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { getToursById, updateList } from '../Lists/api';
//=====MODALS================================
import { ShowInfoCategoryItem } from '../../Components/Modals/ShowInfoCategoryItem/ShowInfoCategoryItem';
import { AddNewCategory } from '../../Components/Modals/AddNewCategory/AddNewCategory';
import { AddNewItemToCategory } from '../../Components/Modals/AddNewItemToCategory/AddNewItemToCategory';
import { RenameTrip } from '../../Components/Modals/RenameTrip/RenameTrip';
import { ChangeTripDuration } from '../../Components/Modals/ChangeTripDuration/ChangeTripDuration';
import { DeleteTrip } from '../../Components/Modals/DeleteTrip/DeleteTrip';
import { AddUsersToTrip } from '../../Components/Modals/AddUsersToTrip/AddUsersToTrip';
import { SelectNewUserFromFriends } from '../../Components/Modals/SelectNewUserFromFriends/SelectNewUserFromFriends';
import { UsersInTrip } from '../../Components/Modals/UsersInTrip/UsersInTrip';
//=====COMPONENTS================================
import { SelectedListFooter } from '../../Components/SelectedList/SelectedListFooter/SelectedListFooter';
import { SelectedListHeader } from '../../Components/SelectedList/SelectedListHeader/SelectedListHeader';
import { CategoryTitle } from '../../Components/SelectedList/CategoryTitle/CategoryTitle';
import { CategoryItem } from '../../Components/SelectedList/CategoryItem/CategoryItem';
import { Spinner } from '../../Components/Spinner/Spinner';
//=====ICONS================================
import plus_icon from '../../assets/Modals/icon_plus.svg';
// import { getUsersById } from '../../Pages/Home/api';

export const SelectedList: FC = () => {
  const [opensCategories, setOpensCategories] = useState<string[]>([]);
  const [infoItem, setInfoItem] = useState<EquipListItemType | null>(null);
  const [isOpenAddModals, setIsOpenAddModals] = useState(false);
  // const [itemPersons, setItemPersons] = useState<IPersons[] | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
  const [isOpenEditMenu, setIsOpenEditMenu] = useState(false);
  const [currentModal, setCurrentModal] = useState('newCategory');
  const [currentCategory, setCurrentCategory] = useState('');
  const listId = useParams();
  const tripId = listId.id;
  const queryClient = useQueryClient();
  const user = JSON.parse(localStorage.getItem('user')!);
  const { isLoading, isError, data } = useQuery({
    queryKey: ['tours'],
    queryFn: () => getToursById(tripId ? tripId : ''),
  });
  const [editedItem, setEditedItem] = useState<EquipListItemType[]>([]);
  const mutation = useMutation({
    mutationFn: updateList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tours'] });
    },
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
  const toggleOpenCategory = (id: string) => {
    if (opensCategories.includes(id)) {
      setOpensCategories(opensCategories.filter((el) => el !== id));
      return;
    }
    setOpensCategories((state) => [...state, id]);
  };

  const toggleIsEditing = () => {
    setIsEditing((state) => !state);
  };
  const handleCheckedItem = (item: EquipListItemType) => {
    if (editedItem.includes(item)) {
      return;
    }
    setEditedItem((state) => [...state, item]);
    const list = data?.trip?.equipList;
    if (!list) {
      return;
    }
    if (item.persons.find((p) => p._id === user.id)) {
      const userIndex = item.persons.findIndex((p) => p._id === user.id);
      const updatedItem = {
        ...item,
        persons: item.persons.slice(1, userIndex),
      };
      const catIndex = list[item.category]?.findIndex(
        (catItem) => catItem._id === item._id
      );
      const updatedCategory = list[item.category];
      updatedCategory.splice(catIndex, 1, updatedItem);
      list[item.category] = updatedCategory;
    } else {
      const updatedItem = {
        ...item,
        persons: [...item.persons, { _id: user.id, name: user.name, count: 1 }],
      };
      const updatedCategory = list[item.category];
      const catIndex = updatedCategory.findIndex(
        (catItem) => catItem._id === item._id
      );
      updatedCategory.splice(catIndex, 1, updatedItem);
      list[item.category] = updatedCategory;
    }
  };

  const onUpdateItem = (item: ICategoryItem) => {
    if (timerId !== null) {
      clearTimeout(timerId);
    }

    handleCheckedItem(item);

    const timer = setTimeout(() => {
      mutation.mutate({
        equipId: data ? data?.trip.equipListId : '',
        newList: data?.trip.equipList,
      });
    }, 5000);
    setTimerId(timer);
  };
  const modals: Record<string, ReactNode> = {
    newCategory: (
      <AddNewCategory
        listId={data?.trip?.equipListId ?? ''}
        isOpen={isOpenAddModals}
        toggleModal={toggleIsOpenAddModal}
      />
    ),
    newItem: (
      <AddNewItemToCategory
        category={currentCategory}
        listId={data?.trip?.equipListId ?? ''}
        isOpen={isOpenAddModals}
        toggleModal={toggleIsOpenAddModal}
        cleanCategory={cleanCategory}
      />
    ),
    renameTrip: (
      <RenameTrip
        tripId={data?.trip?.id ?? ''}
        tripName={data?.trip?.name ?? ''}
        isOpen={isOpenAddModals}
        toggleModal={toggleIsOpenAddModal}
      />
    ),
    changeDuration: (
      <ChangeTripDuration
        tripId={data?.trip?.id ?? ''}
        tripDuraition={data?.trip?.duration ?? 0}
        isOpen={isOpenAddModals}
        toggleModal={toggleIsOpenAddModal}
      />
    ),
    deleteTrip: (
      <DeleteTrip
        tripId={data?.trip?.id ?? ''}
        isOpen={isOpenAddModals}
        toggleModal={toggleIsOpenAddModal}
      />
    ),
    shareTrip: (
      <AddUsersToTrip
        listId={data?.trip?.equipListId ?? '-'}
        tripName={data?.trip?.name ?? '-'}
        friends={user && user.friends}
        isOpen={isOpenAddModals}
        toggleModal={toggleIsOpenAddModal}
        setModal={handleSetCurrentModal}
      />
    ),
    shareTripSelectFromFriends: (
      <SelectNewUserFromFriends
        tripId={data?.trip?.id ?? ''}
        isOpen={isOpenAddModals}
        toggleModal={toggleIsOpenAddModal}
      />
    ),
    usersInTrip: (
      <UsersInTrip
        tripId={data?.trip?.id ?? ''}
        isOpen={isOpenAddModals}
        toggleModal={toggleIsOpenAddModal}
      />
    ),
    ShowInfoCategoryItem: (
      <ShowInfoCategoryItem
        listId={data?.trip?.equipListId ?? '-'}
        tripName={data?.trip?.name ?? '-'}
        item={infoItem}
        isOpen={isOpenAddModals}
        toggleModal={toggleIsOpenAddModal}
        user={user}
        owner={data?.trip?.owner ?? '-'}
      />
    ),
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
        <div className={styles.categories_wrapper}>
          {data?.trip &&
            Object.keys(data.trip.equipList)
              .sort((a, b) => a.localeCompare(b, 'uk'))
              .map((category) => (
                <div
                  style={{
                    borderColor:
                      data.trip.equipList[category].filter((el) =>
                        el.persons.find((item) => item._id === user.id)
                      ).length === data.trip.equipList[category].length &&
                      data.trip.equipList[category].length > 0
                        ? '#32CD32'
                        : '#cecece',
                  }}
                  key={category}
                  className={styles.category}
                >
                  <CategoryTitle
                    isEditing={isEditing}
                    opensCategories={opensCategories}
                    toggleOpenCategory={toggleOpenCategory}
                    category={category}
                    listId={data.trip && data.trip.equipListId}
                    equipList={data && data.trip.equipList}
                  />
                  {opensCategories.includes(category) && (
                    <>
                      {!isHidden
                        ? data.trip.equipList[category]
                            .sort((a, b) => a.name.localeCompare(b.name, 'uk'))
                            .map((categoryItem) => (
                              <div key={categoryItem._id}>
                                <CategoryItem
                                  handleCheckedItem={onUpdateItem}
                                  handleShowInfo={handleShowInfo}
                                  isEditing={isEditing}
                                  category={category}
                                  item={categoryItem}
                                  user={user}
                                  listId={data.trip && data.trip.equipListId}
                                />
                              </div>
                            ))
                        : data.trip.equipList[category]
                            .sort((a, b) => a.name.localeCompare(b.name, 'uk'))
                            .filter(
                              (el) =>
                                !el.persons.find(
                                  (p: IPersons) => p._id === user.id
                                )
                            )
                            .map((categoryItem) => (
                              <div key={categoryItem._id}>
                                <CategoryItem
                                  handleCheckedItem={onUpdateItem}
                                  handleShowInfo={handleShowInfo}
                                  isEditing={isEditing}
                                  item={categoryItem}
                                  category={category}
                                  user={user}
                                  listId={data.trip && data.trip.equipListId}
                                />
                              </div>
                            ))}
                    </>
                  )}
                  {isEditing && opensCategories.includes(category) && (
                    <button
                      onClick={() => {
                        setCurrentCategory(category);
                        handleSetCurrentModal('newItem');
                        toggleIsOpenAddModal();
                      }}
                      className={styles.add_category_item}
                    >
                      <img src={plus_icon} alt='add item icon' />
                      <p className={styles.add_category_item_text}>Add Item</p>
                    </button>
                  )}
                </div>
              ))}
          <button
            onClick={() => {
              handleSetCurrentModal('newCategory');
              toggleIsOpenAddModal();
            }}
            className={styles.add_category}
          >
            Add category
            <img width={24} height={24} src={plus_icon} />
          </button>
        </div>
        <SelectedListFooter
          isHidden={isHidden}
          toggleIsHidden={toogleIsHidden}
          toggleIsEditMenu={setIsOpenEditMenu}
          toggleIsEditing={toggleIsEditing}
          setModal={handleSetCurrentModal}
          toggleModal={toggleIsOpenAddModal}
        />
      </div>
      {modals[currentModal]}
    </>
  );
};
