import { FC } from 'react';
import styles from './ChangeTripDuration.module.css';
import { useFormik } from 'formik';
import { ModalContainer } from '../ModalContainer/ModalContainer';
import { useMutation } from '@tanstack/react-query';
import { changeDuration } from '../../../Pages/Lists/api';
interface IProps {
  toggleModal: () => void;
  isOpen: boolean;
  refetch: any;
  tripId: string;
  tripDuraition: number;
}
export const ChangeTripDuration: FC<IProps> = ({
  toggleModal,
  isOpen,
  refetch,
  tripId,
  tripDuraition,
}) => {
  const mutation = useMutation({
    mutationFn: changeDuration,
    onSuccess: () => {
      refetch();
      toggleModal();
    },
  });
  const formik = useFormik({
    initialValues: {
      duration: tripDuraition,
    },
    // validate,
    onSubmit: (values) => {
      console.log(values);
      mutation.mutate({
        tripId,
        duration: values.duration,
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
            id='duration'
            name='duration'
            type='number'
            onChange={formik.handleChange}
            value={formik.values.duration}
            placeholder={
              tripDuraition ? String(tripDuraition) : 'Enter new duration...*'
            }
          />
          {formik.errors.duration ? (
            <p className={styles.error_msg}>{formik.errors.duration}</p>
          ) : null}
        </label>
        <div className={styles.btn_wrapper}>
          <button
            type='submit'
            // onClick={handleAddNewItem}
            disabled={
              formik.values.duration === tripDuraition
              // formik.values.category.length === 0
            }
            className={styles.create}
          >
            rename
          </button>
          <button
            type='button'
            onClick={() => {
              //   toggleModal('newItem');
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
