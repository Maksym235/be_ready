import { FC } from "react";
import styles from "./BurgerMenu.module.css";
import { createPortal } from "react-dom";
import Logo from "../../../assets/⛰ beReady 🏕️.svg";
import BurgerCross from "../../../assets/burger_cross.svg";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
// import { useAuth } from "../../../Pages/Home/store";
interface IProps {
	toggleBurger: () => void;
	isOpen: boolean;
}
export const BurgerMenu: FC<IProps> = ({ toggleBurger, isOpen }) => {
	const navigate = useNavigate();
	const root = document.querySelector("#modal-root")!;
	const featuresEl = document.querySelector("#features")!;
	const aboutUsEl = document.querySelector("#aboutUs")!;
	const contactUsEl = document.querySelector("#contactUs")!;
	// const { token } = useAuth((store: any) => ({
	// 	token: store.token,
	// }));
	const isLoggedIn = JSON.parse(window.localStorage.getItem("isLoggedIn")!);
	const navigateToLists = () => {
		if (!isLoggedIn) {
			toggleBurger();
			return;
		}
		toggleBurger();
		// getAllTrips();
		navigate("/lists");
	};
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
			case "profile":
				if (!isLoggedIn) {
					toggleBurger();
					toast.error("need authentication");
					break;
				}
				contactUsEl.scrollIntoView({
					behavior: "smooth",
					block: "start",
					inline: "nearest",
				});
				navigate("/profile");
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
				<li onClick={navigateToLists} className={styles.nav_list_item}>
					{/* <Link className={styles.link} to="/lists"> */}
					Create list
					{/* </Link> */}
				</li>
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
				<li
					onClick={() => navigateToElement("profile")}
					className={`${styles.nav_list_item} ${styles.profile_item}`}
				>
					Profile
				</li>
			</ul>
		</div>,
		root,
	);
};
