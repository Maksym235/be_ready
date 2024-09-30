// import React from "react";
import styles from "./TextAndId.module.css";
import copy from "../../../assets/icon_copy.svg";
export const TextAndId = () => {
	const textData = {
		hanvtFr: "You don't have any friends added yet.",
		listFr: "The list of your friends is presented below.",
	};
	return (
		<div className={styles.container}>
			<h4 className={styles.title}>{textData["hanvtFr"]}</h4>
			<p className={styles.text}>
				You can share your ID with other users so they can add you as a friend,
				or find them yourself with the “+” button in the lower right corner.
			</p>
			<div className={styles.btn_wrapper}>
				<p className={styles.id}>jdwu23UDI2</p>
				<button className={styles.copy_id}>
					<img src={copy} alt="copy icon" />
					copy id
				</button>
			</div>
		</div>
	);
};
