import { FC } from "react";
import styles from "./AboutUs.module.css";
import { paragraphs } from "./paragraphs";
export const AboutUs: FC = () => {
	return (
		<div className={styles.background}>
			<div className={styles.container}>
				<p className={styles.title}>About us:</p>
				<ul className={styles.list}>
					{paragraphs.map((pr) => (
						<li>
							<p className={styles.item}>{pr}</p>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};
