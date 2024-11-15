import { FC, useState } from 'react';
import styles from './LoginModal.module.css';
import google from '../../../../assets/google.svg';
import { ModalContainer } from '../../ModalContainer/ModalContainer';
// import { useAuth } from "../../../../Pages/Home/store";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { googleAuth, loginAsync } from '../../../../Pages/Home/api';
import { getAuth, signInWithPopup } from 'firebase/auth';
import { googleAuthProvider } from '../../../../firebase';
import { IRegisterGoogleAuth } from '../../../../Types/api/home';
import { IAuthModalProps } from '../../../../Types/Components/Modals';

export const LoginModal: FC<IAuthModalProps> = ({
  toggleModal,
  isOpen,
  setCurrentModal,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => loginAsync({ email, password }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
  const { mutate: mutateG, isPending: isPendingG } = useMutation({
    mutationFn: googleAuth,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
  const handleSubmit = (evt: any) => {
    evt.preventDefault();
    const loginData: { email: string; password: string } = {
      email: email,
      password: password,
    };
    //@ts-ignore
    mutate(loginData);
    if (!isPending) {
      toggleModal();
    }
  };
  const auth = getAuth();
  const handleAuthWithGoogle = async () => {
    const userCred = await signInWithPopup(auth, googleAuthProvider);
    localStorage.setItem('googleUser', JSON.stringify(userCred));
    // alert(`name: ${userCred.user.displayName}`);
    const googleUser: IRegisterGoogleAuth = {
      name: userCred.user.displayName!,
      email: userCred.user.email!,
      avatarURL: userCred.user.photoURL!,
      avatarName: 'google_avatar',
      password: 'googleAuth',
    };
    mutateG(googleUser);
    if (!isPendingG) {
      toggleModal();
    }
  };

  return (
    <ModalContainer
      title='Log in to account'
      isOpen={isOpen}
      toggleModal={toggleModal}
    >
      <form className={styles.form}>
        <input
          onChange={(e) => setEmail(e.currentTarget.value)}
          placeholder='Enter your email...*'
          className={styles.input}
          type='email'
        />
        <input
          onChange={(e) => setPassword(e.currentTarget.value)}
          placeholder='Enter your password...*'
          className={styles.input}
          type='password'
        />
        <div className={styles.btn_wrapper}>
          <button
            onClick={handleSubmit}
            className={styles.sing_up}
            type='submit'
          >
            Sign in
          </button>
          <button
            onClick={handleAuthWithGoogle}
            className={styles.google}
            type='button'
          >
            <img width={24} height={24} src={google} alt='google icon' />
            Google
          </button>
        </div>
      </form>
      <button
        onClick={() => setCurrentModal('resetPassEnterEmail')}
        className={styles.resetPass}
      >
        RESET PASSWORD
      </button>
      <div className={styles.alredy_have_acc_block}>
        <p className={styles.alredy_have_acc_text}>DON’T HAVE AN ACCOUNT? </p>
        <button
          onClick={() => setCurrentModal('register')}
          className={styles.sing_in}
        >
          SIGN UP
        </button>
      </div>
    </ModalContainer>
  );
};
