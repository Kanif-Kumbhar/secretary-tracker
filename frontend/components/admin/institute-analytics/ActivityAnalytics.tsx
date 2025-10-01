"use client";

import React from "react";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	ResponsiveContainer,
	PieChart,
	Pie,
	Cell,
	CartesianGrid,
	LineChart,
	Line,
} from "recharts";

export default function ActivityAnalytics() {
	const activityVolume = [
		{ institution: "College A", activities: 120 },
		{ institution: "College B", activities: 80 },
		{ institution: "College C", activities: 150 },
	];

	const activityTypeBreakdown = [
		{ institution: "College A", Presentation: 50, Impact: 40, Mass: 30 },
		{ institution: "College B", Presentation: 30, Impact: 20, Mass: 30 },
		{ institution: "College C", Presentation: 60, Impact: 50, Mass: 40 },
	];

	const socialMediaEngagement = [
		{ name: "College A", value: 20 },
		{ name: "College B", value: 15 },
		{ name: "College C", value: 25 },
	];

	const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

	return (
		<div className="space-y-6">
			{/* Row 1: Activity Volume + Social Media Engagement */}
			<div className="flex gap-6">
				{/* Activity Volume */}
				<div className="flex-1 p-4 bg-gray-900 text-white rounded shadow transition-colors">
					<h3 className="font-semibold mb-2">Activity Volume by Institution</h3>
					<ResponsiveContainer width="100%" height={300}>
						<BarChart data={activityVolume}>
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
							<Bar dataKey="activities" fill="#FFA500" />
						</BarChart>
					</ResponsiveContainer>
				</div>

				{/* Social Media Engagement */}
				<div className="flex-1 p-4 bg-gray-900 text-white rounded shadow transition-colors">
					<h3 className="font-semibold mb-2">Social Media Engagement</h3>
					<ResponsiveContainer width="100%" height={300}>
						<PieChart>
							<Pie
								data={socialMediaEngagement}
								dataKey="value"
								nameKey="name"
								cx="50%"
								cy="50%"
								outerRadius={80}
								fill="#8884d8"
								label
							>
								{socialMediaEngagement.map((entry, index) => (
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

			{/* Row 2: Activity Type Breakdown (Line Chart) */}
			<div className="p-4 bg-gray-900 text-white rounded shadow transition-colors">
				<h3 className="font-semibold mb-2">Activity Type Breakdown</h3>
				<ResponsiveContainer width="100%" height={350}>
					<LineChart data={activityTypeBreakdown}>
						<CartesianGrid stroke="#374151" strokeDasharray="3 3" />
						<XAxis
							dataKey="institution"
							stroke="#f8fafc"
							tick={{ fill: "#f8fafc" }}
						/>
						<YAxis stroke="#f8fafc" tick={{ fill: "#f8fafc" }} />
						<Tooltip
							contentStyle={{
								background: "#1F2937",
								border: "1px solid #334155",
								borderRadius: "0.5rem",
								color: "#f8fafc",
							}}
							labelStyle={{ color: "#f8fafc", fontWeight: "bold" }}
							cursor={{ stroke: "#FFA500", strokeWidth: 2 }}
						/>
						<Legend verticalAlign="top" wrapperStyle={{ color: "#f8fafc" }} />

						{/* Lines with dots */}
						<Line
							type="monotone" // smooth curves
							dataKey="Presentation"
							stroke="#8884d8"
							strokeWidth={2}
							dot={{ r: 5, stroke: "#8884d8", strokeWidth: 2, fill: "#fff" }}
							activeDot={{ r: 7 }}
							name="Presentation"
						/>
						<Line
							type="monotone"
							dataKey="Impact"
							stroke="#82ca9d"
							strokeWidth={2}
							dot={{ r: 5, stroke: "#82ca9d", strokeWidth: 2, fill: "#fff" }}
							activeDot={{ r: 7 }}
							name="Impact"
						/>
						<Line
							type="monotone"
							dataKey="Mass"
							stroke="#ffc658"
							strokeWidth={2}
							dot={{ r: 5, stroke: "#ffc658", strokeWidth: 2, fill: "#fff" }}
							activeDot={{ r: 7 }}
							name="Mass"
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
}