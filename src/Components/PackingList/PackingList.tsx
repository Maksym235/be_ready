import { FC, useState } from "react";
import styles from "./PackingList.module.css";
import { TogglerLists } from "../TogglerLists/TogglerLists";
import { EmptyLists } from "../EmptyLists/EmptyLists";
export const PackingList: FC = () => {
	const [currentList, setCurrentList] = useState("personal");
	return (
		<div className={styles.background}>
			<div className={styles.container}>
				<p className={styles.title}>Packing list </p>
				<TogglerLists toggle={setCurrentList} />
				<EmptyLists list={currentList} />
			</div>
		</div>
	);
};
