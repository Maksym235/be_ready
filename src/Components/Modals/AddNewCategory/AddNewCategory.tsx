import { FC, useState } from "react";
import { ModalContainer } from "../ModalContainer/ModalContainer";
import styles from "./AddNewCategory.module.css";
interface IProps {
	toggleModal: () => void;
	isOpen: boolean;
}
export const AddNewCategory: FC<IProps> = ({ toggleModal, isOpen }) => {
	const [categoryName, setCategoryName] = useState("");

	const handleSetCategoryName = (evt: React.FormEvent<HTMLInputElement>) => {
		setCategoryName(evt.currentTarget.value);
	};
	return (
		<ModalContainer
			toggleModal={toggleModal}
			isOpen={isOpen}
			title="New category"
		>
			<div className={styles.container}>
				<input
					onChange={handleSetCategoryName}
					className={styles.input}
					type="text"
					placeholder="Enter new category name...*"
				/>
				<div className={styles.btn_wrapper}>
					<button disabled={categoryName.length < 1} className={styles.create}>
						Create
					</button>
					<button className={styles.cancel}>Cancel</button>
				</div>
			</div>
		</ModalContainer>
	);
};
