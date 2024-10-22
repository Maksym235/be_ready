import { FC, ReactNode, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styles from './SelectedList.module.css';
import plus_icon from '../../assets/Modals/icon_plus.svg';
import { ShowInfoCategoryItem } from '../Modals/ShowInfoCategoryItem/ShowInfoCategoryItem';
import { AddNewCategory } from '../Modals/AddNewCategory/AddNewCategory';
import { SelectedListFooter } from './SelectedListFooter/SelectedListFooter';
import { SelectedListHeader } from './SelectedListHeader/SelectedListHeader';
import {
  // QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { getToursById, updateList } from '../../Pages/Lists/api';
import { getUsersById } from '../../Pages/Home/api';
import { CategoryTitle } from './CategoryTitle/CategoryTitle';
import { CategoryItem } from './CategoryItem/CategoryItem';
import { AddNewItemToCategory } from '../Modals/AddNewItemToCategory/AddNewItemToCategory';
import { RenameTrip } from '../Modals/RenameTrip/RenameTrip';
import { ChangeTripDuration } from '../Modals/ChangeTripDuration/ChangeTripDuration';
import { DeleteTrip } from '../Modals/DeleteTrip/DeleteTrip';
import { AddUsersToTrip } from '../Modals/AddUsersToTrip/AddUsersToTrip';
import { SelectNewUserFromFriends } from '../Modals/SelectNewUserFromFriends/SelectNewUserFromFriends';
import { UsersInTrip } from '../Modals/UsersInTrip/UsersInTrip';
export interface ICategoryItem {
  _id: string;
  name: string;
  description: string;
  category: string;
  persons: string[];
}
export const SelectedList: FC = () => {
  const [opensCategories, setOpensCategories] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [infoItem, setInfoItem] = useState<any>(null);
  const [isOpenAddModals, setIsOpenAddModals] = useState(false);
  const [itemPersons, setItemPersons] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [timerId, setTimerId] = useState<any>(null);
  const [isOpenEditMenu, setIsOpenEditMenu] = useState(false);
  const [currentModal, setCurrentModal] = useState('newCategory');
  const [currentCategory, setCurrentCategory] = useState('');
  const listId = useParams();
  const tripId = listId.id;
  const location = useLocation();
  const queryClient = useQueryClient();
  const user = JSON.parse(localStorage.getItem('user')!);
  const { isPending, isError, data, refetch } = useQuery({
    queryKey: ['tours'],
    queryFn: () => getToursById(tripId ? tripId : ''),
  });
  const [editedItem, setEditedItem] = useState<Record<string, any>[]>([]);
  const mutation = useMutation({
    mutationFn: updateList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tours'] });
    },
  });
  if (isPending) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }

  const toggleIsOpen = () => {
    setItemPersons(null);
    setIsOpen((state) => !state);
  };
  const handleShowInfo = (item: ICategoryItem) => {
    setInfoItem(item);
    if (item.persons.length > 0) {
      getUsersById(item.persons.join(', ')).then((users) =>
        setItemPersons(users.resp)
      );
      toggleIsOpen();
      return;
    }
    toggleIsOpen();
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
  const handleCheckedItem = (item: Record<string, any>) => {
    if (editedItem.includes(item)) {
      return;
    }
    setEditedItem((state) => [...state, item]);
    const list = data.trip.equipList;
    if (item.persons.includes(user.id)) {
      const userIndex = item.persons.findIndex((p: string) => p === user.id);
      const updatedItem = {
        ...item,
        persons: item.persons.slice(1, userIndex),
      };
      const catIndex = list[item.category].findIndex(
        (catItem: any) => catItem._id === item._id
      );
      const updatedCategory = list[item.category];
      updatedCategory.splice(catIndex, 1, updatedItem);
      list[item.category] = updatedCategory;
    } else {
      const updatedItem = {
        ...item,
        persons: [...item.persons, user.id],
      };
      const updatedCategory = list[item.category];
      const catIndex = updatedCategory.findIndex(
        (catItem: any) => catItem._id === item._id
      );
      updatedCategory.splice(catIndex, 1, updatedItem);
      list[item.category] = updatedCategory;
    }
  };

  const onUpdateItem = (item: Record<string, any>) => {
    if (timerId !== null) {
      clearTimeout(timerId);
    }

    handleCheckedItem(item);

    const timer = setTimeout(() => {
      mutation.mutate({
        equipId: data.trip.equipListId,
        newList: data.trip.equipList,
      });
    }, 5000);
    setTimerId(timer);
  };
  // console.log(data.trip.id);
  const modals: Record<string, ReactNode> = {
    newCategory: (
      <AddNewCategory
        listId={data.trip && data.trip.equipListId}
        isOpen={isOpenAddModals}
        toggleModal={toggleIsOpenAddModal}
        refetch={refetch}
      />
    ),
    newItem: (
      <AddNewItemToCategory
        category={currentCategory}
        listId={data.trip && data.trip.equipListId}
        isOpen={isOpenAddModals}
        toggleModal={toggleIsOpenAddModal}
        refetch={refetch}
      />
    ),
    renameTrip: (
      <RenameTrip
        tripId={data.trip && data.trip.id}
        tripName={data.trip && data.trip.name}
        isOpen={isOpenAddModals}
        toggleModal={toggleIsOpenAddModal}
        refetch={refetch}
      />
    ),
    changeDuration: (
      <ChangeTripDuration
        tripId={data.trip && data.trip.id}
        tripDuraition={data.trip && data.trip.duration}
        isOpen={isOpenAddModals}
        toggleModal={toggleIsOpenAddModal}
        refetch={refetch}
      />
    ),
    deleteTrip: (
      <DeleteTrip
        tripId={data.trip && data.trip.id}
        isOpen={isOpenAddModals}
        toggleModal={toggleIsOpenAddModal}
      />
    ),
    shareTrip: (
      <AddUsersToTrip
        friends={user && user.friends}
        isOpen={isOpenAddModals}
        toggleModal={toggleIsOpenAddModal}
        setModal={handleSetCurrentModal}
      />
    ),
    shareTripSelectFromFriends: (
      <SelectNewUserFromFriends
        tripId={data.trip && data.trip.id}
        isOpen={isOpenAddModals}
        toggleModal={toggleIsOpenAddModal}
      />
    ),
    usersInTrip: (
      <UsersInTrip
      tripId={data.trip && data.trip.id}
        isOpen={isOpenAddModals}
        toggleModal={toggleIsOpenAddModal}
      />
    )
  };
  return (
    <>
      <SelectedListHeader
        location={location}
        listId={data.trip ? data.trip.name : ''}
        listOwner={data.trip ? data.trip.owner : ''}
        isOpen={isOpenEditMenu}
        toggleIsOpen={toggleIsEditMenu}
        isEditing={isEditing}
        setCurrentModal={handleSetCurrentModal}
        toggleOpen={toggleIsOpenAddModal}
      />
      <div className={styles.container}>
        <div className={styles.categories_wrapper}>
          {data.trip &&
            Object.keys(data.trip.equipList)
              .sort((a: any, b: any) => a.localeCompare(b, 'uk'))
              .map((category) => (
                <div key={category} className={styles.category}>
                  <CategoryTitle
                    opensCategories={opensCategories}
                    toggleOpenCategory={toggleOpenCategory}
                    category={category}
                    equipList={data && data.trip.equipList}
                  />
                  {opensCategories.includes(category) && (
                    <>
                      {!isHidden
                        ? data.trip.equipList[category]
                            .sort((a: any, b: any) =>
                              a.name.localeCompare(b.name, 'uk')
                            )
                            .map((categoryItem: any) => (
                              <div key={categoryItem._id}>
                                <CategoryItem
                                  handleCheckedItem={onUpdateItem}
                                  handleShowInfo={handleShowInfo}
                                  isEditing={isEditing}
                                  item={categoryItem}
                                  user={user}
                                />
                              </div>
                            ))
                        : data.trip.equipList[category]
                            .sort((a: any, b: any) =>
                              a.name.localeCompare(b.name, 'uk')
                            )
                            .filter((el: any) => !el.persons.includes(user.id))
                            .map((categoryItem: any) => (
                              <div key={categoryItem._id}>
                                <CategoryItem
                                  handleCheckedItem={onUpdateItem}
                                  handleShowInfo={handleShowInfo}
                                  isEditing={isEditing}
                                  item={categoryItem}
                                  user={user}
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
      <ShowInfoCategoryItem
        tripName={listId.id ? listId.id : '-'}
        item={infoItem}
        usersInfo={itemPersons}
        isOpen={isOpen}
        toggleModal={toggleIsOpen}
      />
      {modals[currentModal]}
    </>
  );
};
