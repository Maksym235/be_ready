import React, { useState } from 'react';
import { Link, Location } from 'react-router-dom';
import styles from './SelectedListHeader.module.css';
import details_icon from '../../../assets/SelectedList/icon_details.svg';
import arrow_back from '../../../assets/SelectedList/icon_back.svg';
import pencil from '../../../assets/SelectedList/icon_editpen.svg';
import calendar from '../../../assets/SelectedList/icon_calendar.svg';
import trash from '../../../assets/SelectedList/icon_trash.svg';
import plus_icon from '../../../assets/Modals/icon_plus.svg';
import { AddUsersToTrip } from '../../Modals/AddUsersToTrip/AddUsersToTrip';
interface ISelectedListHeaderProps {
  location: Location;
  listId: string;
  isEditing: boolean;
  listOwner: string;
}
export const SelectedListHeader: React.FC<ISelectedListHeaderProps> = ({
  location,
  listId,
  listOwner,
  isEditing,
}) => {
  const [isOpenCm, setIsOpenCm] = useState(false);
  const [isOpenAddUser, setIsOpenAddUser] = useState(false);
  const user = JSON.parse(localStorage.getItem('user')!);
  return (
    <div>
      <div className={styles.header}>
        <Link to={location?.state ? location.state.from : '/'}>
          <img
            className={styles.header_icon_back}
            src={arrow_back}
            alt='arrow back'
          />
        </Link>
        <p className={styles.header_title}>{listId}</p>
        {isEditing ? (
          <img
            className={styles.header_icon_details}
            src={details_icon}
            alt='details icon'
            onClick={() => setIsOpenCm((state) => !state)}
          />
        ) : (
          listOwner === user.id && (
            <img
              className={styles.header_icon_details}
              src={plus_icon}
              alt=''
              onClick={() => setIsOpenAddUser((state) => !state)}
            />
          )
        )}
        <div
          className={
            isOpenCm
              ? `${styles.context_menu_details}`
              : `${styles.context_menu_details} ${styles.hidden}`
          }
        >
          <ul>
            <li className={styles.cm_item}>
              <p className={styles.cm_text}>Rename</p>
              <img src={pencil} alt=' edit trip icon' />
            </li>
            <li className={styles.cm_item}>
              <p className={styles.cm_text}>Change trip duration</p>
              <img src={calendar} alt='icon' />
            </li>
            <li className={styles.cm_item}>
              <p className={`${styles.cm_text} ${styles.cm_text_delete}`}>
                Delete list
              </p>
              <img src={trash} alt='icon' />
            </li>
          </ul>
        </div>
      </div>
      <AddUsersToTrip
        isOpen={isOpenAddUser}
        toggleModal={() => setIsOpenAddUser((state) => !state)}
      />
    </div>
  );
};
