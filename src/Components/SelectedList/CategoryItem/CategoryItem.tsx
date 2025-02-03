import { FC } from 'react';
import styles from './CategoryItem.module.css';
import info_icon from '../../../assets/SelectedList/icon_info.svg';
import checkbox from '../../../assets/SelectedList/checkbox.svg';
import checkbox_ch from '../../../assets/SelectedList/checkbox_ch.svg';
import trash from '../../../assets/SelectedList/icon_trash.svg';
import { useMutation } from '@tanstack/react-query';
import { deleteListItem } from '../../../Pages/Lists/api';
import { ICategoryItemProps } from '../../../Types/Components/SelectedLists';

export const CategoryItem: FC<ICategoryItemProps> = ({
  item,
  user,
  handleCheckedItem,
  handleShowInfo,
  listId,
  refetch,
  isEditing,
  category,
}) => {
  const mutation = useMutation({
    mutationFn: deleteListItem,
    onSuccess: () => {
      refetch();
    },
  });
  const handleDeleteListItem = () => {
    mutation.mutate({
      listId: listId,
      itemId: item._id,
      category: category,
    });
  };
  return (
    <div key={item._id}>
      <div className={styles.category_item}>
        <div
          style={{
            display: 'flex',
            gap: '16px',
            alignItems: 'center',
          }}
        >
          <div className={styles.checkbox_wrapper}>
            <input
              onChange={() => handleCheckedItem(item)}
              className={styles.checkbox_input}
              type='checkbox'
              checked={
                item.persons.find((p) => p._id === user.id) ? true : false
              }
            />
            <img
              className={styles.checkbox_icon}
              src={
                item.persons.find((p) => p._id === user.id)
                  ? checkbox_ch
                  : checkbox
              }
              alt=''
            />
          </div>
          <p
            className={
              item.persons.find((p) => p._id === user.id)
                ? `${styles.item_name} ${styles.item_name_checked}`
                : styles.item_name
            }
          >
            {item.name}
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {item.persons.length > 0 &&
            item.persons.filter((el) => el._id !== user.id).length > 0 && (
              <div className={styles.another_person_take_block}></div>
            )}
          {isEditing && (
            <img src={trash} onClick={handleDeleteListItem} alt='' />
          )}
          <img
            onClick={() => handleShowInfo(item)}
            src={info_icon}
            alt='information icon'
          />
        </div>
      </div>
    </div>
  );
};
