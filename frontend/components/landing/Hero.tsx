import Link from "next/link";
import Image from "next/image";

export default function Hero() {
	return (
		<section className="flex flex-col items-center justify-center h-full px-6 text-center">
			{/* Heading */}
			<h1 className="mb-4 text-3xl font-bold text-gray-900 md:text-5xl">
				Empowering Minds, Securing Futures
			</h1>

			{/* Subheading */}
			<p className="mx-auto mb-6 max-w-2xl text-gray-600">
				Track and manage every step of our cyber awareness journey across
				cities, colleges, and communities.
			</p>

			{/* CTA Button */}
			<Link
				href="/auth"
				className="
          relative group overflow-hidden
          rounded-lg px-6 py-3 shadow-md
          bg-orange-500 text-white
          inline-block
        "
			>
				<span className="relative z-10">Get Started Now</span>
				<div
					className="
            absolute inset-0 z-0
            transform -translate-x-full
            bg-orange-600
            transition-transform duration-300 ease-in-out
            group-hover:translate-x-0
          "
				/>
			</Link>

			{/* Laptop Illustration */}
			<div className="relative mt-12 flex justify-center items-start">
				<div className="absolute top-10 w-72 sm:w-96 md:w-[500px] h-36 sm:h-48 md:h-64 bg-orange-500 rounded-t-full" />
				<Image
					src="/laptop.svg"
					alt="Dashboard Preview"
					width={500}
					height={300}
					className="relative w-1/2 sm:w-2/3 md:w-1/2 lg:w-1/4 mt-20"
					priority
				/>
			</div>
		</section>
	);
}