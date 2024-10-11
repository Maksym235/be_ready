import styles from './CategoryTitle.module.css';
import camp from '../../../assets/SelectedList/icon_camp.svg';
import arrow_bottom from '../../../assets/SelectedList/arrow_bottom.svg';
import arrow_up from '../../../assets/SelectedList/arrow_up.svg';
import { FC } from 'react';
import { ICategoryItem } from '../SelectedList';
export interface ICategoryTitleProps {
  category: string;
  equipList: any;
  opensCategories: string[];
  toggleOpenCategory: (category: string) => void;
}

export const CategoryTitle: FC<ICategoryTitleProps> = ({
  category,
  equipList,
  opensCategories,
  toggleOpenCategory,
}) => {
  const user = JSON.parse(localStorage.getItem('user')!);
  return (
    <div className={styles.title_content}>
      <div className={styles.title_img}>
        <img src={camp} alt='camp icon' />
        <h4 className={styles.title}>{category}</h4>
      </div>
      <div className={styles.cout_arrow}>
        <div className={styles.counter}>
          {
            equipList[category].filter((el: ICategoryItem) =>
              el.persons.includes(user.id)
            ).length
          }
          /{equipList[category].length}
        </div>
        <img
          src={opensCategories.includes(category) ? arrow_up : arrow_bottom}
          onClick={() => toggleOpenCategory(category)}
        />
      </div>
    </div>
  );
};
