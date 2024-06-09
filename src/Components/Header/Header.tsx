import { FC } from "react";
import Logo from "../../assets/⛰ beReady 🏕️.svg";
import Burger from "../../assets/burger.svg";
import styles from "./Header.module.css";
export const Header: FC = () => {
	return (
		<div>
			<div className={styles.content_cotainer}>
				<img src={Logo} />
				<img src={Burger} />
			</div>
		</div>
	);
};
