import { FC, useState } from 'react';
import { ModalContainer } from '../ModalContainer/ModalContainer';
import styles from './AddNewCategory.module.css';
import axios from 'axios';
interface IProps {
  toggleModal: () => void;
  isOpen: boolean;
  refetch: any;
}
export const AddNewCategory: FC<IProps> = ({
  toggleModal,
  isOpen,
  refetch,
}) => {
  const [categoryName, setCategoryName] = useState('');
  const [categoryCategory, setCategoryCategory] = useState('');
  const [categoryDesc, setCategoryDesc] = useState('');
  const handleSetCategoryName = (evt: React.FormEvent<HTMLInputElement>) => {
    setCategoryName(evt.currentTarget.value);
  };
  const handleSetCategoryCategory = (
    evt: React.FormEvent<HTMLInputElement>
  ) => {
    setCategoryCategory(evt.currentTarget.value);
  };
  const handleSetCategoryDesc = (evt: React.FormEvent<HTMLInputElement>) => {
    setCategoryDesc(evt.currentTarget.value);
  };
  const handleAddNewItem = async () => {
    try {
      const resp = await axios.post(
        `http://localhost:8080/tours/66e491a111e5d62646dd0ce3/addNewItem`,
        {
          name: categoryName,
          description: categoryDesc,
          category: categoryCategory,
        },
        {
          headers: {
            Authorization: 'Bearer ' + window.localStorage.getItem('token'),
          },
        }
      );
      console.log(resp);
      if (resp.status === 200) {
        refetch();
        toggleModal();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ModalContainer
      toggleModal={toggleModal}
      isOpen={isOpen}
      title='New category'
    >
      <div className={styles.container}>
        <input
          onChange={handleSetCategoryName}
          className={styles.input}
          type='text'
          placeholder='Enter new category name...*'
        />
        <input
          onChange={handleSetCategoryCategory}
          className={styles.input}
          type='text'
          placeholder='Enter new category category...*'
        />
        <input
          onChange={handleSetCategoryDesc}
          className={styles.input}
          type='text'
          placeholder='Enter new category desc...*'
        />
        <div className={styles.btn_wrapper}>
          <button
            onClick={handleAddNewItem}
            disabled={categoryName.length < 1}
            className={styles.create}
          >
            Create
          </button>
          <button className={styles.cancel}>Cancel</button>
        </div>
      </div>
    </ModalContainer>
  );
};
