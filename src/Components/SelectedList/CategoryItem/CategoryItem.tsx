import { FC } from 'react';
import styles from './CategoryItem.module.css';
import info_icon from '../../../assets/SelectedList/icon_info.svg';
import checkbox from '../../../assets/SelectedList/checkbox.svg';
import checkbox_ch from '../../../assets/SelectedList/checkbox_ch.svg';
import plus_icon from '../../../assets/Modals/icon_plus.svg';
export interface ICategoryItemProps {
  user: any;
  item: any;
  handleCheckedItem: (item: any) => void;
  handleShowInfo: (item: any) => void;
  isEditing: boolean;
}
export const CategoryItem: FC<ICategoryItemProps> = ({
  item,
  user,
  handleCheckedItem,
  handleShowInfo,
  isEditing,
}) => {
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
          <p>{item.name}</p>
        </div>
        <img
          onClick={() => handleShowInfo(item)}
          src={info_icon}
          alt='information icon'
        />
      </div>
      {isEditing && (
        <button className={styles.add_category_item}>
          <img src={plus_icon} alt='add item icon' />
          <p className={styles.add_category_item_text}>Add Item</p>
        </button>
      )}
    </div>
  );
};
