import { FC } from 'react';
import styles from './RenameTrip.module.css';
import { useFormik } from 'formik';
import { ModalContainer } from '../ModalContainer/ModalContainer';
import { useMutation } from '@tanstack/react-query';
import { renameTrip } from '../../../Pages/Lists/api';
import { IRenameTripProps } from '../../../Types/Components/Modals';

export const RenameTrip: FC<IRenameTripProps> = ({
  toggleModal,
  isOpen,
  refetch,
  tripId,
  tripName,
}) => {
  const mutation = useMutation({
    mutationFn: renameTrip,
    onSuccess: () => {
      refetch();
      toggleModal();
    },
  });
  const formik = useFormik({
    initialValues: {
      name: '',
    },
    // validate,
    onSubmit: (values) => {
      mutation.mutate({
        newName: values.name,
        tripId,
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
      title='Set new name'
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
            placeholder={tripName ? tripName : 'Enter new name...*'}
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
            rename
          </button>
          <button
            type='button'
            onClick={() => {
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
