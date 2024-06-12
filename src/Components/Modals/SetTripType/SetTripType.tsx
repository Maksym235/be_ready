import { FC, useState } from "react";
import { ModalContainerCreateList } from "../ModalContainerCreateList/ModalContainerCreateList";
import styles from "./SetTripType.module.css";
import hiking_active from "../../../assets/hiking_active.svg";
import hiking_disabled from "../../../assets/hiking_disabled.svg";
import bagage_active from "../../../assets/bagage_active.svg";
import bagage_disabled from "../../../assets/bagage_disabled.svg";
interface IProps {
	isOpen: boolean;
	toggleModal: () => void;
	setCurrentModal: (key: string) => void;
}
export const SetTripType: FC<IProps> = ({
	isOpen,
	toggleModal,
	setCurrentModal,
}) => {
	const [selectedType, setSelectedType] = useState("");
	return (
		<ModalContainerCreateList
			isOpen={isOpen}
			toggleModal={toggleModal}
			title="New packing list"
			currentStep="setTripType"
		>
			<div className={styles.container}>
				<p className={styles.title}>Select the type of trip:</p>
				<div className={styles.icon_wrapper}>
					<img
						onClick={() => setSelectedType("hiking")}
						src={selectedType === "hiking" ? hiking_active : hiking_disabled}
						alt="hiking"
					/>
					<img
						onClick={() => setSelectedType("bagage")}
						src={selectedType === "bagage" ? bagage_active : bagage_disabled}
						alt="baggage"
					/>
				</div>
				<div className={styles.btn_wrapper}>
					<button
						onClick={() => setCurrentModal("setTripDuration")}
						disabled={selectedType.length < 1}
						className={styles.next_step}
					>
						NEXT STEP
					</button>
					<button
						onClick={() => setCurrentModal("setTripName")}
						className={styles.back}
					>
						BACK
					</button>
				</div>
			</div>
		</ModalContainerCreateList>
	);
};
