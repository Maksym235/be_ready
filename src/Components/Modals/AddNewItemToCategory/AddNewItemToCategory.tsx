import { FC } from 'react';
import styles from './AddNewItemToCategory.module.css';
import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import { ModalContainer } from '../ModalContainer/ModalContainer';
import { addNewItemToCategory } from '../../../Pages/Lists/api';
interface IProps {
  toggleModal: () => void;
  isOpen: boolean;
  refetch: any;
  category: string;
  listId: string;
}
export const AddNewItemToCategory: FC<IProps> = ({
  toggleModal,
  isOpen,
  refetch,
  listId,
  category,
}) => {
  const mutation = useMutation({
    mutationFn: addNewItemToCategory,
    onSuccess: () => {
      refetch();
      toggleModal();
    },
  });
  // const validate = (values: { name: string; category: string }) => {
  //   const errors: Record<string, undefined | string> = {
  //     name: undefined,
  //     category: undefined,
  //   };
  //   if (!values.name) {
  //     errors.name = 'Required';
  //   }
  //   if (!values.category) {
  //     errors.category = 'Required';
  //   }
  //   return errors;
  // };
  const formik = useFormik({
    initialValues: {
      name: '',
      category: category,
      description: '',
    },
    // validate,
    onSubmit: (values) => {
      console.log(values);
      mutation.mutate({
        listId,
        itemData: {
          name: values.name,
          category: values.category,
          description: values.description,
        },
      });
    },
  });
  return (
    <ModalContainer
      toggleModal={() => {
        toggleModal();
        formik.resetForm();
      }}
      isOpen={isOpen}
      title='Add new item'
    >
      <form onSubmit={formik.handleSubmit} className={styles.container}>
        <label className={styles.label}>
          <input
            className={styles.input}
            id='name'
            name='name'
            type='text'
            onChange={formik.handleChange}
            value={formik.values.name}
            placeholder='Enter new item name...*'
          />
          {formik.errors.name ? (
            <p className={styles.error_msg}>{formik.errors.name}</p>
          ) : null}
        </label>
        <label className={styles.label}>
          <input
            className={styles.input}
            id='category'
            name='category'
            type='text'
            disabled
            onChange={formik.handleChange}
            value={formik.values.category}
            placeholder='Enter category category...*'
          />
          {formik.errors.category ? (
            <p className={styles.error_msg}>{formik.errors.category}</p>
          ) : null}
        </label>
        <label className={styles.label}>
          <input
            className={styles.input}
            id='description'
            name='description'
            type='text'
            onChange={formik.handleChange}
            value={formik.values.description}
            placeholder='Enter new item desc...*'
          />
        </label>
        <div className={styles.btn_wrapper}>
          <button
            type='submit'
            // onClick={handleAddNewItem}
            disabled={
              formik.values.name.length === 0
              // formik.values.category.length === 0
            }
            className={styles.create}
          >
            Create
          </button>
          <button
            type='button'
            onClick={() => {
              toggleModal();
              formik.resetForm();
            }}
            className={styles.cancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </ModalContainer>
  );
};
