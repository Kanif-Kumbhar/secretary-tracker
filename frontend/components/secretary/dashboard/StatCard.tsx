"use client";

import { Card } from "@/components/ui/card";

const PROJECT_START_DATE = new Date("2025-08-01");

export default function StatCards() {
	const today = new Date();

	const diffInDays = Math.floor(
		(today.getTime() - PROJECT_START_DATE.getTime()) / (1000 * 60 * 60 * 24)
	);

	const weekNumber = Math.floor(diffInDays / 7) + 1;

	const monthDiff =
		today.getMonth() -
		PROJECT_START_DATE.getMonth() +
		12 * (today.getFullYear() - PROJECT_START_DATE.getFullYear());

	const totalSchools = 24;
	const antifraudActivations = 92;
	const impactActivity = 1;
	const newsCount = 7;

	return (
		<div className="p-4 bg-gray-900 mt-4">
			<div className="grid grid-cols-1 md:grid-cols-5 gap-4 h-full">
				<Card className="p-6 shadow-md bg-gray-800 text-white flex flex-col justify-between">
					<h3 className="text-lg font-semibold">Project Week</h3>
					<div className="flex items-baseline mt-2">
						<p className="text-2xl font-bold">{weekNumber}</p>
						<span className="ml-2 text-orange-400 font-semibold">
							({monthDiff} {monthDiff === 1 ? "Month" : "Months"})
						</span>
					</div>
				</Card>

				<Card className="p-6 shadow-md bg-gray-800 text-white flex flex-col justify-between">
					<h3 className="text-lg font-semibold">
						Total Schools/Colleges Reached
					</h3>
					<p className="text-2xl font-bold mt-2">{totalSchools}</p>
				</Card>

				<Card className="p-6 shadow-md bg-gray-800 text-white flex flex-col justify-between">
					<h3 className="text-lg font-semibold">Antifraud AI Activation</h3>
					<p className="text-2xl font-bold mt-2">{antifraudActivations}</p>
				</Card>

				<Card className="p-6 shadow-md bg-gray-800 text-white flex flex-col justify-between">
					<h3 className="text-lg font-semibold">Impact Activity</h3>
					<p className="text-2xl font-bold mt-2">{impactActivity}</p>
				</Card>

				<Card className="p-6 shadow-md bg-gray-800 text-white flex flex-col justify-between">
					<h3 className="text-lg font-semibold">News Count</h3>
					<p className="text-2xl font-bold mt-2">{newsCount}</p>
				</Card>
			</div>
		</div>
	);
}