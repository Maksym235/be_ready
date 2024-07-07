import { FC, ReactNode, useState } from "react";
import styles from "./Lists.module.css";
import { PackingList } from "../../Components/PackingList/PackingList";
import plus from "../../assets/button plus.svg";
import { CreateList } from "../../Components/Modals/CreateList/CreateList";
import { SetTripType } from "../../Components/Modals/SetTripType/SetTripType";
import { SetTripDuration } from "../../Components/Modals/SetTripDuration/SetTripDuration";
import { SetRecOrEmpty } from "../../Components/Modals/SetRecOtEmpty/SetRecOrEmpty";

const Lists: FC = () => {
	const [currentModal, setCurrentModal] = useState<string>("setTripName");
	const [tripName, setTripName] = useState("");
	const [tripDuration, setTripDuration] = useState("");
	const [tripType, setTripType] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [lists, setLists] = useState<any>([]);
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

	const handleSubmitNewTrip = (recOrEmpty: string) => {
		const newTrip = {
			name: tripName,
			type: tripType,
			duration: tripDuration,
			recOrEmpty: recOrEmpty,
		};
		console.log(newTrip);
		setIsModalOpen(false);
		setLists((state: any) => [...state, newTrip]);
	};

	const Modals: Record<string, ReactNode> = {
		setTripName: (
			<CreateList
				setCurrentModal={toggleCurrentModal}
				isOpen={isModalOpen}
				toggleModal={handleToggleModal}
				changeTripName={setTripName}
			/>
		),
		setTripType: (
			<SetTripType
				setCurrentModal={toggleCurrentModal}
				isOpen={isModalOpen}
				toggleModal={handleToggleModal}
				changeTripType={setTripType}
			/>
		),
		setTripDuration: (
			<SetTripDuration
				setCurrentModal={toggleCurrentModal}
				isOpen={isModalOpen}
				toggleModal={handleToggleModal}
				changeTripDuration={setTripDuration}
			/>
		),
		setRecOrEmpty: (
			<SetRecOrEmpty
				setCurrentModal={toggleCurrentModal}
				isOpen={isModalOpen}
				toggleModal={handleToggleModal}
				submit={handleSubmitNewTrip}
			/>
		),
	};
	return (
		<main className={styles.main}>
			<PackingList lists={lists} />
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
