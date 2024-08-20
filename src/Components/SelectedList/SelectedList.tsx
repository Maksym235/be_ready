import { FC, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styles from "./SelectedList.module.css";
import camp from "../../assets/SelectedList/icon_camp.svg";
import arrow_bottom from "../../assets/SelectedList/arrow_bottom.svg";
import arrow_up from "../../assets/SelectedList/arrow_up.svg";
import info_icon from "../../assets/SelectedList/icon_info.svg";
import checkbox from "../../assets/SelectedList/checkbox.svg";
import checkbox_ch from "../../assets/SelectedList/checkbox_ch.svg";
import plus_icon from "../../assets/Modals/icon_plus.svg";
import { ShowInfoCategoryItem } from "../Modals/ShowInfoCategoryItem/ShowInfoCategoryItem";
import { AddNewCategory } from "../Modals/AddNewCategory/AddNewCategory";
import { SelectedListFooter } from "./SelectedListFooter/SelectedListFooter";
import { SelectedListHeader } from "./SelectedListHeader/SelectedListHeader";
import { useTrips } from "../../Pages/Lists/store";
import { useAuth } from "../../Pages/Home/store";
import {
	QueryClient,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import { getToursById, toggleEquipItemCheck } from "../../Pages/Lists/api";
export const SelectedList: FC = () => {
	const [opensCategories, setOpensCategories] = useState<string[]>([]);
	const [isOpen, setIsOpen] = useState(false);
	const [isOpenNewCategory, setIsOpenNewCategory] = useState(false);
	const [isCheckedItem, setIsCheckedItem] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const listId = useParams();
	const tripId = listId.id;
	const location = useLocation();
	const queryClient = useQueryClient();
	const { user } = useAuth((store: any) => ({
		user: store.user,
	}));
	const { isPending, isError, data, error } = useQuery({
		queryKey: ["tours"],
		queryFn: () => getToursById(tripId ? tripId : "", true),
	});
	const mutation = useMutation({
		mutationFn: toggleEquipItemCheck,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["tours"] });
		},
	});
	// const filteredByCategory = currentTrip.equipList.reduce(
	// 	(acc: any, item: any) => {
	// 		console.log(item.category);
	// 	},
	// 	{},
	// );
	// const filteredByCategory = currentTrip.equipList
	// 	.flat()
	// 	.reduce((acc: any, item: any) => {
	// 		if (acc[item.category]) {
	// 			acc[item.category] = [...acc[item.category], item];
	// 		}
	// 		acc[item.category] = [item];
	// 		return acc;
	// 	}, {});
	if (isPending) {
		return <div>Loading...</div>;
	}
	if (isError) {
		return <div>Error</div>;
	}
	// const filteredByCategory = data
	// 	? data.trip.equipList.flat().reduce((acc: any, item: any) => {
	// 			const category = item.category;

	// 			if (!acc[category]) {
	// 				acc[category] = [];
	// 			}

	// 			acc[category].push(item);
	// 			return acc;
	// 	  }, {})
	// 	: [];
	const toggleIsOpen = () => {
		setIsOpen((state) => !state);
	};
	const toggleIsOpenNewCategory = () => {
		setIsOpenNewCategory((state) => !state);
	};
	const toggleOpenCategory = (id: string) => {
		if (opensCategories.includes(id)) {
			setOpensCategories(opensCategories.filter((el) => el !== id));
			return;
		}
		setOpensCategories((state) => [...state, id]);
	};

	// const mutation = useMutation({
	// 	mutationFn: () =>
	// 		toggleEquipItemCheck({
	// 			tourId: tripId ? tripId : "",
	// 			equipItemId: equipId,
	// 		}),
	// 	onSuccess: () => {
	// 		queryClient.invalidateQueries({ queryKey: ["tours"] });
	// 	},
	// });

	const toggleIsEditing = () => {
		setIsEditing((state) => !state);
	};
	const handleCheckedItem = (item: Record<string, any>) => {
		// setIsCheckedItem(evt.target.checked);

		mutation.mutate({
			tourId: tripId ? tripId : "",
			equipItemId: item._id,
		});
		// const index = item.persons.findIndex((el: string) => el === user.id);
		// if (index === -1) {
		// 	item.persons.push(user.id);
		// } else {
		// 	item.persons.splice(index, 1);
		// }
	};

	return (
		<>
			<SelectedListHeader
				location={location}
				listId={data.trip ? data.trip.name : ""}
				isEditing={isEditing}
			/>
			<div className={styles.container}>
				<div className={styles.categories_wrapper}>
					{data.trip &&
						Object.keys(data.trip.equipList).map((el) => (
							<div className={styles.category}>
								<div className={styles.title_content}>
									<div className={styles.title_img}>
										<img src={camp} alt="camp icon" />
										<h4 className={styles.title}>{el}</h4>
									</div>
									<div className={styles.cout_arrow}>
										<div className={styles.counter}>0/9</div>
										<img
											src={
												opensCategories.includes(el) ? arrow_up : arrow_bottom
											}
											onClick={() => toggleOpenCategory(el)}
										/>
									</div>
								</div>
								{opensCategories.includes(el) && (
									<>
										{data.trip.equipList[el].map((item: any) => (
											<div key={item._id}>
												<div className={styles.category_item}>
													<div
														style={{
															display: "flex",
															gap: "16px",
															alignItems: "center",
														}}
													>
														<div className={styles.checkbox_wrapper}>
															<input
																onClick={() => handleCheckedItem(item)}
																// className={styles.checkbox_input}
																type="checkbox"
																checked={item.persons.includes(user.id)}
															/>
															{/* <img
																className={styles.checkbox_icon}
																src={
																	item.persons.includes(user.id)
																		? checkbox_ch
																		: checkbox
																}
																alt=""
															/> */}
														</div>
														<p>{item.name}</p>
													</div>
													<img
														onClick={toggleIsOpen}
														src={info_icon}
														alt="information icon"
													/>
												</div>
												{isEditing && (
													<button className={styles.add_category_item}>
														<img src={plus_icon} alt="add item icon" />
														<p className={styles.add_category_item_text}>
															Add Item
														</p>
													</button>
												)}
											</div>
										))}
									</>
								)}
							</div>
						))}
					{/* <div className={styles.category} id="1">
						<div className={styles.title_content}>
							<div className={styles.title_img}>
								<img src={camp} alt="camp icon" />
								<h4 className={styles.title}>Camp</h4>
							</div>
							<div className={styles.cout_arrow}>
								<div className={styles.counter}>0/9</div>
								<img
									src={opensCategories.includes("1") ? arrow_up : arrow_bottom}
									onClick={() => toggleOpenCategory("1")}
								/>
							</div>
						</div>
						{opensCategories.includes("1") && (
							<>
								<div className={styles.category_item}>
									<div
										style={{
											display: "flex",
											gap: "16px",
											alignItems: "center",
										}}
									>
										<div className={styles.checkbox_wrapper}>
											<input
												onClick={handleCheckedItem}
												className={styles.checkbox_input}
												type="checkbox"
											/>
											<img
												className={styles.checkbox_icon}
												src={isCheckedItem ? checkbox_ch : checkbox}
												alt=""
											/>
										</div>
										<p>Tent</p>
									</div>
									<img
										onClick={toggleIsOpen}
										src={info_icon}
										alt="information icon"
									/>
								</div>
								{isEditing && (
									<button className={styles.add_category_item}>
										<img src={plus_icon} alt="add item icon" />
										<p className={styles.add_category_item_text}>Add Item</p>
									</button>
								)}
							</>
						)}
					</div>
					<div className={styles.category} id="2">
						<div className={styles.title_content}>
							<div className={styles.title_img}>
								<img src={camp} alt="camp icon" />
								<h4 className={styles.title}>Camp</h4>
							</div>
							<div className={styles.cout_arrow}>
								<div className={styles.counter}>0/9</div>
								<img
									src={opensCategories.includes("2") ? arrow_up : arrow_bottom}
									onClick={() => toggleOpenCategory("2")}
								/>
							</div>
						</div>
						{opensCategories.includes("2") && (
							<div className={styles.category_item}>
								<div
									style={{ display: "flex", gap: "16px", alignItems: "center" }}
								>
									<input type="checkbox" />
									<p>Tent</p>
								</div>
								<img
									onClick={toggleIsOpen}
									src={info_icon}
									alt="information icon"
								/>
							</div>
						)}
					</div> */}
					<button
						onClick={toggleIsOpenNewCategory}
						className={styles.add_category}
					>
						Add category
						<img width={24} height={24} src={plus_icon} />
					</button>
				</div>
				<SelectedListFooter toggleIsEditing={toggleIsEditing} />
			</div>
			<ShowInfoCategoryItem
				tripName={listId.id ? listId.id : "-"}
				isOpen={isOpen}
				toggleModal={toggleIsOpen}
			/>
			<AddNewCategory
				isOpen={isOpenNewCategory}
				toggleModal={toggleIsOpenNewCategory}
			/>
		</>
	);
};
