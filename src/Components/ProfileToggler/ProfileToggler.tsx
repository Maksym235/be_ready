import React, { useState } from "react";
import styles from "./ProfileToggler.module.css";
export const ProfileToggler = ({ toggle }: any) => {
	const [currentList, setCurrentList] = useState("info");

	const toggleCurrentList = (key: string) => {
		setCurrentList(key);
		toggle(key);
	};
	return (
		<div className={styles.container}>
			<div className={styles.toggle_wrapper}>
				<div
					className={
						currentList === "info"
							? `${styles.toggle_background} ${styles.left}`
							: `${styles.toggle_background} ${styles.right}`
					}
				></div>
				<button
					onClick={() => toggleCurrentList("info")}
					className={
						currentList === "info"
							? `${styles.btn} ${styles.active}`
							: `${styles.btn}`
					}
				>
					Informations
				</button>
				<button
					onClick={() => toggleCurrentList("friends")}
					className={
						currentList === "friends"
							? `${styles.btn} ${styles.active}`
							: `${styles.btn} `
					}
				>
					Friends
				</button>
			</div>
		</div>
	);
};
