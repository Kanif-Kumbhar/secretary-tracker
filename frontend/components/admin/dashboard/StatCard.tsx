"use client";

import { Card, CardContent } from "@/components/ui/card";

const PROJECT_START_DATE = new Date("2025-08-01");

export default function StatCards() {
	const today = new Date();

	// Calculate difference in days between today and project start
	const diffInDays = Math.floor(
		(today.getTime() - PROJECT_START_DATE.getTime()) / (1000 * 60 * 60 * 24)
	);

	// Calculate current week number
	const weekNumber = Math.floor(diffInDays / 7) + 1;

	// Calculate elapsed months
	const monthDiff =
		today.getMonth() -
		PROJECT_START_DATE.getMonth() +
		12 * (today.getFullYear() - PROJECT_START_DATE.getFullYear());

	const stats = [
		{
			title: "Project Week",
			value: weekNumber,
			extra: `(${monthDiff} ${monthDiff === 1 ? "Month" : "Months"})`,
		},
		{ title: "Total Institutes", value: 36 },
		{ title: "Antifraud AI Activation", value: 145 },
		{ title: "Reports Sent", value: 45 },
		{ title: "Pending Applications", value: 4 },
	];

	return (
		<div className="grid grid-cols-1 md:grid-cols-5 gap-4 m-4">
			{stats.map((stat, idx) => (
				<Card
					key={idx}
					className="p-6 shadow-md bg-gray-800 text-white border border-gray-700"
				>
					<CardContent>
						<h3 className="text-lg font-semibold">{stat.title}</h3>
						<div className="flex items-baseline mt-2">
							<p className="text-2xl font-bold">{stat.value}</p>
							{stat.extra && (
								<span className="ml-2 text-orange-500 font-semibold">
									{stat.extra}
								</span>
							)}
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
}
