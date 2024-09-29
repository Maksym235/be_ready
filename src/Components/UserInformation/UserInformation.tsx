import { useQuery } from "@tanstack/react-query";
import { UserData } from "./UserData/UserData";
import styles from "./UserIfnormation.module.css";
import { UserImage } from "./UserImage/UserImage";
import { getCurrent } from "../../Pages/Home/api";
import { ReactNode, useState } from "react";
import { EditUserName } from "../Modals/EditUserName/EditUserName";
import { EditUserEmail } from "../Modals/EditUserEmail/EditUserEmail";
export const UserInformation = () => {
	const [currentModal, setCurrentModal] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { data, isLoading, isError } = useQuery({
		queryKey: ["user"],
		queryFn: getCurrent,
	});
	if (isLoading) {
		return <div>Loading...</div>;
	}
	if (isError) {
		return <div>Something went wrong.</div>;
	}
	const toggleModal = () => {
		setIsModalOpen((state) => !state);
	};
	const Modals: Record<string, ReactNode> = {
		editName: <EditUserName isOpen={isModalOpen} toggleModal={toggleModal} />,
		editEmail: <EditUserEmail isOpen={isModalOpen} toggleModal={toggleModal} />,
		editPassword: <div></div>,
	};
	const handleToggleModal = (key: string) => {
		if (isModalOpen) {
			document.body.style.overflow = "unset";
			setIsModalOpen((state) => !state);
			return;
		}
		document.body.style.overflow = "hidden";
		setCurrentModal(key);
		setIsModalOpen((state) => !state);
	};
	return (
		<section className={styles.container}>
			<UserImage />
			<UserData user={data?.user} openModal={handleToggleModal} />
			{Modals[currentModal]}
		</section>
	);
};
