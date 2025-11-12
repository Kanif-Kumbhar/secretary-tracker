"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
	name: string;
	profileImage: string;
	institute: string;
	onClick: () => void;
	status?: "Pending" | "Verified";
}

export const SecretaryCard: React.FC<Props> = ({
	name,
	profileImage,
	institute,
	onClick,
	status,
}) => {
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
				onClick={onClick}
				className="cursor-pointer group overflow-hidden rounded-xl border border-gray-800 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 bg-gray-950"
			>
				<CardContent className="p-4 flex items-center gap-4">
					{/* Profile image */}
					<div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
						<img
							src={profileImage}
							alt={name}
							className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
						/>
					</div>

					{/* Secretary info */}
					<div className="flex-grow">
						<p className="text-base font-bold text-gray-100">{name}</p>
						<p className="text-sm text-gray-400">{institute}</p>
					</div>

					{/* Status badge */}
					{status && (
						<span
							className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusClasses}`}
						>
							{status}
						</span>
					)}

					{/* Arrow icon */}
					<ArrowRight className="w-5 h-5 text-gray-400 transform transition-transform duration-300 group-hover:translate-x-1 group-hover:text-blue-500" />
				</CardContent>
			</Card>
		</motion.div>
	);
};