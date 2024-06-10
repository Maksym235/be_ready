import { FC } from "react";
import styles from "./BurgerMenu.module.css";
import { createPortal } from "react-dom";
import Logo from "../../../assets/⛰ beReady 🏕️.svg";
import BurgerCross from "../../../assets/burger_cross.svg";
interface IProps {
	toggleBurger: () => void;
	isOpen: boolean;
}
export const BurgerMenu: FC<IProps> = ({ toggleBurger, isOpen }) => {
	const root = document.querySelector("#modal-root")!;
	return createPortal(
		<div
			className={
				isOpen ? `${styles.container}` : `${styles.container} ${styles.active}`
			}
		>
			<div className={styles.title_wrapper}>
				<img src={Logo} />
				<button className={styles.close} onClick={toggleBurger}>
					<img src={BurgerCross} alt="close button" />
				</button>
			</div>
			<ul className={styles.nav_list}>
				<li className={styles.nav_list_item}>Create list</li>
				<li className={styles.nav_list_item}>Features</li>
				<li className={styles.nav_list_item}>About us</li>
				<li className={styles.nav_list_item}>Contact us</li>
			</ul>
		</div>,
		root,
	);
};
