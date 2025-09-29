"use client";

import { Card } from "@/components/ui/card";

const PROJECT_START_DATE = new Date("2025-08-01");

export default function StatCards() {
	const today = new Date();

	// 1. Calculate difference in days between today and project start
	const diffInDays = Math.floor(
		(today.getTime() - PROJECT_START_DATE.getTime()) / (1000 * 60 * 60 * 24)
	);

	// 2. Calculate current week number
	const weekNumber = Math.floor(diffInDays / 7) + 1;

	// 3. Calculate elapsed months
	const monthDiff =
		today.getMonth() -
		PROJECT_START_DATE.getMonth() +
		12 * (today.getFullYear() - PROJECT_START_DATE.getFullYear());

	return (
		<div className="grid grid-cols-1 md:grid-cols-5 gap-4 m-4">
			<Card className="p-6 shadow-md">
				<h3 className="text-lg font-semibold">Project Week</h3>
				<div className="flex items-baseline mt-2">
					<p className="text-2xl font-bold">{weekNumber}</p>
					<span className="ml-2 text-orange-500 font-semibold">
						({monthDiff} {monthDiff === 1 ? "Month" : "Months"})
					</span>
				</div>
			</Card>

			<Card className="p-6 shadow-md">
				<h3 className="text-lg font-semibold">Total Institutes</h3>
				<p className="text-2xl font-bold mt-2">36</p>
			</Card>

			<Card className="p-6 shadow-md">
				<h3 className="text-lg font-semibold">Antifraud AI Activation</h3>
				<p className="text-2xl font-bold mt-2">145</p>
			</Card>

			<Card className="p-6 shadow-md">
				<h3 className="text-lg font-semibold">Reports Sent</h3>
				<p className="text-2xl font-bold mt-2">45</p>
			</Card>

			<Card className="p-6 shadow-md">
				<h3 className="text-lg font-semibold">Pending Applications</h3>
				<p className="text-2xl font-bold mt-2">4</p>
			</Card>
		</div>
	);
}