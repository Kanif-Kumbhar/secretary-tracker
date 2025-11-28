"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	Legend,
} from "recharts";

const weeklyData = [
	{
		day: "Mon",
		studentsSanitized: 50,
		institutionsReached: 5,
		communitySanitized: 30,
	},
	{
		day: "Tue",
		studentsSanitized: 80,
		institutionsReached: 6,
		communitySanitized: 40,
	},
	{
		day: "Wed",
		studentsSanitized: 65,
		institutionsReached: 4,
		communitySanitized: 25,
	},
	{
		day: "Thu",
		studentsSanitized: 90,
		institutionsReached: 7,
		communitySanitized: 50,
	},
	{
		day: "Fri",
		studentsSanitized: 75,
		institutionsReached: 5,
		communitySanitized: 35,
	},
	{
		day: "Sat",
		studentsSanitized: 100,
		institutionsReached: 8,
		communitySanitized: 60,
	},
	{
		day: "Sun",
		studentsSanitized: 85,
		institutionsReached: 6,
		communitySanitized: 45,
	},
];

export default function SanitizationChart() {
	return (
		<Card className="shadow-md m-4 bg-gray-800 text-white">
			<CardContent className="p-6">
				<h3 className="text-lg font-semibold mb-4 text-white">
					Weekly Sanitization Overview
				</h3>

				<div style={{ width: "100%", height: 350 }}>
					<ResponsiveContainer>
						<LineChart data={weeklyData}>
							<CartesianGrid stroke="#374151" strokeDasharray="3 3" />
							<XAxis
								dataKey="day"
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
								labelStyle={{
									color: "#f8fafc",
									fontWeight: "bold",
								}}
								cursor={{ fill: "rgba(156, 163, 175, 0.1)" }}
							/>
							<Legend verticalAlign="top" wrapperStyle={{ color: "#f8fafc" }} />
							<Line
								type="monotone"
								dataKey="studentsSanitized"
								stroke="#F26928"
								strokeWidth={2}
								name="Students Sanitized"
							/>
							<Line
								type="monotone"
								dataKey="institutionsReached"
								stroke="#4C6FFF"
								strokeWidth={2}
								name="Institutions Reached"
							/>
							<Line
								type="monotone"
								dataKey="communitySanitized"
								stroke="#22C55E"
								strokeWidth={2}
								name="Community Sanitized"
							/>
						</LineChart>
					</ResponsiveContainer>
				</div>
			</CardContent>
		</Card>
	);
}