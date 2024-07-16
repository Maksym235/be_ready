import { FC } from "react";
import { ModalContainer } from "../ModalContainer/ModalContainer";
import styles from "./ShowInfoCategoryItem.module.css";
import edit_icon from "../../../assets/SelectedList/Footer/icon_edit.svg";
import icon_plus from "../../../assets/Modals/icon_plus.svg";
import icon_minus from "../../../assets/Modals/icon_minus.svg";
interface IProps {
	toggleModal: () => void;
	isOpen: boolean;
	tripName: string;
}
export const ShowInfoCategoryItem: FC<IProps> = ({
	toggleModal,
	tripName,
	isOpen,
}) => {
	return (
		<ModalContainer
			toggleModal={toggleModal}
			isOpen={isOpen}
			title="Information about item"
		>
			<div className={styles.container}>
				<div className={styles.input_container}>
					<input placeholder={tripName} className={styles.input} type="text" />
					<button className={styles.edit_btn}>
						<img src={edit_icon} alt="edit name trip icon" />
					</button>
				</div>
				<div>
					<p className={styles.label}>Count</p>
					<div className={styles.count_wrapper}>
						<button className={styles.edit_btn}>
							<img src={icon_minus} alt="count minus" />
						</button>
						<p>1</p>
						<button className={styles.edit_btn}>
							<img src={icon_plus} alt="count plus" />
						</button>
					</div>
				</div>
				<div>
					<p className={styles.label}>Who takes the item</p>
					<div className={styles.persons_wrapper}>
						<p className={styles.person_icon}>K</p>
						<p className={styles.person_icon}>M</p>
						<p className={styles.person_icon}>D</p>
					</div>
				</div>
				<div className={styles.btn_wrapper}>
					<button onClick={toggleModal} className={styles.save}>
						Save changes
					</button>
					<button onClick={toggleModal} className={styles.cancel}>
						cancel
					</button>
				</div>
			</div>
		</ModalContainer>
	);
};
