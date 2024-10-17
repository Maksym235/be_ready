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
  isOpen: boolean;
  toggleIsOpen: () => void;
  setCurrentModal: (key: string) => void;
  toggleOpen: () => void;
}
export const SelectedListHeader: React.FC<ISelectedListHeaderProps> = ({
  location,
  listId,
  listOwner,
  isEditing,
  isOpen,
  toggleIsOpen,
  setCurrentModal,
  toggleOpen,
}) => {
  const [isOpenAddUser, setIsOpenAddUser] = useState(false);
  const user = JSON.parse(localStorage.getItem('user')!);
  /*
color: var(--Neutral-White, #FFF);
font-family: e-Ukraine;
font-size: 13px;
font-style: normal;
font-weight: 300;
line-height: 20px; 
color: var(--Neutral-Neutral-100, #E2E8F0);

font-family: e-Ukraine;
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: 16px;
  */
  const handleRenameTrip = () => {
    setCurrentModal('renameTrip');
    toggleOpen();
  };
  const handleChangeTripDuration = () => {
    setCurrentModal('changeDuration');
    toggleOpen();
  };
  const handleDeleteTrip = () => {
    setCurrentModal('deleteTrip');
    toggleOpen();
  };
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
            onClick={toggleIsOpen}
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
            isOpen && isEditing
              ? `${styles.context_menu_details}`
              : `${styles.context_menu_details} ${styles.hidden}`
          }
        >
          <ul>
            <li onClick={handleRenameTrip} className={styles.cm_item}>
              <p className={styles.cm_text}>Rename</p>
              <img src={pencil} alt=' edit trip icon' />
            </li>
            <li onClick={handleChangeTripDuration} className={styles.cm_item}>
              <p className={styles.cm_text}>Change trip duration</p>
              <img src={calendar} alt='icon' />
            </li>
            <li onClick={handleDeleteTrip} className={styles.cm_item}>
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
