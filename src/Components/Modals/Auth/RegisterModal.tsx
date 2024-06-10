import { FC } from "react";
import styles from "./RegisterModal.module.css";
import cross from "../../../assets/cross.svg";
import google from "../../../assets/google.svg";
import { createPortal } from "react-dom";
interface IProps {
	toggleModal: () => void;
	isOpen: boolean;
}
export const RegisterModal: FC<IProps> = ({ toggleModal, isOpen }) => {
	const root = document.querySelector("#modal-root")!;
	return createPortal(
		<div
			className={
				isOpen ? `${styles.backdrop}` : `${styles.backdrop} ${styles.hidden}`
			}
		>
			<div
				className={
					isOpen
						? `${styles.container}`
						: `${styles.container} ${styles.hidden_container}`
				}
			>
				<div className={styles.title_wrapper}>
					<p className={styles.title}>Create new account</p>
					<button onClick={toggleModal} className={styles.close_btn}>
						<img src={cross} alt="close button" />
					</button>
				</div>
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
					<input
						placeholder="Confirm your password...*"
						className={styles.input}
						type="password"
					/>
					<div className={styles.btn_wrapper}>
						<button className={styles.sing_up} type="submit">
							Sign up
						</button>
						<button className={styles.google} type="button">
							<img width={24} height={24} src={google} alt="google icon" />
							Google
						</button>
					</div>
				</form>

				<div className={styles.alredy_have_acc_block}>
					<p className={styles.alredy_have_acc_text}>
						ALREADY HAVE AN ACCOUNT?
					</p>
					<button className={styles.sing_in}>SIGN IN</button>
				</div>
			</div>
		</div>,
		root,
	);
};
