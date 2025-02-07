import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './SelectedListHeader.module.css';
import details_icon from '../../../assets/SelectedList/icon_details.svg';
import arrow_back from '../../../assets/SelectedList/icon_back.svg';
import pencil from '../../../assets/SelectedList/icon_editpen.svg';
import calendar from '../../../assets/SelectedList/icon_calendar.svg';
import trash from '../../../assets/SelectedList/icon_trash.svg';
import group from '../../../assets/SelectedList/Group.svg';
import {
  ISelectedListHeaderProps,
  QueryDataType,
} from '../../../Types/Components/SelectedLists';
import { useQueryClient } from '@tanstack/react-query';

export const SelectedListHeader: FC<ISelectedListHeaderProps> = ({
  isEditing,
  isOpen,
  toggleIsOpen,
  setCurrentModal,
  toggleOpen,
}) => {
  const location = useLocation();
  const queryQlient = useQueryClient();
  const data = queryQlient.getQueryData(['tours']) as QueryDataType;
  console.log(data);
  const handleTogleModal = (key: string) => {
    setCurrentModal(key);
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
        <p className={styles.header_title}>{data?.trip && data?.trip?.name}</p>
        {isEditing ? (
          <img
            className={styles.header_icon_details}
            src={details_icon}
            alt='details icon'
            onClick={toggleIsOpen}
          />
        ) : (
          <img
            className={styles.header_icon_details}
            src={group}
            alt='details icon'
            onClick={() => handleTogleModal('usersInTrip')}
          />
        )}
        <div
          className={
            isOpen && isEditing
              ? `${styles.context_menu_details}`
              : `${styles.context_menu_details} ${styles.hidden}`
          }
        >
          <ul>
            <li
              onClick={() => handleTogleModal('renameTrip')}
              className={styles.cm_item}
            >
              <p className={styles.cm_text}>Rename</p>
              <img src={pencil} alt=' edit trip icon' />
            </li>
            <li
              onClick={() => handleTogleModal('changeDuration')}
              className={styles.cm_item}
            >
              <p className={styles.cm_text}>Change trip duration</p>
              <img src={calendar} alt='icon' />
            </li>
            <li
              onClick={() => handleTogleModal('deleteTrip')}
              className={styles.cm_item}
            >
              <p className={`${styles.cm_text} ${styles.cm_text_delete}`}>
                Delete list
              </p>
              <img className={styles.trash_icon} src={trash} alt='icon' />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
