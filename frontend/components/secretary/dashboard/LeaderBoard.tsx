"use client";

import { Card, CardContent } from "@/components/ui/card";

const groupLeaderboard = [
	{
		id: 1,
		rank: 1,
		group: "Group Alpha",
		presentationAch: 92,
		impactOutreach: 88,
		massActivity: 12,
		massOutreach: 600,
		hashtagAch: 80,
		mediaCoverage: 85,
		antifraudTarget: 98,
	},
	{
		id: 2,
		rank: 2,
		group: "Group Beta",
		presentationAch: 87,
		impactOutreach: 82,
		massActivity: 10,
		massOutreach: 520,
		hashtagAch: 75,
		mediaCoverage: 78,
		antifraudTarget: 92,
	},
	{
		id: 3,
		rank: 3,
		group: "Group Gamma",
		presentationAch: 84,
		impactOutreach: 79,
		massActivity: 9,
		massOutreach: 480,
		hashtagAch: 72,
		mediaCoverage: 74,
		antifraudTarget: 88,
	},
];

export default function Leaderboard() {
	return (
		<Card className="shadow-md m-4 bg-gray-800 text-white">
			<CardContent className="p-6">
				<h3 className="text-lg font-semibold mb-4 text-white">
					Group LeaderBoard
				</h3>

				<div className="overflow-x-auto">
					<table className="w-full border-collapse text-white">
						<thead>
							<tr className="text-left border-b border-gray-600">
								<th className="p-2">Rank</th>
								<th className="p-2">Group Name</th>
								<th className="p-2">Presentation %Ach</th>
								<th className="p-2">Impact Outreach (%)</th>
								<th className="p-2">Indoor & Outdoor Mass Activity</th>
								<th className="p-2">Mass Outreach</th>
								<th className="p-2">Hashtag % Ach</th>
								<th className="p-2">% Media Coverage</th>
								<th className="p-2">Antifraud Activation Target %</th>
							</tr>
						</thead>

						<tbody>
							{groupLeaderboard.map((group) => (
								<tr
									key={group.id}
									className="border-b border-gray-700 hover:bg-gray-700 transition-colors"
								>
									<td className="p-2">{group.rank}</td>
									<td className="p-2">{group.group}</td>
									<td className="p-2">{group.presentationAch}%</td>
									<td className="p-2">{group.impactOutreach}%</td>
									<td className="p-2">{group.massActivity}</td>
									<td className="p-2">{group.massOutreach}</td>
									<td className="p-2">{group.hashtagAch}%</td>
									<td className="p-2">{group.mediaCoverage}%</td>
									<td className="p-2">{group.antifraudTarget}%</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</CardContent>
		</Card>
	);
}