"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";

type StatsType = {
	institutions: number;
	volunteers: number;
	activities: number;
	students: number;
	communities: number;
};

export default function StatCards() {
	const [stats, setStats] = useState<StatsType | null>(null);

	useEffect(() => {
		async function fetchStats() {
			const res = await fetch("/api/stats");
			const data = await res.json();
			setStats(data);
		}
		fetchStats();
	}, []);

	const displayStats = [
		{ title: "Total Institutions", value: stats?.institutions ?? 0 },
		{ title: "Total Volunteers", value: stats?.volunteers ?? 0 },
		{ title: "Total Activities Logged", value: stats?.activities ?? 0 },
		{ title: "Total Students Reached", value: stats?.students ?? 0 },
		{ title: "Total Communities Reached", value: stats?.communities ?? 0 },
	];

	return (
		<div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-4 mb-4">
			{displayStats.map((stat, idx) => (
				<Card
					key={idx}
					className="p-6 shadow-md bg-gray-900 text-white border border-gray-700"
				>
					<CardContent>
						<h3 className="text-lg font-semibold">{stat.title}</h3>
						<div className="flex items-baseline mt-2">
							<p className="text-2xl font-bold">{stat.value}</p>
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
}