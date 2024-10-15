import { FC } from 'react';
import styles from './CategoryItem.module.css';
import info_icon from '../../../assets/SelectedList/icon_info.svg';
import checkbox from '../../../assets/SelectedList/checkbox.svg';
import checkbox_ch from '../../../assets/SelectedList/checkbox_ch.svg';
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
        <img
          onClick={() => handleShowInfo(item)}
          src={info_icon}
          alt='information icon'
        />
      </div>
    </div>
  );
};
