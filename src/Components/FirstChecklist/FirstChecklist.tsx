import { FC } from "react";
import styles from "./FirstChecklist.module.css";
export const FirstChecklist: FC = () => {
	return (
		<div className={styles.background}>
			<div className={styles.container}>
				<p className={styles.title}>ready to create first checklist?</p>
				<button className={styles.btn}>Sing up</button>
			</div>
		</div>
	);
};
