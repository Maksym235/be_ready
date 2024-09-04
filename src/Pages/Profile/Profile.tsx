import { FC, useState } from "react";
import styles from "./Profile.module.css";
import { ProfileHeader } from "../../Components/ProfileHeader/ProfileHeader";
import { ProfileToggler } from "../../Components/ProfileToggler/ProfileToggler";
const Profile: FC = () => {
	const [currentList, setCurrentList] = useState("personal");
	return (
		<main className={styles.backdrop}>
			<div className={styles.container}>
				<ProfileHeader />
				<ProfileToggler toggle={setCurrentList} />
			</div>
		</main>
	);
};

export default Profile;
