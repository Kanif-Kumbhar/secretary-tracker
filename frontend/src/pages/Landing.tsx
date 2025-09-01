import Navbar from "../components/Navbar";
import Hero from "../components/Hero";

export default function Landing() {
	return (
		<main className="relative h-screen overflow-hidden bg-white">
			<Navbar />
			<Hero />
		</main>
	);
}