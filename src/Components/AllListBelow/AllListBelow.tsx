import { FC } from "react";
import styles from "./AllListBelow.module.css";
import copy from "../../assets/icon_copy.svg";
interface IProps {
	list: string;
}
export const AllListBelow: FC<IProps> = ({ list }) => {
	return (
		<>
			{list === "personal" ? (
				<div className={styles.container}>
					<p className={styles.title}>
						All personal lists are presented below.
					</p>
					<p className={styles.content}>
						You can always add a new list by clicking “+” in the lower right
						corner
					</p>
				</div>
			) : (
				<div className={styles.container}>
					<p className={styles.title}>All shared lists are presented below.</p>
					<p className={styles.content}>
						You can share your ID with the author of the list they want to add
						you to.
					</p>
					<div className={styles.bnt_wrapper}>
						<p className={styles.id}>a3d912F019</p>
						<button className={styles.copy_id}>
							<img src={copy} />
							Copy id
						</button>
					</div>
				</div>
			)}
		</>
	);
};
