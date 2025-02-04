import { FC } from 'react';
import { ModalContainer } from '../ModalContainer/ModalContainer';
import styles from './AddNewCategory.module.css';
import { useFormik } from 'formik';
import { useMutation } from '@tanstack/react-query';
import { addNewCategory } from '../../../Pages/Lists/api';
import { IAddNewCategoryProps } from '../../../Types/Components/Modals';
import toast from 'react-hot-toast';
import { SpinerInModal } from '../../Spinner/SpinerInModal';

export const AddNewCategory: FC<IAddNewCategoryProps> = ({
  toggleModal,
  isOpen,
  refetch,
  listId,
}) => {
  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: (values) => {
      mutate({
        listId,
        categoryName: values.name,
      });
    },
  });
  const { mutate, isPending } = useMutation({
    mutationFn: addNewCategory,
    onSuccess: () => {
      refetch();
      formik.values.name = '';
      toast.success('Category added successfully');
      // toggleModal();
    },
  });

  if (isPending) {
    return (
      <ModalContainer
        toggleModal={() => toggleModal()}
        isOpen={isOpen}
        title='New category'
      >
        <SpinerInModal />
      </ModalContainer>
    );
  }
  return (
    <ModalContainer
      toggleModal={() => toggleModal()}
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
        <div className={styles.btn_wrapper}>
          <button
            type='submit'
            disabled={formik.values.name.length === 0}
            className={styles.create}
          >
            Create
          </button>
          <button
            type='button'
            onClick={() => toggleModal()}
            className={styles.cancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </ModalContainer>
  );
};
