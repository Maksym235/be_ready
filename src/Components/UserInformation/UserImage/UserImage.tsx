import { FC, useRef } from 'react';
import styles from './UserImage.module.css';
import { useMutation } from '@tanstack/react-query';
import { changeAvatar, resetToDefaultAvatar } from '../../../Pages/Home/api';
import { Spinner } from '../../Spinner/Spinner';
import { IUserImageProps } from '../../../Types/Components/Profile';

export const UserImage: FC<IUserImageProps> = ({ refetch, user }) => {
  const inputFileRef: any = useRef();
  const { mutate, isPending } = useMutation({
    mutationFn: changeAvatar,
    onSuccess: () => {
      refetch();
    },
  });
  const { mutate: resetM, isPending: resetPending } = useMutation({
    mutationFn: resetToDefaultAvatar,
    onSuccess: () => {
      refetch();
    },
  });
  const onImageSelect = () => {
    inputFileRef.current.click();
  };

  const onImageChange = () => {
    const file = inputFileRef.current.files[0];

    const formData = new FormData();

    formData.append('avatar', file);
    mutate(formData);
  };
  const resetToDefault = () => {
    resetM();
  };
  if (isPending || resetPending) {
    return <Spinner />;
  }
  return (
    <div className={styles.container}>
      <div className={styles.img_block}>
        {user.avatarURL ? (
          <img
            className={styles.avatar}
            src={user.avatarURL}
            alt='user avatar'
          />
        ) : (
          'M'
        )}
      </div>
      <div className={styles.btn_wrapper}>
        <button
          className={styles.btn}
          onClick={resetToDefault}
          disabled={user.avatarName === 'default_user'}
        >
          Reset to default
        </button>
        <button onClick={onImageSelect} className={styles.btn}>
          Upload my own
        </button>
        <input ref={inputFileRef} type='file' hidden onChange={onImageChange} />
      </div>
    </div>
  );
};
