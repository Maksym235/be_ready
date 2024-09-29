import styles from "./UserImage.module.css";
export const UserImage = () => {
	return (
		<div className={styles.container}>
			<div className={styles.img_block}>M</div>
			<div className={styles.btn_wrapper}>
				<button className={styles.btn} disabled>
					Reset to default
				</button>
				<button className={styles.btn}>Upload my own</button>
			</div>
		</div>
	);
};
