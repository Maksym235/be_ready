import { FC, useState } from "react";
import Logo from "../../assets/⛰ beReady 🏕️.svg";
import Burger from "../../assets/burger.svg";
import User from "../../assets/user.svg";
import styles from "./Header.module.css";
import { BurgerMenu } from "../Modals/Burger/BurgerMenu";
import { Link, useLocation } from "react-router-dom";
export const Header: FC = () => {
	const location = useLocation();

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
			<div className={styles.header}>
				<div className={styles.content_cotainer}>
					<Link to="/">
						<img src={Logo} alt="logo" />
					</Link>
					{location.pathname === "/lists" ? (
						<div className={styles.user_icon_wrapper}>
							<img src={User} alt="user icon" />
							<button onClick={handleToggleModal} className={styles.burger}>
								<img src={Burger} />
							</button>
						</div>
					) : (
						<button onClick={handleToggleModal} className={styles.burger}>
							<img src={Burger} />
						</button>
					)}
				</div>
			</div>

			<BurgerMenu isOpen={isOpenBurger} toggleBurger={handleToggleModal} />
		</>
	);
};
