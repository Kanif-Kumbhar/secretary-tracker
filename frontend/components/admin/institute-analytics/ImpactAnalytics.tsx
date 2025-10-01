"use client";

import React from "react";
import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	RadarChart,
	Radar,
	PolarGrid,
	PolarAngleAxis,
	PolarRadiusAxis,
	ResponsiveContainer,
	PieChart,
	Pie,
	Cell,
} from "recharts";

export default function ImpactAnalytics() {
	const totalStudentsReached = [
		{ institution: "College A", students: 300 },
		{ institution: "College B", students: 200 },
		{ institution: "College C", students: 400 },
	];

	const communityParticipants = [
		{ institution: "College A", participants: 50 },
		{ institution: "College B", participants: 30 },
		{ institution: "College C", participants: 70 },
	];

	const genderDistribution = [
		{ name: "Male", value: 400 },
		{ name: "Female", value: 300 },
		{ name: "Other", value: 100 },
	];

	const COLORS = ["#FF8042", "#0088FE", "#00C49F"];

	return (
		<div className="mt-4 mb-4 space-y-6">
			{/* First Row: Full width chart */}
			<div className="p-4 bg-gray-900 text-white rounded shadow">
				<h3 className="font-semibold mb-2">Total Students Reached</h3>
				<ResponsiveContainer width="100%" height={300}>
					<AreaChart data={totalStudentsReached}>
						<XAxis dataKey="institution" stroke="#fff" />
						<YAxis stroke="#fff" />
						<Tooltip
							contentStyle={{
								background: "#1F2937",
								border: "1px solid #334155",
								borderRadius: "0.5rem",
								color: "#f8fafc",
							}}
							labelStyle={{
								color: "#f8fafc",
								fontWeight: "bold",
							}}
							cursor={{ fill: "rgba(156, 163, 175, 0.1)" }}
						/>
						<Legend />
						<Area
							type="monotone"
							dataKey="students"
							stroke="#FFA500"
							fill="#FFA500"
						/>
					</AreaChart>
				</ResponsiveContainer>
			</div>

			{/* Second Row: Two charts side-by-side */}
			<div className="flex flex-wrap gap-6">
				{/* 50% width chart */}
				<div className="flex-1 min-w-[45%] p-4 bg-gray-900 text-white rounded shadow">
					<h3 className="font-semibold mb-2">Community Participants</h3>
					<ResponsiveContainer width="100%" height={300}>
						<RadarChart
							cx="50%"
							cy="50%"
							outerRadius="80%"
							data={communityParticipants}
						>
							<PolarGrid />
							<PolarAngleAxis dataKey="institution" stroke="#fff" />
							<PolarRadiusAxis stroke="#fff" />
							<Radar
								name="Participants"
								dataKey="participants"
								stroke="#FF8042"
								fill="#FF8042"
								fillOpacity={0.6}
							/>
							<Legend />
						</RadarChart>
					</ResponsiveContainer>
				</div>

				{/* 50% width chart */}
				<div className="flex-1 min-w-[45%] p-4 bg-gray-900 text-white rounded shadow">
					<h3 className="font-semibold mb-2">Gender Distribution</h3>
					<ResponsiveContainer width="100%" height={300}>
						<PieChart>
							<Pie
								data={genderDistribution}
								dataKey="value"
								nameKey="name"
								cx="50%"
								cy="50%"
								outerRadius={80}
								fill="#8884d8"
								label
							>
								{genderDistribution.map((entry, index) => (
									<Cell
										key={`cell-${index}`}
										fill={COLORS[index % COLORS.length]}
									/>
								))}
							</Pie>
							<Legend />
							<Tooltip
								contentStyle={{
									background: "#1F2937",
									border: "1px solid #334155",
									borderRadius: "0.5rem",
									color: "#f8fafc",
								}}
								labelStyle={{
									color: "#f8fafc",
									fontWeight: "bold",
								}}
								cursor={{ fill: "rgba(156, 163, 175, 0.1)" }}
							/>
						</PieChart>
					</ResponsiveContainer>
				</div>
			</div>
		</div>
	);
}