import { FC } from 'react';
import styles from './AddNewItemToCategory.module.css';
import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import { ModalContainer } from '../ModalContainer/ModalContainer';
import { addNewItemToCategory } from '../../../Pages/Lists/api';
import { IAddNewItemToCategoryProps } from '../../../Types/Components/Modals';
import { SpinerInModal } from '../../Spinner/SpinerInModal';
import toast from 'react-hot-toast';
export const AddNewItemToCategory: FC<IAddNewItemToCategoryProps> = ({
  toggleModal,
  isOpen,
  refetch,
  listId,
  category,
  cleanCategory,
}) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
    },
    // validate,
    onSubmit: (values) => {
      mutate({
        listId,
        itemData: {
          name: values.name,
          category: category,
          description: values.description,
        },
      });
    },
  });
  const { mutate, isPending } = useMutation({
    mutationFn: addNewItemToCategory,
    onSuccess: () => {
      refetch();
      formik.values.name = '';
      formik.values.description = '';
      toast.success('Item added successfully');
      // toggleModal();
    },
  });
  if (isPending) {
    return (
      <ModalContainer
        toggleModal={() => {
          toggleModal();
          formik.resetForm();
        }}
        isOpen={isOpen}
        title='Add new item'
      >
        <SpinerInModal />
      </ModalContainer>
    );
  }
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
            disabled={formik.values.name.length === 0}
            className={styles.create}
          >
            Create
          </button>
          <button
            type='button'
            onClick={() => {
              cleanCategory();
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
