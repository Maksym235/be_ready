import styles from './PersonalList.module.css';
import { ListType } from '../../Types/Components/Profile';
import { Link, useLocation } from 'react-router-dom';
import { PersonalListText } from './PersonalListText/PersonalListText';
import { Trip } from '../Trip/Trip';
import { Spinner } from '../Spinner/Spinner';

export const PersonalList = ({ list }: { list: ListType[] }) => {
  const location = useLocation();
  return (
    <>
      <PersonalListText isEmpty={list ? list.length === 0 : true} />
      <ul className={styles.list}>
        {list ? (
          list.length > 0 &&
          list.map((el, index: number) => (
            <li key={index}>
              <Link state={{ from: location }} to={`/selectedList/${el._id}`}>
                <Trip type={0} name={el.name} />
              </Link>
            </li>
          ))
        ) : (
          <Spinner />
        )}
      </ul>
    </>
  );
};
