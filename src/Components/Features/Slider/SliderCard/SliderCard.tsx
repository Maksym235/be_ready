import { FC } from "react";
import styles from "./SliderCard.module.css";
interface IProps {
	title: string;
	content: string;
}
export const SliderCard: FC<IProps> = ({ title, content }) => {
	return (
		<div className={styles.container}>
			<p className={styles.title}>{title}</p>
			<p className={styles.content}>{content}</p>
		</div>
	);
};
