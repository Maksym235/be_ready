import { FC } from 'react';
import styles from './AddNewFriend.module.css';
import { ModalContainer } from '../ModalContainer/ModalContainer';
import { useFormik } from 'formik';
import { useMutation } from '@tanstack/react-query';
import { sendFriendRequest } from '../../../Pages/Home/api';
import toast from 'react-hot-toast';
import { Spinner } from '../../Spinner/Spinner';
interface IProps {
  isOpen: boolean;
  toggleModal: () => void;
}
export const AddNewFriend: FC<IProps> = ({ isOpen, toggleModal }) => {
  const { mutate, isPending } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () => {
      toggleModal();
      toast.success('Request sended');
    },
  });
  if (isPending) {
    return <Spinner />;
  }
  // const validate = (values: { userid: string }) => {
  // 	const errors: Record<string, undefined | string> = {
  // 		userid: undefined,
  // 	};
  // 	if (!values.userid) {
  // 		errors.userid = "Required";
  // 	} else if (values.userid.length < 24) {
  // 		errors.userid = "Invalid id";
  // 	}
  // 	// else if (!/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i.test(values.userid)) {
  // 	// errors.userid = "Invalid id";
  // 	// }
  // 	return errors;
  // };
  const formik = useFormik({
    initialValues: {
      userid: '',
    },
    // validate,
    onSubmit: (values) => {
      console.log(values);
      // alert(JSON.stringify(values, null, 2));
      mutate(values.userid);
    },
  });
  return (
    <ModalContainer
      title='Add new friend'
      isOpen={isOpen}
      toggleModal={toggleModal}
    >
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <input
          className={styles.input}
          id='userid'
          name='userid'
          type='text'
          onChange={formik.handleChange}
          value={formik.values.userid}
          placeholder='Enter the ID of the user you want to add*'
        />
        {formik.errors.userid ? (
          <p className={styles.error_msg}>{formik.errors.userid}</p>
        ) : null}
        {/* <button type="submit">Submit</button> */}
        <div className={styles.btn_wrapper}>
          <button
            className={styles.btn_save}
            disabled={formik.values.userid.length === 0}
            type='submit'
            // onSubmit={() => formik.handleSubmit()}
          >
            Add
          </button>
          <button onClick={toggleModal} className={styles.btn_cancel}>
            Cancel
          </button>
        </div>
      </form>
    </ModalContainer>
  );
};
