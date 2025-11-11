"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

interface Props {
	name: string;
	profileImage: string;
	institute: string;
	onClick: () => void;
	status?: "Pending" | "Verified";
}


export default function TeacherCard({ name, profileImage, institute, onClick, status }: Props) {

	const statusClasses =
		status === "Pending"
			? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300"
			: "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300";

	return (
		<motion.div
			whileHover={{ scale: 1.03 }}
			transition={{ type: "spring", stiffness: 300 }}
		>
			<Card
				className="cursor-pointer group overflow-hidden rounded-xl border hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300"
				onClick={onClick}
			>
				<CardContent className="p-4 flex items-center gap-4">
					<div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
						{/* Replaced Next.js Image with standard img tag to fix compatibility */}
						<Image
							width={100}
							height={100}
							src={!profileImage?  "/public/placeholder-user.jpg": profileImage}
							alt={name}
							className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
						/>
					</div>

					<div className="flex-grow">
						<p className="text-base font-bold text-gray-900 dark:text-gray-100">
							{name}
						</p>
						<p className="text-sm text-gray-500 dark:text-gray-400">
							{institute}
						</p>
					</div>

					{status && (
						<span
							className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusClasses}`}
						>
							{status}
						</span>
					)}

					<ArrowRight className="w-5 h-5 text-gray-400 dark:text-gray-500 transform transition-transform duration-300 group-hover:translate-x-1 group-hover:text-blue-600 dark:group-hover:text-blue-300" />
				</CardContent>
			</Card>
		</motion.div>
	);
};