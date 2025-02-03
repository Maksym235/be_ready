import { ChangeEvent, FC, useState } from 'react';
import { ModalContainer } from '../ModalContainer/ModalContainer';
import styles from './ShowInfoCategoryItem.module.css';
import edit_icon from '../../../assets/SelectedList/Footer/icon_edit.svg';
import icon_plus from '../../../assets/Modals/icon_plus.svg';
import icon_minus from '../../../assets/Modals/icon_minus.svg';
import { useMutation } from '@tanstack/react-query';
import { updateCount, updateName } from '../../../Pages/Lists/api';
import { IShowInfoCategoryItemProps } from '../../../Types/Components/Modals';

export const ShowInfoCategoryItem: FC<IShowInfoCategoryItemProps> = ({
  toggleModal,
  isOpen,
  listId,
  item,
  refetch,
  user,
  owner,
}) => {
  const mutation = useMutation({
    mutationFn: updateCount,
    onSuccess: () => {
      refetch();
    },
  });
  const { mutate } = useMutation({
    mutationFn: updateName,
    onSuccess: () => {
      refetch();
      toggleModal();
    },
  });
  const [count, setCount] = useState(1);
  const [isEditName, setIsEditName] = useState(false);
  const [newName, setNewName] = useState(item?.name);
  const handleUpdateCount = (key: string) => {
    if (key === 'plus') {
      mutation.mutate({
        listId: listId,
        count: count + 1,
        category: item.category,
        equipId: item._id,
      });
      setCount((state) => state + 1);
    } else {
      mutation.mutate({
        listId: listId,
        count: count > 1 ? count - 1 : 1,
        category: item.category,
        equipId: item._id,
      });
      count > 1 ? setCount((state) => state - 1) : null;
    }
  };
  const handleSaveChanges = () => {
    mutate({
      listId: listId,
      name: newName ? newName : item.name,
      category: item.category,
      equipId: item._id,
    });
  };
  return (
    <ModalContainer
      toggleModal={toggleModal}
      isOpen={isOpen}
      title='Information about item'
    >
      <div className={styles.container}>
        <div className={styles.input_container}>
          <input
            placeholder={item?.name}
            className={styles.input}
            type='text'
            disabled={!isEditName}
            value={newName}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setNewName(e.target.value)
            }
          />
          <button
            disabled={user.id !== owner}
            onClick={() => setIsEditName((state) => !state)}
            className={styles.edit_btn}
          >
            <img src={edit_icon} alt='edit name trip icon' />
          </button>
        </div>
        <div>
          <p className={styles.label}>Count</p>
          <div className={styles.count_wrapper}>
            <button
              onClick={() => handleUpdateCount('minus')}
              className={styles.edit_btn}
            >
              <img src={icon_minus} alt='count minus' />
            </button>
            <p>{count}</p>
            <button
              onClick={() => handleUpdateCount('plus')}
              className={styles.edit_btn}
            >
              <img src={icon_plus} alt='count plus' />
            </button>
          </div>
        </div>
        <div>
          <p className={styles.label}>Who takes the item</p>
          <div className={styles.persons_wrapper}>
            {item?.persons &&
              item?.persons.map((el: any) => (
                <div className={styles.person_block}>
                  <p className={styles.person_icon}>{el?.name?.slice(0, 1)}</p>
                  <p className={styles.person_name}>{el?.name}</p>
                  <p className={styles.person_counter}>{count}</p>
                </div>
              ))}
          </div>
        </div>
        <div className={styles.btn_wrapper}>
          <button onClick={handleSaveChanges} className={styles.save}>
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
