import { FC, ReactNode, useState } from "react";
import styles from "./Lists.module.css";
import { PackingList } from "../../Components/PackingList/PackingList";
import plus from "../../assets/button plus.svg";
import { CreateList } from "../../Components/Modals/CreateList/CreateList";
import { SetTripType } from "../../Components/Modals/SetTripType/SetTripType";
import { SetTripDuration } from "../../Components/Modals/SetTripDuration/SetTripDuration";
import { SetRecOrEmpty } from "../../Components/Modals/SetRecOtEmpty/SetRecOrEmpty";

const Lists: FC = () => {
	const [currentModal, setCurrentModal] = useState<string>("setRecOrEmpty");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const handleToggleModal = () => {
		if (isModalOpen) {
			document.body.style.overflow = "unset";
			setIsModalOpen((state) => !state);
			return;
		}
		document.body.style.overflow = "hidden";
		setIsModalOpen((state) => !state);
	};

	const toggleCurrentModal = (key: string) => {
		setCurrentModal(key);
	};

	const Modals: Record<string, ReactNode> = {
		setTripName: (
			<CreateList
				setCurrentModal={toggleCurrentModal}
				isOpen={isModalOpen}
				toggleModal={handleToggleModal}
			/>
		),
		setTripType: (
			<SetTripType
				setCurrentModal={toggleCurrentModal}
				isOpen={isModalOpen}
				toggleModal={handleToggleModal}
			/>
		),
		setTripDuration: (
			<SetTripDuration
				setCurrentModal={toggleCurrentModal}
				isOpen={isModalOpen}
				toggleModal={handleToggleModal}
			/>
		),
		setRecOrEmpty: (
			<SetRecOrEmpty
				setCurrentModal={toggleCurrentModal}
				isOpen={isModalOpen}
				toggleModal={handleToggleModal}
			/>
		),
	};
	return (
		<main className={styles.main}>
			<PackingList />
			<img
				onClick={handleToggleModal}
				className={styles.plus_btn}
				src={plus}
				alt="Add list"
			/>
			{Modals[currentModal]}
		</main>
	);
};

export default Lists;
