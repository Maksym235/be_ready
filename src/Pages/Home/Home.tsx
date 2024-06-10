import { FC } from "react";
import { Hero } from "../../Components/Hero/Hero";
import { ShortDesc } from "../../Components/ShortDesc/ShortDesc";
import { Features } from "../../Components/Features/Features";
import { AboutUs } from "../../Components/AboutUs/AboutUs";
import { FirstChecklist } from "../../Components/FirstChecklist/FirstChecklist";
import { ContactUs } from "../../Components/ContactUs/ContactUs";
import { Footer } from "../../Components/Footer/Footer";

const Home: FC = () => {
	return (
		<main>
			<Hero />
			<ShortDesc />
			<Features />
			<AboutUs />
			<FirstChecklist />
			<ContactUs />
			<Footer />
		</main>
	);
};

export default Home;
