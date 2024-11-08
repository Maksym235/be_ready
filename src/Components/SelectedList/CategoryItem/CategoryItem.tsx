import { FC } from 'react';
import styles from './CategoryItem.module.css';
import info_icon from '../../../assets/SelectedList/icon_info.svg';
import checkbox from '../../../assets/SelectedList/checkbox.svg';
import checkbox_ch from '../../../assets/SelectedList/checkbox_ch.svg';
import trash from '../../../assets/SelectedList/icon_trash.svg';
import { useMutation } from '@tanstack/react-query';
import { deleteListItem } from '../../../Pages/Lists/api';
export interface ICategoryItemProps {
  user: any;
  item: any;
  handleCheckedItem: (item: any) => void;
  handleShowInfo: (item: any) => void;
  isEditing: boolean;
  listId: string;
  refetch: any;
  category: string;
}
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
      // queryClient.invalidateQueries({ queryKey: ['tours'] });
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
              checked={item.persons.includes(user.id)}
            />
            <img
              className={styles.checkbox_icon}
              src={item.persons.includes(user.id) ? checkbox_ch : checkbox}
              alt=''
            />
          </div>
          <p
            className={
              item.persons.includes(user.id)
                ? `${styles.item_name} ${styles.item_name_checked}`
                : styles.item_name
            }
          >
            {item.name}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
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
