import { FC, useState } from 'react';
import styles from './Category.module.css';
import { CategoryTitle } from '../CategoryTitle/CategoryTitle';
import { CategoryItem } from '../CategoryItem/CategoryItem';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  EquipListItemType,
  ICategoryItem,
  QueryDataType,
} from '../../../Types/Components/SelectedLists';
import plus_icon from '../../../assets/Modals/icon_plus.svg';
import { updateList } from '../../../Pages/Lists/api';

export type CategoryPropsType = {
  category: string;
  handleSetCurrentModal: (key: string) => void;
  toggleModal: () => void;
  isEditing: boolean;
  isHidden: boolean;
  handleShowInfo: (item: EquipListItemType) => void;
  setCurrentCategory: (category: string) => void;
  opensCategories: string[];
  toggleOpenCategory: (id: string) => void;
};
export const Category: FC<CategoryPropsType> = ({
  category,
  handleSetCurrentModal,
  isEditing,
  isHidden,
  toggleModal,
  handleShowInfo,
  setCurrentCategory,
  toggleOpenCategory,
  opensCategories,
}) => {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData(['tours']) as QueryDataType;
  const user = JSON.parse(localStorage.getItem('user')!);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
  const [editedItem, setEditedItem] = useState<EquipListItemType[]>([]);

  const mutation = useMutation({
    mutationFn: updateList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tours'] });
    },
  });
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
  return (
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
                .filter((el) => !el.persons.find((p) => p._id === user.id))
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
            toggleModal();
          }}
          className={styles.add_category_item}
        >
          <img src={plus_icon} alt='add item icon' />
          <p className={styles.add_category_item_text}>Add Item</p>
        </button>
      )}
    </div>
  );
};
