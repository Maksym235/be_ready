import { FC } from "react";
import styles from "./FirstChecklist.module.css";
interface IProps {
	toggleModal: () => void;
}
export const FirstChecklist: FC<IProps> = ({ toggleModal }) => {
	return (
		<div className={styles.background}>
			<div className={styles.container}>
				<p className={styles.title}>ready to create first checklist?</p>
				<button onClick={toggleModal} className={styles.btn}>
					Sing up
				</button>
			</div>
		</div>
	);
};
