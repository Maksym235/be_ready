import { FC, FormEvent, useState } from "react";
import { ModalContainer } from "../ModalContainer/ModalContainer";
import styles from "./AddUsersToTrip.module.css";
interface IProps {
	toggleModal: () => void;
	isOpen: boolean;
}
export const AddUsersToTrip: FC<IProps> = ({ toggleModal, isOpen }) => {
	const [userId, setUserId] = useState("");

	const handdleSetUserId = (evt: FormEvent<HTMLInputElement>) => {
		setUserId(evt.currentTarget.value);
	};
	return (
		<ModalContainer
			toggleModal={toggleModal}
			isOpen={isOpen}
			title="Connect users"
		>
			<div className={styles.container}>
				<input
					onChange={handdleSetUserId}
					className={styles.input}
					type="text"
					placeholder="Enter new user id...*"
				/>
				<div className={styles.btn_wrapper}>
					<button
						onClick={toggleModal}
						disabled={userId.length < 1}
						className={styles.create}
					>
						Connect
					</button>
					<button onClick={toggleModal} className={styles.cancel}>
						Cancel
					</button>
				</div>
			</div>
		</ModalContainer>
	);
};
