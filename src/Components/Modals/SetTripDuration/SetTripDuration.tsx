import { ChangeEvent, FC, useState } from "react";
import { ModalContainerCreateList } from "../ModalContainerCreateList/ModalContainerCreateList";
import styles from "./SetTripDuration.module.css";
interface IProps {
	isOpen: boolean;
	toggleModal: () => void;
	setCurrentModal: (key: string) => void;
}
export const SetTripDuration: FC<IProps> = ({
	isOpen,
	toggleModal,
	setCurrentModal,
}) => {
	const [tripDuration, setTripDuration] = useState("");

	const handleSetTripDuration = (evt: ChangeEvent<HTMLInputElement>) => {
		setTripDuration(evt.target.value);
	};

	return (
		<ModalContainerCreateList
			isOpen={isOpen}
			toggleModal={toggleModal}
			title="New packing list"
			currentStep="setTripDuration"
		>
			<div className={styles.container}>
				<p className={styles.title}>Enter the duration of the trip:</p>
				<input
					onChange={handleSetTripDuration}
					className={styles.input}
					type="number"
					placeholder="Enter the duration...*"
				/>
				<div className={styles.btn_wrapper}>
					<button
						onClick={() => setCurrentModal("setRecOrEmpty")}
						disabled={tripDuration.length < 1}
						className={styles.next_step}
					>
						Next step
					</button>
					<button
						onClick={() => setCurrentModal("setTripType")}
						className={styles.cancel}
					>
						Back
					</button>
				</div>
			</div>
		</ModalContainerCreateList>
	);
};
