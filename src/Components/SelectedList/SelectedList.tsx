import { FC, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styles from "./SelectedList.module.css";
import plus_icon from "../../assets/Modals/icon_plus.svg";
import { ShowInfoCategoryItem } from "../Modals/ShowInfoCategoryItem/ShowInfoCategoryItem";
import { AddNewCategory } from "../Modals/AddNewCategory/AddNewCategory";
import { SelectedListFooter } from "./SelectedListFooter/SelectedListFooter";
import { SelectedListHeader } from "./SelectedListHeader/SelectedListHeader";
import {
	// QueryClient,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import { getToursById, toggleEquipItemCheck } from "../../Pages/Lists/api";
import { getUsersById } from "../../Pages/Home/api";
import { CategoryTitle } from "./CategoryTitle/CategoryTitle";
import { CategoryItem } from "./CategoryItem/CategoryItem";
export interface ICategoryItem {
	_id: string;
	name: string;
	description: string;
	category: string;
	persons: string[];
}
export const SelectedList: FC = () => {
	const [opensCategories, setOpensCategories] = useState<string[]>([]);
	const [isOpen, setIsOpen] = useState(false);
	const [infoItem, setInfoItem] = useState<any>(null);
	const [isOpenNewCategory, setIsOpenNewCategory] = useState(false);
	const [itemPersons, setItemPersons] = useState(null);
	const [isEditing, setIsEditing] = useState(false);
	const listId = useParams();
	const tripId = listId.id;
	const location = useLocation();
	const queryClient = useQueryClient();
	const user = JSON.parse(localStorage.getItem("user")!);
	const { isPending, isError, data, refetch } = useQuery({
		queryKey: ["tours"],
		queryFn: () => getToursById(tripId ? tripId : ""),
	});
	const [editedItem, setEditedItem] = useState<Record<string, any>[]>([]);
	const mutation = useMutation({
		mutationFn: toggleEquipItemCheck,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["tours"] });
		},
	});
	if (isPending) {
		return <div>Loading...</div>;
	}
	if (isError) {
		return <div>Error</div>;
	}

	const toggleIsOpen = () => {
		setItemPersons(null);
		setIsOpen((state) => !state);
	};
	const handleShowInfo = (item: ICategoryItem) => {
		setInfoItem(item);
		if (item.persons.length > 0) {
			// mutate(item.persons.join(","));
			getUsersById(item.persons.join(", ")).then((users) =>
				setItemPersons(users.resp),
			);
			toggleIsOpen();
			return;
		}
		toggleIsOpen();
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
		if (editedItem.includes(item)) {
			return;
		}
		setEditedItem((state) => [...state, item]);
		//==============================================================
		//==============================================================
		const list = data.trip.equipList;
		if (item.persons.includes(user.id)) {
			const userIndex = item.persons.findIndex((p: string) => p === user.id);
			const updatedItem = {
				...item,
				persons: item.persons.slice(1, userIndex),
			};
			const catIndex = list[item.category].findIndex(
				(catItem: any) => catItem._id === item._id,
			);
			const updatedCategory = list[item.category];
			updatedCategory.splice(catIndex, 1, updatedItem);
			list[item.category] = updatedCategory;
			console.log(list);
		} else {
			const updatedItem = {
				...item,
				persons: [...item.persons, user.id],
			};
			const updatedCategory = list[item.category];
			const catIndex = updatedCategory.findIndex(
				(catItem: any) => catItem._id === item._id,
			);
			updatedCategory.splice(catIndex, 1, updatedItem);
			list[item.category] = updatedCategory;
			console.log(list);
		}

		//==============================================================
		//==============================================================
		// console.log(index);
		// mutation.mutate({
		// 	tourId: tripId ? tripId : "",
		// 	equipItemId: item._id,
		// });
		// const index = item.persons.findIndex((el: string) => el === user.id);
		// if (index === -1) {
		// 	item.persons.push(user.id);
		// } else {
		// 	item.persons.splice(index, 1);
		// }
	};
	let timerId: any = null;
	const onUpdateItem = (item: Record<string, any>) => {
		console.log(timerId);
		if (timerId !== null) {
			clearTimeout(timerId);
			console.log("таймер скинуто");
		}

		handleCheckedItem(item);

		timerId = setTimeout(() => {
			console.log(`go http://localhost:5713/updateItems`);
		}, 10000);
	};
	return (
		<>
			<SelectedListHeader
				location={location}
				listId={data.trip ? data.trip.name : ""}
				listOwner={data.trip ? data.trip.owner : ""}
				isEditing={isEditing}
			/>
			<div className={styles.container}>
				<div className={styles.categories_wrapper}>
					{data.trip &&
						Object.keys(data.trip.equipList)
							.sort((a: any, b: any) => a.localeCompare(b, "uk"))
							.map((category) => (
								<div key={category} className={styles.category}>
									<CategoryTitle
										opensCategories={opensCategories}
										toggleOpenCategory={toggleOpenCategory}
										category={category}
										equipList={data && data.trip.equipList}
									/>
									{opensCategories.includes(category) && (
										<>
											{data.trip.equipList[category]
												.sort((a: any, b: any) =>
													a.name.localeCompare(b.name, "uk"),
												)
												.map((categoryItem: any) => (
													<CategoryItem
														handleCheckedItem={onUpdateItem}
														handleShowInfo={handleShowInfo}
														isEditing={isEditing}
														item={categoryItem}
														user={user}
													/>
												))}
										</>
									)}
								</div>
							))}
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
				item={infoItem}
				usersInfo={itemPersons}
				isOpen={isOpen}
				toggleModal={toggleIsOpen}
			/>
			<AddNewCategory
				isOpen={isOpenNewCategory}
				toggleModal={toggleIsOpenNewCategory}
				refetch={refetch}
			/>
		</>
	);
};
