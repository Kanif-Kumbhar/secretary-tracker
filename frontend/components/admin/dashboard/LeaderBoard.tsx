"use client";

import { Card, CardContent } from "@/components/ui/card";

const leaderboard = [
	{
		id: 1,
		rank: 1,
		institution: "Maharashtra High School",
		presentationAch: 90,
		impactOutreach: 85,
		massActivity: 10,
		massOutreach: 500,
		hashtagAch: 75,
		mediaCoverage: 80,
		antifraudTarget: 95,
	},
	{
		id: 2,
		rank: 2,
		institution: "Royal Academy",
		presentationAch: 85,
		impactOutreach: 80,
		massActivity: 8,
		massOutreach: 400,
		hashtagAch: 70,
		mediaCoverage: 75,
		antifraudTarget: 90,
	},
	{
		id: 3,
		rank: 3,
		institution: "Raj Kumar Institute",
		presentationAch: 80,
		impactOutreach: 75,
		massActivity: 12,
		massOutreach: 450,
		hashtagAch: 65,
		mediaCoverage: 70,
		antifraudTarget: 85,
	},
];

export default function LeaderBoard() {
	return (
		<Card className="shadow-md m-4 bg-gray-800 text-white">
			<CardContent className="p-6">
				<h3 className="text-lg font-semibold mb-4 text-white">LeaderBoard</h3>

				<div className="overflow-x-auto">
					<table className="w-full border-collapse text-white">
						<thead>
							<tr className="text-left border-b border-gray-600">
								<th className="p-2">Rank</th>
								<th className="p-2">Institution Name</th>
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
							{leaderboard.map((doc) => (
								<tr
									key={doc.id}
									className="border-b border-gray-700 hover:bg-gray-700 transition-colors"
								>
									<td className="p-2">{doc.rank}</td>
									<td className="p-2">{doc.institution}</td>
									<td className="p-2">{doc.presentationAch}%</td>
									<td className="p-2">{doc.impactOutreach}%</td>
									<td className="p-2">{doc.massActivity}</td>
									<td className="p-2">{doc.massOutreach}</td>
									<td className="p-2">{doc.hashtagAch}%</td>
									<td className="p-2">{doc.mediaCoverage}%</td>
									<td className="p-2">{doc.antifraudTarget}%</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</CardContent>
		</Card>
	);
}