import { FC } from "react";
import styles from "./Lists.module.css";
import { PackingList } from "../../Components/PackingList/PackingList";
const Lists: FC = () => {
	return (
		<main className={styles.main}>
			<PackingList />
		</main>
	);
};

export default Lists;
