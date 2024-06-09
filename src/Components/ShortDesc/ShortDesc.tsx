import { FC } from "react";
import styles from "./ShortDesc.module.css";
export const ShortDesc: FC = () => {
	return (
		<div className={styles.container}>
			<p className={styles.text}>
				BeReady is a cutting-edge tool designed to simplify the packing process,
				ensuring you have everything you need for a successful and enjoyable
				hiking trip.
			</p>
			<div className={styles.btn_wrapper}>
				<button className={styles.get_started}>
					<span className={styles.get_started_text}>Get started</span>
				</button>
				<button className={styles.lear_more}>
					<span className={styles.lear_more_text}>Lear more</span>
				</button>
			</div>
		</div>
	);
};
