import { FC } from "react";
import Hero_img from "../../assets/hero image.png";
import styles from "./Hero.module.css";
export const Hero: FC = () => {
	return (
		<div className={styles.hero}>
			<img src={Hero_img} />
		</div>
	);
};
