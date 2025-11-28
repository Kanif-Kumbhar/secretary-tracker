"use client";

import { useParams, useSearchParams } from "next/navigation";
import FeedbackForm5_7 from "@/components/secretary/feedback/FeedbackForm5_7";
import FeedbackForm8_10 from "@/components/secretary/feedback/FeedbackForm8_10";
import FeedbackFormCollege from "@/components/secretary/feedback/FeedbackFormCollege";

export default function FeedbackPage() {
	const params = useParams();
	const searchParams = useSearchParams();

	const presentationId = params.presentationId as string;
	const classGroup = searchParams.get("classGroup");
	const totalStudents = Number(searchParams.get("totalStudents"));

	console.log("Presentation ID:", presentationId);
	console.log("Class Group:", classGroup);
	console.log("Total Students:", totalStudents);

	if (!classGroup || !totalStudents) {
		return (
			<div className="min-h-screen bg-gray-800 flex items-center justify-center p-4">
				<div className="text-center bg-gray-900 p-8 rounded-lg border border-red-700">
					<h2 className="text-2xl font-bold text-red-400 mb-4">
						Invalid Parameters
					</h2>
					<p className="text-gray-300 mb-4">
						Missing class group or student count information.
					</p>
					<div className="text-left bg-gray-800 p-4 rounded">
						<p className="text-sm text-gray-400">
							Presentation ID: {presentationId || "N/A"}
						</p>
						<p className="text-sm text-gray-400">
							Class Group: {classGroup || "Missing"}
						</p>
						<p className="text-sm text-gray-400">
							Total Students: {totalStudents || "Missing"}
						</p>
					</div>
				</div>
			</div>
		);
	}

	if (classGroup === "5-7") {
		return (
			<FeedbackForm5_7
				totalStudents={totalStudents}
				presentationId={presentationId}
			/>
		);
	} else if (classGroup === "8-10") {
		return (
			<FeedbackForm8_10
				totalStudents={totalStudents}
				presentationId={presentationId}
			/>
		);
	} else if (classGroup === "college") {
		return (
			<FeedbackFormCollege
				totalStudents={totalStudents}
				presentationId={presentationId}
			/>
		);
	}

	return (
		<div className="min-h-screen bg-gray-800 flex items-center justify-center">
			<div className="text-center bg-gray-900 p-8 rounded-lg border border-red-700">
				<h2 className="text-2xl font-bold text-red-400 mb-4">
					Invalid Class Group
				</h2>
				<p className="text-gray-300">
					The specified class group &quot;{classGroup}&quot; is not recognized.
				</p>
				<p className="text-sm text-gray-400 mt-4">
					Valid options: 5-7, 8-10, college
				</p>
			</div>
		</div>
	);
}