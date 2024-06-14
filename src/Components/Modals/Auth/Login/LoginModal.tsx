import { FC } from "react";
import styles from "./LoginModal.module.css";
import google from "../../../../assets/google.svg";
import { ModalContainer } from "../../ModalContainer/ModalContainer";
interface IProps {
	toggleModal: () => void;
	isOpen: boolean;
	setCurrentModal: (key: string) => void;
}
export const LoginModal: FC<IProps> = ({
	toggleModal,
	isOpen,
	setCurrentModal,
}) => {
	return (
		<ModalContainer
			title="Log in to account"
			isOpen={isOpen}
			toggleModal={toggleModal}
		>
			<form className={styles.form}>
				<input
					placeholder="Enter your email...*"
					className={styles.input}
					type="email"
				/>
				<input
					placeholder="Enter your password...*"
					className={styles.input}
					type="password"
				/>
				<div className={styles.btn_wrapper}>
					<button className={styles.sing_up} type="submit">
						Sign in
					</button>
					<button className={styles.google} type="button">
						<img width={24} height={24} src={google} alt="google icon" />
						Google
					</button>
				</div>
			</form>
			<button
				onClick={() => setCurrentModal("resetPassEnterEmail")}
				className={styles.resetPass}
			>
				RESET PASSWORD
			</button>
			<div className={styles.alredy_have_acc_block}>
				<p className={styles.alredy_have_acc_text}>DON’T HAVE AN ACCOUNT? </p>
				<button
					onClick={() => setCurrentModal("register")}
					className={styles.sing_in}
				>
					SIGN UP
				</button>
			</div>
		</ModalContainer>
	);
};
