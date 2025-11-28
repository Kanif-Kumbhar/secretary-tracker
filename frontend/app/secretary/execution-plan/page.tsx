"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useExecutionPlan } from "@/hooks/secretary/execution-plan/useExecutionPlan";
import DateSetupModal from "@/components/secretary/execution-plan/DateSetupModal";
import ExecutionPlanHeader from "@/components/secretary/execution-plan/ExecutionPlanHeader";
import WeekCard from "@/components/secretary/execution-plan/WeekCard";
import SummaryCards from "@/components/secretary/execution-plan/SummaryCards";
import { Info } from "lucide-react";

export default function ExecutionPlanPage() {
	const router = useRouter();
	const {
		startDate,
		setStartDate,
		endDate,
		setEndDate,
		showModal,
		weeks,
		handleStartPlan,
		updateCommitment,
		saveWeekCommitment,
		getTotals,
	} = useExecutionPlan();

	return (
		<div className="min-h-screen bg-gray-900 p-4 md:p-6">
			{/* Date Setup Modal */}
			{showModal && (
				<DateSetupModal
					startDate={startDate}
					setStartDate={setStartDate}
					endDate={endDate}
					setEndDate={setEndDate}
					onStart={handleStartPlan}
				/>
			)}

			{/* Main Content */}
			<div className={showModal ? "blur-sm pointer-events-none" : ""}>
				<div className="max-w-7xl mx-auto">
					{!showModal && (
						<>
							{/* Header */}
							<div className="flex items-center justify-between mb-4">
								<Button
									onClick={() => router.back()}
									variant="outline"
									className="border-gray-600 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
								>
									← Back
								</Button>
							</div>

							<ExecutionPlanHeader
								startDate={startDate}
								endDate={endDate}
								weeksAvailable={weeks.length}
								institutionName="Pratibha College of Commerce and Computer Studies"
							/>

							{/* Info Banner */}
							<div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mb-6">
								<div className="flex items-start space-x-3">
									<Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
									<div className="text-sm text-blue-300">
										<p className="font-semibold mb-1">
											How Commitment Planning Works:
										</p>
										<ul className="space-y-1 text-xs text-blue-200/80">
											<li>
												• You can set commitments for the current week and next
												week only
											</li>
											<li>• Once saved, commitments cannot be changed</li>
											<li>
												• Achieved values are auto-populated from submitted
												reports
											</li>
											<li>
												• Future weeks unlock automatically when they become
												available
											</li>
										</ul>
									</div>
								</div>
							</div>

							{/* Summary Cards */}
							<SummaryCards totals={getTotals()} />

							{/* Week Cards Grid */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								{weeks.map((week, index) => (
									<WeekCard
										key={week.week}
										week={week}
										weekIndex={index}
										onUpdateCommitment={updateCommitment}
										onSaveWeek={saveWeekCommitment}
									/>
								))}
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
}