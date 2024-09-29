import { FC, useState } from "react";
import styles from "./Profile.module.css";
import { ProfileHeader } from "../../Components/ProfileHeader/ProfileHeader";
import { ProfileToggler } from "../../Components/ProfileToggler/ProfileToggler";
import { UserInformation } from "../../Components/UserInformation/UserInformation";
const Profile: FC = () => {
	const [currentTab, setCurrentTab] = useState("info");
	return (
		<main className={styles.backdrop}>
			<div className={styles.container}>
				<div className={styles.content_wrapper}>
					<ProfileHeader />
					<ProfileToggler toggle={setCurrentTab} />
					{currentTab === "info" ? <UserInformation /> : <div>friends</div>}
				</div>
			</div>
		</main>
	);
};

export default Profile;
