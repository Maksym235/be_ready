import { FC } from "react";
// import Hero_img from "../../assets/hero image.png";
import Img from "../../assets/content.png";
import styles from "./Hero.module.css";
export const Hero: FC = () => {
	const isSmallMobile = window.matchMedia("(max-width: 375px)").matches;

	// console.log(window.matchMedia("(max-width: 375px)").matches);
	return (
		<div className={styles.hero}>
			<img src={Img} width={isSmallMobile ? 348 : 368} height={190} />
		</div>
	);
};
