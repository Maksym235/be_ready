import { FC } from 'react';
import { ModalContainer } from '../ModalContainer/ModalContainer';
import styles from './AddNewCategory.module.css';
import { useFormik } from 'formik';
import { useMutation } from '@tanstack/react-query';
import { addNewCategory } from '../../../Pages/Lists/api';
interface IProps {
  toggleModal: (key: string) => void;
  isOpen: boolean;
  refetch: any;
  listId: string;
}
export const AddNewCategory: FC<IProps> = ({
  toggleModal,
  isOpen,
  refetch,
  listId,
}) => {
  const mutation = useMutation({
    mutationFn: addNewCategory,
    onSuccess: () => {
      refetch();
      toggleModal('newCategory');
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
    },
    // validate,
    onSubmit: (values) => {
      console.log(values);
      mutation.mutate({
        listId,
        categoryName: values.name,
      });
      // alert({ values });
    },
  });
  return (
    <ModalContainer
      toggleModal={() => toggleModal('newCategory')}
      isOpen={isOpen}
      title='New category'
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
            placeholder='Enter new category name...*'
          />
          {formik.errors.name ? (
            <p className={styles.error_msg}>{formik.errors.name}</p>
          ) : null}
        </label>
        {/* <label className={styles.label}>
          <input
            className={styles.input}
            id='category'
            name='category'
            type='text'
            onChange={formik.handleChange}
            value={formik.values.category}
            placeholder='Enter new category category...*'
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
            placeholder='Enter new category desc...*'
          />
        </label> */}
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
            onClick={() => toggleModal('NewCategory')}
            className={styles.cancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </ModalContainer>
  );
};
