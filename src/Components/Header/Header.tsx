import { FC, useState } from "react";
import Logo from "../../assets/⛰ beReady 🏕️.svg";
import Burger from "../../assets/burger.svg";
import styles from "./Header.module.css";
import { BurgerMenu } from "../Modals/Burger/BurgerMenu";
export const Header: FC = () => {
	const [isOpenBurger, setIsOpenBurger] = useState(false);
	const handleToggleModal = () => {
		if (isOpenBurger) {
			document.body.style.overflow = "unset";
			setIsOpenBurger((state) => !state);
			return;
		}
		document.body.style.overflow = "hidden";
		setIsOpenBurger((state) => !state);
	};
	return (
		<>
			<div>
				<div className={styles.content_cotainer}>
					<img src={Logo} />
					<button onClick={handleToggleModal} className={styles.burger}>
						<img src={Burger} />
					</button>
				</div>
			</div>

			<BurgerMenu isOpen={isOpenBurger} toggleBurger={handleToggleModal} />
		</>
	);
};
