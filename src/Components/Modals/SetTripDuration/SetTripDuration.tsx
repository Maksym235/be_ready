import { ChangeEvent, FC, useState } from "react";
import { ModalContainerCreateList } from "../ModalContainerCreateList/ModalContainerCreateList";
import styles from "./SetTripDuration.module.css";
interface IProps {
	isOpen: boolean;
	toggleModal: () => void;
	setCurrentModal: (key: string) => void;
	changeTripDuration: (duration: string) => void;
}
export const SetTripDuration: FC<IProps> = ({
	isOpen,
	toggleModal,
	setCurrentModal,
	changeTripDuration,
}) => {
	const [tripDuration, setTripDuration] = useState("");

	const handleSetTripDuration = (evt: ChangeEvent<HTMLInputElement>) => {
		setTripDuration(evt.target.value);
	};
	const handleNextPage = () => {
		setCurrentModal("setRecOrEmpty");
		changeTripDuration(tripDuration);
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
						onClick={handleNextPage}
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
