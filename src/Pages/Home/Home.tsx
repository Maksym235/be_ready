import { FC, useState } from "react";
import { Hero } from "../../Components/Hero/Hero";
import { ShortDesc } from "../../Components/ShortDesc/ShortDesc";
import { Features } from "../../Components/Features/Features";
import { AboutUs } from "../../Components/AboutUs/AboutUs";
import { FirstChecklist } from "../../Components/FirstChecklist/FirstChecklist";
import { ContactUs } from "../../Components/ContactUs/ContactUs";
import { Footer } from "../../Components/Footer/Footer";
import { RegisterModal } from "../../Components/Modals/Auth/RegisterModal";

const Home: FC = () => {
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
	return (
		<main>
			<Hero />
			<ShortDesc toggleModal={handleToggleModal} />
			<Features />
			<AboutUs />
			<FirstChecklist toggleModal={handleToggleModal} />
			<ContactUs />
			<Footer />
			<RegisterModal isOpen={isModalOpen} toggleModal={handleToggleModal} />
		</main>
	);
};

export default Home;
