import { FC } from "react";
import styles from "./PackingList.module.css";
import { TogglerLists } from "../TogglerLists/TogglerLists";
export const PackingList: FC = () => {
	return (
		<div className={styles.background}>
			<div className={styles.container}>
				<p className={styles.title}>Packing list </p>
				<TogglerLists />
			</div>
		</div>
	);
};
