import { FC, useState } from "react";
import Logo from "../../assets/⛰ beReady 🏕️.svg";
import Burger from "../../assets/burger.svg";
import User from "../../assets/user.svg";
import styles from "./Header.module.css";
import { BurgerMenu } from "../Modals/Burger/BurgerMenu";
import { Link, useLocation } from "react-router-dom";
export interface IUser {
	email: string;
	id: string;
	language: string;
	password: string;
	name: string;
	theme: string;
	avatarURL: string;
	avatarName: string;
}

export interface IHeaderProps {
	user: IUser;
}
export const Header: FC<IHeaderProps> = ({ user }) => {
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
							<Link to="/profile">
								<img
									className={styles.user_icon}
									width={40}
									height={40}
									src={user.avatarURL}
									alt="user icon"
								/>
							</Link>
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
