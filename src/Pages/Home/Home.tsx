import { FC, ReactNode, useState } from "react";
import { Hero } from "../../Components/Hero/Hero";
import { ShortDesc } from "../../Components/ShortDesc/ShortDesc";
import { Features } from "../../Components/Features/Features";
import { AboutUs } from "../../Components/AboutUs/AboutUs";
import { FirstChecklist } from "../../Components/FirstChecklist/FirstChecklist";
import { ContactUs } from "../../Components/ContactUs/ContactUs";
import { Footer } from "../../Components/Footer/Footer";
import { RegisterModal } from "../../Components/Modals/Auth/Register/RegisterModal";
import { LoginModal } from "../../Components/Modals/Auth/Login/LoginModal";
import { IncorectDataModal } from "../../Components/Modals/Auth/IncorectData/IncorectDataModal";
import { AlreadyHaveAccModal } from "../../Components/Modals/Auth/AlreadyHaveAcc/AlreadyHaveAccModal";
import { EnterEmail } from "../../Components/Modals/ResetPassword/EnterEmail/EnterEmail";
import { WeSendEmail } from "../../Components/Modals/ResetPassword/WeSendEmail/WeSendEmail";
import { NotFoundEmail } from "../../Components/Modals/ResetPassword/NotFoundEmail/NotFoundEmail";
const Home: FC = () => {
	const [currentModal, setCurrentModal] = useState<string>(
		"resetPassNotFoundEmail",
	);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const handleToggleModal = () => {
		if (isModalOpen) {
			document.body.style.overflow = "unset";
			setIsModalOpen((state) => !state);
			return;
		}
		document.body.style.overflow = "hidden";
		setIsModalOpen((state) => !state);
	};

	const toggleCurrentModal = (key: string) => {
		setCurrentModal(key);
	};
	const Modals: Record<string, ReactNode> = {
		register: (
			<RegisterModal
				setCurrentModal={toggleCurrentModal}
				isOpen={isModalOpen}
				toggleModal={handleToggleModal}
			/>
		),
		login: (
			<LoginModal
				setCurrentModal={toggleCurrentModal}
				isOpen={isModalOpen}
				toggleModal={handleToggleModal}
			/>
		),
		incorectData: (
			<IncorectDataModal
				setCurrentModal={toggleCurrentModal}
				isOpen={isModalOpen}
				toggleModal={handleToggleModal}
			/>
		),
		alreadyHaveAcc: (
			<AlreadyHaveAccModal
				setCurrentModal={toggleCurrentModal}
				isOpen={isModalOpen}
				toggleModal={handleToggleModal}
			/>
		),
		resetPassEnterEmail: (
			<EnterEmail
				setCurrentModal={toggleCurrentModal}
				isOpen={isModalOpen}
				toggleModal={handleToggleModal}
			/>
		),
		resetPassWeSendEmail: (
			<WeSendEmail
				setCurrentModal={toggleCurrentModal}
				isOpen={isModalOpen}
				toggleModal={handleToggleModal}
			/>
		),
		resetPassNotFoundEmail: (
			<NotFoundEmail
				setCurrentModal={toggleCurrentModal}
				isOpen={isModalOpen}
				toggleModal={handleToggleModal}
			/>
		),
	};
	return (
		<main>
			<Hero />
			<ShortDesc toggleModal={handleToggleModal} />
			<Features />
			<AboutUs />
			<FirstChecklist toggleModal={handleToggleModal} />
			<ContactUs />
			<Footer />
			{Modals[currentModal]}
		</main>
	);
};

export default Home;
