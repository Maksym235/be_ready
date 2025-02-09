import { FC, useState } from 'react';
import styles from './CategoryList.module.css';
import { useQueryClient } from '@tanstack/react-query';
import {
  EquipListItemType,
  QueryDataType,
} from '../../../Types/Components/SelectedLists';
import { Category } from '../Category/Category';
import plus_icon from '../../../assets/Modals/icon_plus.svg';
export type CategoryListPropsType = {
  handleSetCurrentModal: (key: string) => void;
  toggleModal: () => void;
  isEditing: boolean;
  isHidden: boolean;
  handleShowInfo: (item: EquipListItemType) => void;
  setCurrentCategory: (category: string) => void;
};
export const CategoryList: FC<CategoryListPropsType> = ({
  handleSetCurrentModal,
  toggleModal,
  isEditing,
  isHidden,
  handleShowInfo,
  setCurrentCategory,
}) => {
  const queryQlient = useQueryClient();
  const data = queryQlient.getQueryData(['tours']) as QueryDataType;
  const [opensCategories, setOpensCategories] = useState<string[]>([]);
  const toggleOpenCategory = (id: string) => {
    if (opensCategories.includes(id)) {
      setOpensCategories(opensCategories.filter((el) => el !== id));
      return;
    }
    setOpensCategories((state) => [...state, id]);
  };
  return (
    <div className={styles.categories_wrapper}>
      {data?.trip &&
        Object.keys(data.trip.equipList)
          .sort((a, b) => a.localeCompare(b, 'uk'))
          .map((category) => (
            <Category
              category={category}
              handleSetCurrentModal={handleSetCurrentModal}
              isEditing={isEditing}
              isHidden={isHidden}
              handleShowInfo={handleShowInfo}
              setCurrentCategory={setCurrentCategory}
              toggleOpenCategory={toggleOpenCategory}
              toggleModal={toggleModal}
              opensCategories={opensCategories}
            />
          ))}
      <button
        onClick={() => {
          handleSetCurrentModal('newCategory');
          toggleModal();
        }}
        className={styles.add_category}
      >
        Add category
        <img width={24} height={24} src={plus_icon} />
      </button>
    </div>
  );
};
