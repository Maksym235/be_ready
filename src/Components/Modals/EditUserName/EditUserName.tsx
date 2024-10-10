import { FC } from 'react';
import { useFormik } from 'formik';
import styles from './EditUserName.module.css';
import { ModalContainer } from '../ModalContainer/ModalContainer';
import { IUserDataToUpdate } from '../../UserInformation/UserInformation';
export interface IProps {
  isOpen: boolean;
  toggleModal: () => void;
  submit: (data: IUserDataToUpdate) => void;
}
export const EditUserName: FC<IProps> = ({ isOpen, submit, toggleModal }) => {
  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      // setNewName();
      submit({
        name: values.name,
        email: '',
        curPassword: '',
        password: '',
      });
    },
  });
  return (
    <ModalContainer
      title='edit display name'
      isOpen={isOpen}
      toggleModal={toggleModal}
    >
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <input
          className={styles.input}
          id='name'
          name='name'
          type='text'
          onChange={formik.handleChange}
          value={formik.values.name}
          placeholder='Enter your name...*'
        />
      </form>
      <div className={styles.btn_wrapper}>
        <button
          className={styles.btn_save}
          disabled={formik.values.name.length <= 0}
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
