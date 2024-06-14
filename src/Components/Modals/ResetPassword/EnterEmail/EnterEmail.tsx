import { FC } from "react";
import { ModalContainer } from "../../ModalContainer/ModalContainer";
import styles from "./EnterEmail.module.css";

interface IProps {
	toggleModal: () => void;
	isOpen: boolean;
	setCurrentModal: (key: string) => void;
}
export const EnterEmail: FC<IProps> = ({
	isOpen,
	toggleModal,
	setCurrentModal,
}) => {
	return (
		<ModalContainer
			isOpen={isOpen}
			toggleModal={toggleModal}
			title="Reset password"
		>
			<div className={styles.container}>
				<input
					className={styles.input}
					placeholder="Enter your email...*"
					type="email"
				/>
				<button
					onClick={() => setCurrentModal("resetPassWeSendEmail")}
					className={styles.button}
				>
					Send code to my email
				</button>
			</div>
		</ModalContainer>
	);
};
