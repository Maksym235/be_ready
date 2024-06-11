import { FC } from "react";
import { ModalContainer } from "../../ModalContainer/ModalContainer";
import styles from "./AlreadyHaveAccModal.module.css";
interface IProps {
	toggleModal: () => void;
	isOpen: boolean;
	setCurrentModal: (key: string) => void;
}
export const AlreadyHaveAccModal: FC<IProps> = ({
	toggleModal,
	isOpen,
	setCurrentModal,
}) => {
	return (
		<ModalContainer
			toggleModal={toggleModal}
			isOpen={isOpen}
			title="Create new account"
		>
			<div className={styles.container}>
				<div className={styles.text_wrapper}>
					<p className={styles.incorectData}>Have you already been with us?</p>
					<p className={styles.information}>
						An account with the specified email address has already been
						created. Please log in by password or reset if you forget it.
					</p>
				</div>
				<div className={styles.btn_wrapper}>
					<button
						onClick={() => setCurrentModal("login")}
						className={styles.try_again}
					>
						sign in
					</button>
					<button className={styles.reset_password}>reset password</button>
				</div>
			</div>
		</ModalContainer>
	);
};
