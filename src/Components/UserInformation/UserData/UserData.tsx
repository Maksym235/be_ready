import { useFormik } from 'formik';
import styles from './UserData.module.css';
import edit from '../../../assets/SelectedList/Footer/icon_edit.svg';
import { FC } from 'react';
import { IUserDataProps } from '../../../Types/Components/Profile';

export const UserData: FC<IUserDataProps> = ({ user, openModal }) => {
  const formik = useFormik({
    initialValues: {
      name: user.name,
      email: user.email,
      password: user.password,
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  const handleEditField = (values: string) => {
    openModal(values);
  };
  return (
    <form className={styles.form} onSubmit={formik.handleSubmit}>
      <label className={styles.label}>
        Displayed Name
        <div className={styles.input_wrapper}>
          <input
            className={styles.input}
            id='name'
            name='name'
            type='text'
            onChange={formik.handleChange}
            value={formik.values.name}
            disabled
          />

          <button
            onClick={() => handleEditField('editName')}
            type='button'
            className={styles.btn_edit}
          >
            <img src={edit} alt='edit' />
          </button>
        </div>
      </label>
      <label className={styles.label}>
        Email
        <div className={styles.input_wrapper}>
          <input
            className={styles.input}
            id='email'
            name='email'
            type='email'
            onChange={formik.handleChange}
            value={formik.values.email}
            disabled
          />

          <button
            onClick={() => handleEditField('editEmail')}
            type='button'
            className={styles.btn_edit}
          >
            <img src={edit} alt='edit' />
          </button>
        </div>
      </label>
      <label className={styles.label}>
        Password
        <div className={styles.input_wrapper}>
          <input
            className={styles.input}
            id='password'
            name='password'
            type='password'
            onChange={formik.handleChange}
            value={formik.values.password.slice(0, 10)}
            disabled
          />

          <button
            onClick={() => handleEditField('editPassword')}
            type='button'
            className={styles.btn_edit}
          >
            <img src={edit} alt='edit' />
          </button>
        </div>
      </label>

      {/* <button type="submit">Submit</button> */}
    </form>
  );
};
