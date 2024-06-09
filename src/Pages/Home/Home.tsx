import { FC } from "react";
import { Hero } from "../../Components/Hero/Hero";
import { ShortDesc } from "../../Components/ShortDesc/ShortDesc";
import { Features } from "../../Components/Features/Features";

const Home: FC = () => {
	return (
		<main>
			<Hero />
			<ShortDesc />
			<Features />
		</main>
	);
};

export default Home;
