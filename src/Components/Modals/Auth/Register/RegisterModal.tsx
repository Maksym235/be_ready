import { FC } from 'react';
import styles from './RegisterModal.module.css';
import google from '../../../../assets/google.svg';
import { ModalContainer } from '../../ModalContainer/ModalContainer';
import { getAuth, signInWithPopup } from 'firebase/auth';
import { googleAuthProvider } from '../../../../firebase';
import { IAuthModalProps } from '../../../../Types/Components/Modals';
import { CButton } from '../../../Button/Button';

export const RegisterModal: FC<IAuthModalProps> = ({
  toggleModal,
  isOpen,
  setCurrentModal,
}) => {
  const auth = getAuth();
  const handleAuthWithGoogle = async () => {
    const userCred = await signInWithPopup(auth, googleAuthProvider);
    localStorage.setItem('googleUser', JSON.stringify(userCred));
  };
  const title = 'Create new account';
  return (
    <ModalContainer isOpen={isOpen} toggleModal={toggleModal} title={title}>
      <form className={styles.form}>
        <input
          placeholder='Enter your email...*'
          className={styles.input}
          type='email'
        />
        <input
          placeholder='Enter your password...*'
          className={styles.input}
          type='password'
        />
        <input
          placeholder='Confirm your password...*'
          className={styles.input}
          type='password'
        />
        <div className={styles.btn_wrapper}>
          <CButton type='primary' htmlType='submit' disabled={false}>
            Sign up
          </CButton>
          <CButton
            type='primary'
            htmlType='button'
            disabled={false}
            onClickFn={handleAuthWithGoogle}
          >
            <img width={24} height={24} src={google} alt='google icon' />
            Google
          </CButton>
        </div>
      </form>

      <div className={styles.alredy_have_acc_block}>
        <p className={styles.alredy_have_acc_text}>ALREADY HAVE AN ACCOUNT?</p>
        <button
          onClick={() => setCurrentModal('login')}
          className={styles.sing_in}
        >
          SIGN IN
        </button>
      </div>
    </ModalContainer>
  );
};
