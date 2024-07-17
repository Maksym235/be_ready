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
export const SelectedList: FC = () => {
	const [opensCategories, setOpensCategories] = useState<string[]>([]);
	const [isOpen, setIsOpen] = useState(false);
	const [isOpenNewCategory, setIsOpenNewCategory] = useState(false);
	const [isCheckedItem, setIsCheckedItem] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
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
	const listId = useParams();
	const location = useLocation();
	const handleCheckedItem = (evt: any) => {
		setIsCheckedItem(evt.target.checked);
	};

	const toggleIsEditing = () => {
		setIsEditing((state) => !state);
	};
	return (
		<>
			<SelectedListHeader
				location={location}
				listId={listId.id ? listId.id : ""}
				isEditing={isEditing}
			/>
			<div className={styles.container}>
				<div className={styles.categories_wrapper}>
					<div className={styles.category} id="1">
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
					</div>
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
