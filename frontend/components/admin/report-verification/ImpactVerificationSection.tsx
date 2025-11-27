"use client";

import { useState } from "react";
import { Award, Users } from "lucide-react";
import ReportCard from "./ReportCard";
import ReportDetailModal from "./ReportDetailModal";
// Mock data - replace with actual API call
const mockImpactReports = [
	{
		id: "1",
		teacherName: "Dr. Rajesh Kumar",
		teacherEmail: "rajesh.kumar@example.com",
		collegeName: "Government College of Engineering, Karad",
		submittedDate: "2025-11-15",
		status: "PENDING",
		data: {
			weekNumber: 5,
			date: "2025-11-10",
			impactType: "Behavioral Change",
			numberOfBeneficiaries: 120,
			communityReached: "Students and Parents",
			observedChanges:
				"Increased awareness about online safety, students reported avoiding suspicious links",
			successStories:
				"Three students identified and reported phishing attempts to their parents",
			challenges: "Some parents were initially skeptical about the program",
			recommendations: "More parent-teacher sessions needed",
			followUpActions: "Plan monthly awareness sessions",
			communityFeedback: "Very positive - Parents appreciated the initiative",
			longTermImpact: "Students are more cautious while browsing online",
			attachments: ["impact_survey.pdf", "testimonials.pdf"],
		},
	},
];

export default function ImpactVerificationSection() {
	const [selectedReport, setSelectedReport] = useState<any>(null);
	const [reports, setReports] = useState(mockImpactReports);

	const handleReportClick = (report: any) => {
		setSelectedReport(report);
	};

	const handleCloseModal = () => {
		setSelectedReport(null);
	};

	const handleVerification = (
		reportId: string,
		status: string,
		remarks: string
	) => {
		setReports(
			reports.map((report) =>
				report.id === reportId
					? { ...report, status, adminRemarks: remarks }
					: report
			)
		);
		setSelectedReport(null);
	};

	const pendingReports = reports.filter((r) => r.status === "PENDING");
	const verifiedReports = reports.filter((r) => r.status !== "PENDING");

	return (
		<div className="space-y-6">
			{/* Pending Reports */}
			<div>
				<div className="flex items-center justify-between mb-4">
					<h2 className="text-xl font-semibold text-white">
						Pending Verification ({pendingReports.length})
					</h2>
				</div>

				{pendingReports.length === 0 ? (
					<div className="bg-gray-800 rounded-lg p-8 text-center">
						<Award className="w-12 h-12 text-gray-600 mx-auto mb-3" />
						<p className="text-gray-400">No pending impact reports</p>
					</div>
				) : (
					<div className="grid md:grid-cols-2 gap-4">
						{pendingReports.map((report) => (
							<ReportCard
								key={report.id}
								report={report}
								type="impact"
								onClick={() => handleReportClick(report)}
							/>
						))}
					</div>
				)}
			</div>

			{/* Verified Reports */}
			{verifiedReports.length > 0 && (
				<div>
					<h2 className="text-xl font-semibold text-white mb-4">
						Recently Verified ({verifiedReports.length})
					</h2>
					<div className="grid md:grid-cols-2 gap-4">
						{verifiedReports.map((report) => (
							<ReportCard
								key={report.id}
								report={report}
								type="impact"
								onClick={() => handleReportClick(report)}
							/>
						))}
					</div>
				</div>
			)}

			{/* Modal */}
			{selectedReport && (
				<ReportDetailModal
					report={selectedReport}
					type="impact"
					onClose={handleCloseModal}
					onVerify={handleVerification}
				/>
			)}
		</div>
	);
}