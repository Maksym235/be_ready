import { FC, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import styles from "./SelectedList.module.css";
import camp from "../../assets/SelectedList/icon_camp.svg";
import arrow_back from "../../assets/SelectedList/icon_back.svg";
import arrow_bottom from "../../assets/SelectedList/arrow_bottom.svg";
import arrow_up from "../../assets/SelectedList/arrow_up.svg";
import edit from "../../assets/SelectedList/Footer/icon_edit.svg";
import share from "../../assets/SelectedList/Footer/icon_share.svg";
import marked_eye from "../../assets/SelectedList/Footer/icon_marked_eye.svg";
import info_icon from "../../assets/SelectedList/icon_info.svg";
import checkbox from "../../assets/SelectedList/checkbox.svg";
import checkbox_ch from "../../assets/SelectedList/checkbox_ch.svg";
import { ShowInfoCategoryItem } from "../Modals/ShowInfoCategoryItem/ShowInfoCategoryItem";
export const SelectedList: FC = () => {
	const [opensCategories, setOpensCategories] = useState<string[]>([]);
	const [isOpen, setIsOpen] = useState(false);
	const [isCheckedItem, setIsCheckedItem] = useState(false);
	const toggleIsOpen = () => {
		setIsOpen((state) => !state);
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
	return (
		<>
			<div className={styles.header}>
				<Link to={location?.state ? location.state.from : "/"}>
					<img
						className={styles.header_icon}
						src={arrow_back}
						alt="arrow back"
					/>
				</Link>
				<p className={styles.header_title}>{listId.id}</p>
			</div>
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
							<div className={styles.category_item}>
								<div
									style={{ display: "flex", gap: "16px", alignItems: "center" }}
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
				</div>
				<div className={styles.footer}>
					<div className={styles.footer_btns}>
						<img className={styles.footer_icon} src={share} />
						<p className={styles.footer_text}>Share List</p>
					</div>
					<div className={styles.footer_btns}>
						<img className={styles.footer_icon} src={marked_eye} />
						<p className={styles.footer_text}>Hide Marked</p>
					</div>
					<div className={styles.footer_btns}>
						<img className={styles.footer_icon} src={edit} />
						<p className={styles.footer_text}>Edit</p>
					</div>
				</div>
			</div>
			<ShowInfoCategoryItem
				tripName={listId.id ? listId.id : "-"}
				isOpen={isOpen}
				toggleModal={toggleIsOpen}
			/>
		</>
	);
};
