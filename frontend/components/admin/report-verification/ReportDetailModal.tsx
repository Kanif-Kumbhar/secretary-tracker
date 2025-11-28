"use client";

import { useState } from "react";
import {
	X,
	Check,
	XCircle,
	FileText,
	Download,
	AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";

interface ReportDetailModalProps {
	report: any;
	type: "presentation" | "impact";
	onClose: () => void;
	onVerify: (reportId: string, status: string, remarks: string) => void;
}

export default function ReportDetailModal({
	report,
	type,
	onClose,
	onVerify,
}: ReportDetailModalProps) {
	const [remarks, setRemarks] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleVerify = async (status: string) => {
		if (status !== "APPROVED" && !remarks.trim()) {
			toast.error(
				"Please provide remarks for rejection or approval with remarks"
			);
			return;
		}

		setIsSubmitting(true);
		try {
			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1000));

			onVerify(report.id, status, remarks);
			toast.success(`Report ${status.toLowerCase()} successfully`);
		} catch (error) {
			toast.error("Failed to verify report");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
			<div className="bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
				{/* Header */}
				<div className="p-6 border-b border-gray-700 flex items-center justify-between bg-gradient-to-r from-orange-500/10 to-red-500/10">
					<div>
						<h2 className="text-2xl font-bold text-white flex items-center">
							{type === "presentation" ? (
								<FileText className="w-6 h-6 mr-3 text-orange-500" />
							) : (
								<AlertCircle className="w-6 h-6 mr-3 text-orange-500" />
							)}
							{type === "presentation" ? "Presentation" : "Impact"} Report
							Details
						</h2>
						<p className="text-gray-400 text-sm mt-1">
							Week {report.data.weekNumber} • Report ID: #{report.id}
						</p>
					</div>
					<button
						onClick={onClose}
						className="text-gray-400 hover:text-white transition-colors"
					>
						<X className="w-6 h-6" />
					</button>
				</div>

				{/* Content */}
				<div className="flex-1 overflow-y-auto p-6 space-y-6">
					{/* Teacher Info Card */}
					<div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
						<h3 className="text-white font-semibold mb-3">Submitted By</h3>
						<div className="grid md:grid-cols-2 gap-3 text-sm">
							<div>
								<span className="text-gray-400">Teacher:</span>
								<p className="text-white font-medium">{report.teacherName}</p>
							</div>
							<div>
								<span className="text-gray-400">Email:</span>
								<p className="text-white font-medium">{report.teacherEmail}</p>
							</div>
							<div className="md:col-span-2">
								<span className="text-gray-400">Institution:</span>
								<p className="text-white font-medium">{report.collegeName}</p>
							</div>
						</div>
					</div>

					{/* Report Details */}
					{type === "presentation" ? (
						<PresentationDetails data={report.data} />
					) : (
						<ImpactDetails data={report.data} />
					)}

					{/* Attachments */}
					{report.data.attachments && report.data.attachments.length > 0 && (
						<div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
							<h3 className="text-white font-semibold mb-3">Attachments</h3>
							<div className="space-y-2">
								{report.data.attachments.map((file: string, index: number) => (
									<div
										key={index}
										className="flex items-center justify-between bg-gray-800 rounded-lg p-3 hover:bg-gray-750 transition-colors"
									>
										<div className="flex items-center">
											<FileText className="w-5 h-5 text-orange-500 mr-3" />
											<span className="text-white text-sm">{file}</span>
										</div>
										<button className="text-orange-500 hover:text-orange-400 transition-colors">
											<Download className="w-5 h-5" />
										</button>
									</div>
								))}
							</div>
						</div>
					)}

					{/* Admin Remarks Section */}
					{report.status === "PENDING" && (
						<div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
							<h3 className="text-white font-semibold mb-3 flex items-center">
								<AlertCircle className="w-5 h-5 text-orange-500 mr-2" />
								Admin Remarks (Optional)
							</h3>
							<Textarea
								placeholder="Add any remarks, feedback, or reasons for rejection..."
								value={remarks}
								onChange={(e) => setRemarks(e.target.value)}
								className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-500 min-h-[100px]"
							/>
							<p className="text-xs text-gray-400 mt-2">
								* Remarks are required for rejection or approval with remarks
							</p>
						</div>
					)}

					{/* Existing Remarks */}
					{report.adminRemarks && (
						<div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
							<h3 className="text-blue-400 font-semibold mb-2">
								Previous Admin Remarks
							</h3>
							<p className="text-gray-300 text-sm">{report.adminRemarks}</p>
						</div>
					)}
				</div>

				{/* Action Buttons */}
				{report.status === "PENDING" && (
					<div className="p-6 border-t border-gray-700 bg-gray-800/50">
						<div className="flex gap-3">
							<Button
								onClick={() => handleVerify("APPROVED")}
								disabled={isSubmitting}
								className="flex-1 bg-green-600 hover:bg-green-700 text-white"
							>
								<Check className="w-5 h-5 mr-2" />
								{isSubmitting ? "Processing..." : "Approve"}
							</Button>
							<Button
								onClick={() => handleVerify("APPROVED_WITH_REMARKS")}
								disabled={isSubmitting || !remarks.trim()}
								className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
							>
								<Check className="w-5 h-5 mr-2" />
								Approve with Remarks
							</Button>
							<Button
								onClick={() => handleVerify("REJECTED")}
								disabled={isSubmitting || !remarks.trim()}
								className="flex-1 bg-red-600 hover:bg-red-700 text-white"
							>
								<XCircle className="w-5 h-5 mr-2" />
								Reject
							</Button>
						</div>
						<p className="text-xs text-center text-gray-400 mt-3">
							Please review all information carefully before taking action
						</p>
					</div>
				)}
			</div>
		</div>
	);
}

function PresentationDetails({ data }: { data: any }) {
	const fields = [
		{ label: "Date", value: new Date(data.date).toLocaleDateString() },
		{ label: "Class Standard", value: data.classStandard },
		{ label: "Venue", value: data.venue },
		{ label: "Duration", value: data.duration },
		{ label: "Topic Covered", value: data.topicCovered },
		{ label: "Number of Students", value: data.numberOfStudents },
		{ label: "Teaching Method", value: data.teachingMethod },
		{ label: "Resources Used", value: data.resourcesUsed },
		{ label: "Student Engagement", value: data.studentEngagement },
		{ label: "Challenges", value: data.challenges },
		{ label: "Feedback", value: data.feedback },
	];

	return (
		<div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
			<h3 className="text-white font-semibold mb-4">Presentation Details</h3>
			<div className="grid md:grid-cols-2 gap-4">
				{fields.map((field, index) => (
					<DetailField key={index} label={field.label} value={field.value} />
				))}
			</div>
		</div>
	);
}

function ImpactDetails({ data }: { data: any }) {
	const fields = [
		{ label: "Date", value: new Date(data.date).toLocaleDateString() },
		{ label: "Impact Type", value: data.impactType },
		{ label: "Number of Beneficiaries", value: data.numberOfBeneficiaries },
		{ label: "Community Reached", value: data.communityReached },
		{ label: "Observed Changes", value: data.observedChanges },
		{ label: "Success Stories", value: data.successStories },
		{ label: "Challenges", value: data.challenges },
		{ label: "Recommendations", value: data.recommendations },
		{ label: "Follow-up Actions", value: data.followUpActions },
		{ label: "Community Feedback", value: data.communityFeedback },
		{ label: "Long Term Impact", value: data.longTermImpact },
	];

	return (
		<div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
			<h3 className="text-white font-semibold mb-4">Impact Details</h3>
			<div className="grid md:grid-cols-2 gap-4">
				{fields.map((field, index) => (
					<DetailField key={index} label={field.label} value={field.value} />
				))}
			</div>
		</div>
	);
}

function DetailField({ label, value }: { label: string; value: any }) {
	return (
		<div className="space-y-1">
			<label className="text-xs text-gray-400 uppercase tracking-wider">
				{label}
			</label>
			<p className="text-white text-sm bg-gray-800 rounded p-2">
				{value || "N/A"}
			</p>
		</div>
	);
}