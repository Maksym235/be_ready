import { FC, useRef } from 'react';
import styles from './UserImage.module.css';
import { useMutation } from '@tanstack/react-query';
import { changeAvatar, resetToDefaultAvatar } from '../../../Pages/Home/api';
import { Spinner } from '../../Spinner/Spinner';
export interface IUser {
  email: string;
  id: string;
  language: string;
  password: string;
  name: string;
  theme: string;
  avatarURL: string;
  avatarName: string;
}
export interface IUserImageProps {
  refetch: any;
  user: IUser;
}
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
  // const [image, setImage] = useState<any>(null);
  const onImageSelect = () => {
    inputFileRef.current.click();
    // if (e.target.files && e.target.files[0]) {
    // 	let img = e.target.files[0];
    // 	const formData = new FormData();
    // 	formData.append("avatar", img);
    // 	console.log(formData);
    // }
  };

  const onImageChange = () => {
    const file = inputFileRef.current.files[0];

    const formData = new FormData();

    formData.append('avatar', file);
    // setImage(formData);
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
