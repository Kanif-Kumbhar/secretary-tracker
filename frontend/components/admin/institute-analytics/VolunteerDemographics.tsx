"use client";

import React from "react";
import {
	RadarChart,
	Radar,
	PolarGrid,
	PolarAngleAxis,
	PolarRadiusAxis,
	LineChart,
	Line,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	PieChart,
	Pie,
	Cell,
	ResponsiveContainer,
} from "recharts";

export default function VolunteerDemographics() {
	const volunteerByCourse = [
		{ course: "Science", count: 40 },
		{ course: "Arts", count: 30 },
		{ course: "Commerce", count: 20 },
		{ course: "Engineering", count: 50 },
		{ course: "Law", count: 10 },
	];

	const volunteerByYear = [
		{ year: "2021", count: 30 },
		{ year: "2022", count: 50 },
		{ year: "2023", count: 80 },
		{ year: "2024", count: 60 },
		{ year: "2025", count: 100 },
	];

	const genderDistribution = [
		{ name: "Male", value: 60 },
		{ name: "Female", value: 40 },
	];

	const COLORS = ["#FF8042", "#0088FE"];

	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
			{/* Volunteer by Course */}
			<div className="p-4 bg-gray-900 text-white rounded shadow">
				<h3 className="font-semibold mb-2">Volunteers by Course</h3>
				<ResponsiveContainer width="100%" height={250}>
					<RadarChart
						cx="50%"
						cy="50%"
						outerRadius="80%"
						data={volunteerByCourse}
					>
						<PolarGrid />
						<PolarAngleAxis dataKey="course" stroke="#fff" />
						<PolarRadiusAxis stroke="#fff" />
						<Radar
							name="Volunteers"
							dataKey="count"
							stroke="#FFA500"
							fill="#FFA500"
							fillOpacity={0.6}
						/>
						<Legend />
					</RadarChart>
				</ResponsiveContainer>
			</div>

			{/* Volunteer by Year */}
			<div className="p-4 bg-gray-900 text-white rounded shadow">
				<h3 className="font-semibold mb-2">Volunteers by Year</h3>
				<ResponsiveContainer width="100%" height={250}>
					<LineChart data={volunteerByYear}>
						<XAxis dataKey="year" stroke="#fff" />
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
						<Line
							type="monotone"
							dataKey="count"
							stroke="#FF8042"
							strokeWidth={2}
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>

			{/* Gender Distribution */}
			<div className="p-4 bg-gray-900 text-white rounded shadow">
				<h3 className="font-semibold mb-2">Gender Distribution</h3>
				<ResponsiveContainer width="100%" height={250}>
					<PieChart>
						<Pie
							data={genderDistribution}
							dataKey="value"
							nameKey="name"
							cx="50%"
							cy="50%"
							outerRadius={70}
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
	);
}