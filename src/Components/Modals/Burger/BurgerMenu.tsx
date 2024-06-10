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
	const featuresEl = document.querySelector("#features")!;
	const aboutUsEl = document.querySelector("#aboutUs")!;
	const contactUsEl = document.querySelector("#contactUs")!;

	const navigateToElement = (key: string) => {
		switch (key) {
			case "features":
				featuresEl.scrollIntoView({
					behavior: "smooth",
					block: "end",
					inline: "nearest",
				});
				toggleBurger();
				break;
			case "aboutUs":
				aboutUsEl.scrollIntoView({
					behavior: "smooth",
					block: "end",
					inline: "nearest",
				});
				toggleBurger();
				break;
			case "contactUs":
				contactUsEl.scrollIntoView({
					behavior: "smooth",
					block: "end",
					inline: "nearest",
				});
				toggleBurger();
				break;
			default:
				break;
		}
	};
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
				<li
					className={styles.nav_list_item}
					onClick={() => navigateToElement("features")}
				>
					Features
				</li>
				<li
					onClick={() => navigateToElement("aboutUs")}
					className={styles.nav_list_item}
				>
					About us
				</li>
				<li
					onClick={() => navigateToElement("contactUs")}
					className={styles.nav_list_item}
				>
					Contact us
				</li>
			</ul>
		</div>,
		root,
	);
};
