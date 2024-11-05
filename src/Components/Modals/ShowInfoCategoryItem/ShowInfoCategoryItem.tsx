import { FC, useState } from 'react';
import { ModalContainer } from '../ModalContainer/ModalContainer';
import styles from './ShowInfoCategoryItem.module.css';
import edit_icon from '../../../assets/SelectedList/Footer/icon_edit.svg';
import icon_plus from '../../../assets/Modals/icon_plus.svg';
import icon_minus from '../../../assets/Modals/icon_minus.svg';
import { ICategoryItem } from '../../SelectedList/SelectedList';
interface IProps {
  toggleModal: () => void;
  isOpen: boolean;
  tripName: string;
  item: ICategoryItem;
  usersInfo: any;
}

export const ShowInfoCategoryItem: FC<IProps> = ({
  toggleModal,
  tripName,
  isOpen,
  usersInfo,
}) => {
  const [count, setCount] = useState(1);
  return (
    <ModalContainer
      toggleModal={toggleModal}
      isOpen={isOpen}
      title='Information about item'
    >
      <div className={styles.container}>
        <div className={styles.input_container}>
          <input placeholder={tripName} className={styles.input} type='text' />
          <button className={styles.edit_btn}>
            <img src={edit_icon} alt='edit name trip icon' />
          </button>
        </div>
        <div>
          <p className={styles.label}>Count</p>
          <div className={styles.count_wrapper}>
            <button
              onClick={() =>
                count > 1 ? setCount((state) => state - 1) : null
              }
              className={styles.edit_btn}
            >
              <img src={icon_minus} alt='count minus' />
            </button>
            <p>{count}</p>
            <button
              onClick={() => setCount((state) => state + 1)}
              className={styles.edit_btn}
            >
              <img src={icon_plus} alt='count plus' />
            </button>
          </div>
        </div>
        <div>
          <p className={styles.label}>Who takes the item</p>
          <div className={styles.persons_wrapper}>
            {usersInfo &&
              usersInfo.map((el: any) => (
                <div className={styles.person_block}>
                  <p className={styles.person_icon}>{el.name.slice(0, 1)}</p>
                  <p className={styles.person_name}>{el.name}</p>
                  <p className={styles.person_counter}>{count}</p>
                </div>
              ))}
            {/* <div className={styles.person_block}>
							<p
								className={`${styles.person_icon} ${styles.person_icon_disabled}`}
							>
								K
							</p>
							<p
								className={`${styles.person_name} ${styles.person_name_disabled}`}
							>
								Kolya
							</p>
							<p
								className={`${styles.person_counter} ${styles.person_counter_disabled}`}
							>
								0
							</p>
						</div>
						<div className={styles.person_block}>
							<p className={styles.person_icon}>M</p>
							<p className={styles.person_name}>Maksym</p>
							<p className={styles.person_counter}>1</p>
						</div>
						<div className={styles.person_block}>
							<p className={styles.person_icon}>D</p>
							<p className={styles.person_name}>Dasha</p>
							<p className={styles.person_counter}>2</p>
						</div> */}
          </div>
        </div>
        <div className={styles.btn_wrapper}>
          <button onClick={toggleModal} className={styles.save}>
            Save changes
          </button>
          <button onClick={toggleModal} className={styles.cancel}>
            cancel
          </button>
        </div>
      </div>
    </ModalContainer>
  );
};
