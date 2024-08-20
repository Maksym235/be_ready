import { FC, ReactNode, useState } from "react";
import styles from "./Lists.module.css";
import { PackingList } from "../../Components/PackingList/PackingList";
import plus from "../../assets/button plus.svg";
import { CreateList } from "../../Components/Modals/CreateList/CreateList";
import { SetTripType } from "../../Components/Modals/SetTripType/SetTripType";
import { SetTripDuration } from "../../Components/Modals/SetTripDuration/SetTripDuration";
import { SetRecOrEmpty } from "../../Components/Modals/SetRecOtEmpty/SetRecOrEmpty";
import { useTrips } from "./store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createNewTour, getTours, toggleEquipItemCheck } from "./api";

const Lists: FC = () => {
	const [currentModal, setCurrentModal] = useState<string>("setTripName");
	const [tripName, setTripName] = useState("");
	const [tripDuration, setTripDuration] = useState("");
	const [tripType, setTripType] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);
	// const [lists, setLists] = useState<any>([]);
	// const userLists = useTrips((state: any) => state.trips);
	// const createList = useTrips((state: any) => state.createTrip);
	const queryClient = useQueryClient();
	const { isPending, isError, data, error, refetch } = useQuery({
		queryKey: ["tours"],
		queryFn: getTours,
	});
	const { mutate } = useMutation({
		mutationFn: createNewTour,
		onSuccess: () => {
			// Invalidate and refetch
			queryClient.invalidateQueries({ queryKey: ["user"] });
			refetch();
			setIsModalOpen(false);
		},
	});

	if (isPending) {
		return <div>Loading...</div>;
	}
	if (isError) {
		// console.log(query);
		return <div>{error.message}</div>;
	}

	// const { createList, trips } = useTrips((store: any) => ({
	// 	createList: store.createTrip,
	// 	trips: store.trips,
	// }));
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
			// type: tripType,
			duration: Number(tripDuration),
			listType: recOrEmpty === "rec" ? 1 : 0,
		};

		// name: resp.name,
		// 		users: resp.users,
		// 		owner: resp.owner,
		// 		duration: resp.duration,
		// 		equipList: filteredByCategory
		mutate(newTrip);
		// if (!IsPenMutation) {
		// 	setIsModalOpen(false);
		// 	refetch();
		// }
		// createList({
		// 	name: tripName,
		// 	duration: Number(tripDuration),
		// 	listType: recOrEmpty === "rec" ? 1 : 0,
		// });
		// console.log(createList);
		// setLists((state: any) => [...state, newTrip]);
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
				submit={(recOrEmpty) => handleSubmitNewTrip(recOrEmpty)}
			/>
		),
	};
	return (
		<main className={styles.main}>
			<PackingList lists={data} />
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
