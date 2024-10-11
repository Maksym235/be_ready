import { FC, useState } from 'react';
import Logo from '../../assets/⛰ beReady 🏕️.svg';
import Burger from '../../assets/burger.svg';
import styles from './Header.module.css';
import { BurgerMenu } from '../Modals/Burger/BurgerMenu';
import { Link, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getCurrent } from '../../Pages/Home/api';
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

export interface IHeaderProps {
  user: IUser;
}
export const Header: FC = () => {
  const location = useLocation();

  const [isOpenBurger, setIsOpenBurger] = useState(false);
  const { data, isLoading, isError } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrent,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    console.log('error');
  }
  const handleToggleModal = () => {
    if (isOpenBurger) {
      document.body.style.overflow = 'unset';
      setIsOpenBurger((state) => !state);
      return;
    }
    document.body.style.overflow = 'hidden';
    setIsOpenBurger((state) => !state);
  };
  return (
    <>
      <div className={styles.header}>
        <div className={styles.content_cotainer}>
          <Link to='/'>
            <img src={Logo} alt='logo' />
          </Link>
          {location.pathname === '/lists' ? (
            <div className={styles.user_icon_wrapper}>
              <Link to='/profile'>
                <img
                  className={styles.user_icon}
                  width={40}
                  height={40}
                  src={data && data.user.avatarURL}
                  alt='user icon'
                />
              </Link>
              <button onClick={handleToggleModal} className={styles.burger}>
                <img src={Burger} />
              </button>
            </div>
          ) : (
            <button onClick={handleToggleModal} className={styles.burger}>
              <img src={Burger} />
            </button>
          )}
        </div>
      </div>

      <BurgerMenu isOpen={isOpenBurger} toggleBurger={handleToggleModal} />
    </>
  );
};
