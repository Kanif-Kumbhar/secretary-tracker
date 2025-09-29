"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Twitter, Instagram, Linkedin, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
	{ href: "/about", text: "About Us" },
	{ href: "/initiatives", text: "Our Initiatives" },
	{ href: "/contact", text: "Contact Us" },
];

export default function Navbar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<nav className="absolute top-0 left-0 w-full z-30 flex justify-between items-center px-6 py-3">
			{/* Logo */}
			<div className="flex items-center gap-2">
				<Link href="/">
					<Image
						src="/logo.svg"
						alt="Quick Heal"
						width={40}
						height={40}
						priority
					/>
				</Link>
			</div>

			{/* Desktop Links */}
			<div className="hidden md:flex gap-8 text-gray-700 font-medium">
				{navLinks.map((link) => (
					<Link
						key={link.text}
						href={link.href}
						className="group transition duration-300 hover:text-orange-600"
					>
						{link.text}
						<span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-orange-600"></span>
					</Link>
				))}
			</div>

			{/* Social Icons (Desktop) */}
			<div className="hidden md:flex items-center gap-4">
				<a href="#" aria-label="Twitter">
					<Twitter
						size={20}
						strokeWidth={1.5}
						className="text-gray-700 transition hover:text-orange-500"
					/>
				</a>
				<a href="#" aria-label="Instagram">
					<Instagram
						size={20}
						strokeWidth={1.5}
						className="text-gray-700 transition hover:text-pink-500"
					/>
				</a>
				<a href="#" aria-label="LinkedIn">
					<Linkedin
						size={20}
						strokeWidth={1.5}
						className="text-gray-700 transition hover:text-blue-700"
					/>
				</a>
			</div>

			{/* Hamburger Menu Button (Mobile) */}
			<div className="md:hidden">
				<Button
					onClick={() => setIsMenuOpen(!isMenuOpen)}
					aria-label="Toggle menu"
					className="bg-transparent hover:bg-gray-100 p-2"
				>
					{isMenuOpen ? (
						<X size={24} className="text-black" />
					) : (
						<Menu size={24} className="text-black" />
					)}
				</Button>
			</div>

			{/* Mobile Menu Dropdown */}
			{isMenuOpen && (
				<div className="absolute top-full left-0 w-full bg-white shadow-md md:hidden flex flex-col items-center py-4 z-20">
					{navLinks.map((link) => (
						<Link
							key={link.text}
							href={link.href}
							className="py-2 text-lg text-gray-700 hover:text-orange-600"
							onClick={() => setIsMenuOpen(false)}
						>
							{link.text}
						</Link>
					))}
					<div className="flex gap-6 mt-4">
						<a href="#" aria-label="Twitter">
							<Twitter
								size={24}
								strokeWidth={1.5}
								className="text-gray-700 hover:text-orange-500"
							/>
						</a>
						<a href="#" aria-label="Instagram">
							<Instagram
								size={24}
								strokeWidth={1.5}
								className="text-gray-700 hover:text-pink-500"
							/>
						</a>
						<a href="#" aria-label="LinkedIn">
							<Linkedin
								size={24}
								strokeWidth={1.5}
								className="text-gray-700 hover:text-blue-700"
							/>
						</a>
					</div>
				</div>
			)}
		</nav>
	);
}