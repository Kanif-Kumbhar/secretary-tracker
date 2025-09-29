"use client";

import React from "react";
import Image from "next/image";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
	name: string;
	profileImage: string;
	institute: string;
	onClick: () => void;
}

export const TeacherCard: React.FC<Props> = ({
	name,
	profileImage,
	institute,
	onClick,
}) => {
	return (
		<Card
			className="cursor-pointer hover:shadow-lg transition-shadow"
			onClick={onClick}
		>
			<CardHeader className="flex items-center gap-4">
				<div className="relative w-12 h-12 rounded-full overflow-hidden">
					<Image
						src={profileImage}
						alt={name}
						fill
						className="object-cover"
						sizes="48px"
					/>
				</div>

				<div>
					<CardTitle className="text-sm font-semibold">{name}</CardTitle>
					<p className="text-xs text-gray-500">{institute}</p>
				</div>
			</CardHeader>
		</Card>
	);
};