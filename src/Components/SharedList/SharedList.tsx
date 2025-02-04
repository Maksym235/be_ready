import styles from './SharedList.module.css';
import { SharedListText } from './SharedListText/SharedListText';
import { Link, useLocation } from 'react-router-dom';
import { Trip } from '../Trip/Trip';
import { Spinner } from '../Spinner/Spinner';
import { FC } from 'react';
import { SharedListPropsType } from '../../Types/Components/Lists';

export const SharedList: FC<SharedListPropsType> = ({ list, requests }) => {
  const location = useLocation();
  return (
    <div>
      <SharedListText isEmpty={list ? list.length === 0 : true} />
      {list && list.length > 0 && (
        <p className={styles.awaitAccept}>Accepted</p>
      )}
      <ul className={styles.list}>
        {list ? (
          list.length > 0 &&
          list.map((el, index: number) => (
            <li key={index}>
              <Link state={{ from: location }} to={`/selectedList/${el._id}`}>
                <Trip type={1} name={el.name} />
              </Link>
            </li>
          ))
        ) : (
          <Spinner />
        )}
      </ul>
      {requests && (
        <>
          <p className={styles.awaitAccept}>Awaiting acceptance</p>
          <ul className={styles.list}>
            {requests.trips.map((el) => (
              <li key={el.id}>
                <Trip type={2} name={el.name} id={el.id} />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};
