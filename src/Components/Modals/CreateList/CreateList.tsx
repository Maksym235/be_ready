import { ChangeEvent, FC, useState } from "react";
import { ModalContainerCreateList } from "../ModalContainerCreateList/ModalContainerCreateList";
import styles from "./CreateList.module.css";
interface IProps {
	isOpen: boolean;
	toggleModal: () => void;
	setCurrentModal: (key: string) => void;
}
export const CreateList: FC<IProps> = ({
	isOpen,
	toggleModal,
	setCurrentModal,
}) => {
	const [tripName, setTripName] = useState("");

	const handleSetTripName = (evt: ChangeEvent<HTMLInputElement>) => {
		// setTripName(evt);
		setTripName(evt.target.value);
	};
	return (
		<ModalContainerCreateList
			isOpen={isOpen}
			toggleModal={toggleModal}
			title="New packing list"
			currentStep="setTripName"
		>
			<div className={styles.container}>
				<input
					onChange={handleSetTripName}
					className={styles.input}
					type="text"
					placeholder="Enter packing list name...*"
				/>
				<div className={styles.btn_wrapper}>
					<button
						onClick={() => setCurrentModal("setTripType")}
						disabled={tripName.length < 1}
						className={styles.next_step}
					>
						Next step
					</button>
					<button className={styles.cancel}>Cancel</button>
				</div>
			</div>
		</ModalContainerCreateList>
	);
};
