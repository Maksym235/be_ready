import {FC} from 'react'
import styles from './UsersInTrip.module.css'
import { ModalContainer } from '../ModalContainer/ModalContainer';
interface IProps {
    toggleModal: () => void;
    isOpen: boolean;
    tripId: string;
  }
export const UsersInTrip:FC<IProps> = ({toggleModal, isOpen}) => {
  return (
    <ModalContainer
      toggleModal={toggleModal}
      isOpen={isOpen}
      title='Users in shared list'
    >
      <div className={styles.container}>
        <p className={styles.title}>Friends List</p>
        <ul className={styles.list}>
          {/* {data && data?.resp.length > 0 &&
            data?.resp.map(
              (friend: { name: string; _id: string; avatar: string, invited: boolean }) => (
                <li className={styles.list_item} key={friend._id}>
                  <div className={styles.list_item_info_block}>
                  <img className={styles.avatar} src={friend.avatar} />
                  {friend.name}
                  </div>
                  <button
                    onClick={() => handleSubmitUser(false, friend._id)}
                    className={styles.invite_btn}
                  >
                  {friend.invited ? `cancel` : `send invite`}
                  </button>
                </li>
              )
            )} */}
        </ul>
      </div>
    </ModalContainer>
  )
}
