// import React from "react";
import styles from "./TextAndId.module.css";
import copy from "../../../assets/icon_copy.svg";
import toast from "react-hot-toast";
export interface IUser {
	email: string;
	id: string;
	language: string;
	password: string;
	name: string;
	theme: string;
}
export const TextAndId = ({ user }: { user: IUser }) => {
	const textData = {
		hanvtFr: "You don't have any friends added yet.",
		listFr: "The list of your friends is presented below.",
	};
	console.log(user);
	const handleCopyId = () => {
		navigator.clipboard.writeText(user.id);
		toast.success("Copied to clipboard");
	};
	return (
		<div className={styles.container}>
			<h4 className={styles.title}>{textData["hanvtFr"]}</h4>
			<p className={styles.text}>
				You can share your ID with other users so they can add you as a friend,
				or find them yourself with the “+” button in the lower right corner.
			</p>
			<div className={styles.btn_wrapper}>
				<p className={styles.id}>{user?.id ? user.id.slice(0, 8) : ""}</p>
				<button onClick={handleCopyId} className={styles.copy_id}>
					<img src={copy} alt="copy icon" />
					copy id
				</button>
			</div>
		</div>
	);
};
