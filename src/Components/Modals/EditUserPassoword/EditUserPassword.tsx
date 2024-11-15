import { FC } from 'react';
import styles from './EditUserPassword.module.css';
import { useFormik } from 'formik';
import { ModalContainer } from '../ModalContainer/ModalContainer';
import { IEditUserPasswordProps } from '../../../Types/Components/Modals';

export const EditUserPassword: FC<IEditUserPasswordProps> = ({
  isOpen,
  toggleModal,
  submit,
}) => {
  const validate = (values: {
    curPass: string;
    newPass: string;
    сonfPass: string;
  }) => {
    const errors: Record<string, undefined | string> = {
      curPass: undefined,
      newPass: undefined,
      confPass: undefined,
    };
    if (!values.curPass) {
      errors.curPass = 'Required';
    }
    if (!values.newPass) {
      errors.newPass = 'Required';
    }
    if (!values.сonfPass) {
      errors.сonfPass = 'Required';
    } else if (values.newPass !== values.сonfPass) {
      errors.сonfPass = 'passwords do not match';
    }
    return errors;
  };
  const formik = useFormik({
    initialValues: {
      curPass: '',
      newPass: '',
      сonfPass: '',
    },
    validate,
    onSubmit: (values) => {
      submit({
        name: '',
        email: '',
        curPassword: values.curPass,
        password: values.newPass,
      });
    },
  });
  return (
    <ModalContainer
      title='edit password'
      isOpen={isOpen}
      toggleModal={toggleModal}
    >
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <input
          className={styles.input}
          id='curPass'
          name='curPass'
          type='password'
          onChange={formik.handleChange}
          value={formik.values.curPass}
          placeholder='Enter your current password...*'
        />

        {formik.errors.curPass ? (
          <p className={styles.error_msg}>{formik.errors.curPass}</p>
        ) : null}
        <input
          className={styles.input}
          id='newPass'
          name='newPass'
          type='password'
          onChange={formik.handleChange}
          value={formik.values.newPass}
          placeholder='Enter your new password...*'
        />

        {formik.errors.newPass ? (
          <p className={styles.error_msg_new_pass}>{formik.errors.newPass}</p>
        ) : null}
        <input
          className={styles.input}
          id='сonfPass'
          name='сonfPass'
          type='password'
          onChange={formik.handleChange}
          value={formik.values.сonfPass}
          placeholder='Confirm your new password...*'
        />

        {formik.errors.сonfPass ? (
          <p className={styles.error_msg_conf_pass}>{formik.errors.сonfPass}</p>
        ) : null}
      </form>
      <div className={styles.btn_wrapper}>
        <button
          className={styles.btn_save}
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
