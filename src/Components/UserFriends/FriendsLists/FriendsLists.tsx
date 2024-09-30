// import React from 'react'
import styles from "./FriendsLists.module.css";
import cross_delete from "../../../assets/icon_close.svg";
export const FriendsLists = () => {
	const friendsData = [
		{
			id: 1,
			name: "Roman",
		},
		{
			id: 2,
			name: "Mykola",
		},
		{
			id: 3,
			name: "Pasha",
		},
	];
	return (
		<div className={styles.container}>
			<div className={styles.list_container}>
				<p className={styles.title}>My friends</p>
				<ul className={styles.list}>
					{friendsData.map((el) => (
						<li className={styles.list_item}>
							{el.name}
							<button className={styles.delete_btn}>
								<img src={cross_delete} alt="delete" />
							</button>
						</li>
					))}
				</ul>
			</div>
			<div className={styles.list_container}>
				<p className={styles.title}>My friends</p>
				<ul className={styles.list}>
					{friendsData.map((el) => (
						<li className={styles.list_item}>
							{el.name}
							<button className={styles.cancel_btn}>cancel</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};
