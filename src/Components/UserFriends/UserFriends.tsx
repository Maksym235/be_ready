// import React from 'react'

import { useState } from "react";
import { FriendsLists } from "./FriendsLists/FriendsLists";
import { TextAndId } from "./TextAndId/TextAndId";
import styles from "./UserFriends.module.css";
import plus from "../../assets/button plus.svg";
import { AddNewFriend } from "../Modals/AddNewFriend/AddNewFriend";
// import copy from "../../assets/icon_copy.svg";

export const UserFriends = () => {
	const [isOpen, setIsOpen] = useState(false);
	const handleToggleModal = () => {
		setIsOpen((state) => !state);
	};
	return (
		<div className={styles.container}>
			<TextAndId />
			<FriendsLists />
			<img
				onClick={handleToggleModal}
				className={styles.plus_btn}
				src={plus}
				alt="Add list"
			/>
			<AddNewFriend isOpen={isOpen} toggleModal={handleToggleModal} />
		</div>
	);
};
