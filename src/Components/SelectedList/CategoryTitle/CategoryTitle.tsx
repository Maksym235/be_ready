import styles from './CategoryTitle.module.css';
import camp from '../../../assets/SelectedList/icon_camp.svg';
import arrow_bottom from '../../../assets/SelectedList/arrow_bottom.svg';
import arrow_up from '../../../assets/SelectedList/arrow_up.svg';
import trash from '../../../assets/SelectedList/icon_trash.svg';
import { FC } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCategory } from '../../../Pages/Lists/api';
import {
  ICategoryItem,
  ICategoryTitleProps,
} from '../../../Types/Components/SelectedLists';

export const CategoryTitle: FC<ICategoryTitleProps> = ({
  category,
  equipList,
  opensCategories,
  toggleOpenCategory,
  isEditing,
  listId,
}) => {
  const queryClient = useQueryClient();
  const user = JSON.parse(localStorage.getItem('user')!);
  const { mutate } = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tours'] });
      // queryClient.invalidateQueries({ queryKey: ['tours'] });
    },
  });
  const handleDeleteCategory = () => {
    mutate({
      listId: listId,
      categoryName: category,
    });
  };
  return (
    <div className={styles.title_content}>
      <div className={styles.title_img}>
        <img src={camp} alt='camp icon' />
        <h4 className={styles.title}>{category}</h4>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {isEditing && (
          <img
            className={styles.trash_icon}
            src={trash}
            onClick={handleDeleteCategory}
          />
        )}
        <div className={styles.cout_arrow}>
          <div className={styles.counter}>
            {
              equipList[category].filter((el: ICategoryItem) =>
                el.persons.find((item) => item._id === user.id)
              ).length
            }
            /{equipList[category].length}
          </div>
          <img
            style={{ cursor: 'pointer' }}
            src={opensCategories.includes(category) ? arrow_up : arrow_bottom}
            onClick={() => toggleOpenCategory(category)}
          />
        </div>
      </div>
    </div>
  );
};
