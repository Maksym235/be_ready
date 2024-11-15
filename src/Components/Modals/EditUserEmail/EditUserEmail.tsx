import { useFormik } from 'formik';
import { FC } from 'react';
import styles from './EditUserEmail.module.css';
import { ModalContainer } from '../ModalContainer/ModalContainer';
import { IEditUserEmailProps } from '../../../Types/Components/Modals';

export const EditUserEmail: FC<IEditUserEmailProps> = ({
  isOpen,
  toggleModal,
  submit,
}) => {
  const validate = (values: { email: string }) => {
    const errors: Record<string, undefined | string> = {
      email: undefined,
    };
    if (!values.email) {
      errors.email = 'Required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = 'Invalid email address';
    }
    return errors;
  };
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validate,
    onSubmit: (values) => {
      submit({
        name: '',
        email: values.email,
        curPassword: '',
        password: '',
      });
    },
  });
  return (
    <ModalContainer
      title='edit email'
      isOpen={isOpen}
      toggleModal={toggleModal}
    >
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <input
          className={styles.input}
          id='email'
          name='email'
          type='email'
          onChange={formik.handleChange}
          value={formik.values.email}
          placeholder='Enter your email...*'
        />

        {formik.errors.email ? (
          <p className={styles.error_msg}>{formik.errors.email}</p>
        ) : null}
      </form>
      <div className={styles.btn_wrapper}>
        <button
          className={styles.btn_save}
          disabled={
            formik.errors.email !== undefined && formik.errors.email.length > 0
          }
          type='submit'
          onClick={() => formik.handleSubmit()}
        >
          Save
        </button>
        <button className={styles.btn_cancel}>Cancel</button>
      </div>
    </ModalContainer>
  );
};
