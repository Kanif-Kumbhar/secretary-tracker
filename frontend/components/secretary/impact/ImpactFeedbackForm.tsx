"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useImpactFeedbackForm } from "@/hooks/secretary/impact-activity/useImpactFeedbackForm";

interface ImpactFeedbackFormProps {
	totalParticipants: number;
	impactId: string;
}

export default function ImpactFeedbackForm({
	totalParticipants,
	impactId,
}: ImpactFeedbackFormProps) {
	const router = useRouter();

	const {
		isPending,
		responseCounts,
		getQuestionTotal,
		updateResponse,
		handleSubmit,
	} = useImpactFeedbackForm(totalParticipants, impactId);

	return (
		<div className="max-w-6xl mx-auto">
			<div className="flex items-center justify-between mb-8">
				<div>
					<h1 className="text-3xl font-bold text-gray-100">
						Impact Activity Feedback
					</h1>
					<p className="text-gray-400 mt-2">
						Total Participants:{" "}
						<span className="text-orange-400 font-bold">
							{totalParticipants}
						</span>
					</p>
				</div>
				<Button
					onClick={() => router.back()}
					variant="outline"
					className="border-gray-600 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
				>
					← Back
				</Button>
			</div>

			<div className="bg-gray-900 rounded-2xl shadow-2xl p-8 border border-gray-700">
				<p className="text-gray-300 mb-6">
					Enter how many participants raised their hands for each response
					option.{" "}
					<span className="text-orange-400 font-semibold">
						For every question, the total must equal {totalParticipants}.
					</span>
				</p>

				<form onSubmit={handleSubmit} className="space-y-8">
					{/* Feedback Questions */}
					<fieldset className="border border-blue-700 rounded-lg p-6 bg-blue-900/10">
						<legend className="text-lg font-semibold text-blue-400 px-3">
							Activity Feedback
						</legend>

						<div className="space-y-8 mt-4">
							{/* Q1 */}
							<QuestionBlock
								title="1. Are you aware of cyber safety now?"
								keys={["q1_aware", "q1_somewhat", "q1_notReally"]}
								options={[
									{ label: "Yes, fully aware", key: "q1_aware" },
									{ label: "Somewhat aware", key: "q1_somewhat" },
									{ label: "Not really", key: "q1_notReally" },
								]}
								responseCounts={responseCounts}
								totalParticipants={totalParticipants}
								getQuestionTotal={getQuestionTotal}
								updateResponse={updateResponse}
							/>

							{/* Q2 */}
							<QuestionBlock
								title="2. How useful was this activity?"
								keys={["q2_veryUseful", "q2_useful", "q2_okay"]}
								options={[
									{ label: "Very useful", key: "q2_veryUseful" },
									{ label: "Useful", key: "q2_useful" },
									{ label: "Okay", key: "q2_okay" },
								]}
								responseCounts={responseCounts}
								totalParticipants={totalParticipants}
								getQuestionTotal={getQuestionTotal}
								updateResponse={updateResponse}
							/>

							{/* Q3 */}
							<QuestionBlock
								title="3. Will you share this knowledge with others?"
								keys={["q3_yes", "q3_maybe", "q3_no"]}
								options={[
									{ label: "Yes, definitely", key: "q3_yes" },
									{ label: "Maybe", key: "q3_maybe" },
									{ label: "No", key: "q3_no" },
								]}
								responseCounts={responseCounts}
								totalParticipants={totalParticipants}
								getQuestionTotal={getQuestionTotal}
								updateResponse={updateResponse}
							/>
						</div>
					</fieldset>

					{/* Submit */}
					<div className="flex gap-4">
						<Button
							type="submit"
							disabled={isPending}
							className="flex-1 py-4 font-semibold text-white rounded-lg shadow-md bg-orange-500 hover:bg-orange-600"
						>
							{isPending ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									Submitting...
								</>
							) : (
								"Submit Feedback"
							)}
						</Button>
						<Button
							type="button"
							onClick={() => router.back()}
							variant="outline"
							className="px-8 py-4 border-gray-600 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
						>
							Cancel
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}

type QuestionBlockProps = {
	title: string;
	keys: (keyof typeof initialResponseCounts)[];
	options: { label: string; key: keyof typeof initialResponseCounts }[];
	responseCounts: any;
	totalParticipants: number;
	getQuestionTotal: (keys: (keyof typeof initialResponseCounts)[]) => number;
	updateResponse: (
		key: keyof typeof initialResponseCounts,
		value: number,
		groupKeys: (keyof typeof initialResponseCounts)[]
	) => void;
};

const initialResponseCounts = {
	q1_aware: 0,
	q1_somewhat: 0,
	q1_notReally: 0,
	q2_veryUseful: 0,
	q2_useful: 0,
	q2_okay: 0,
	q3_yes: 0,
	q3_maybe: 0,
	q3_no: 0,
};

function QuestionBlock({
	title,
	keys,
	options,
	responseCounts,
	totalParticipants,
	getQuestionTotal,
	updateResponse,
}: QuestionBlockProps) {
	const total = getQuestionTotal(keys);
	const isValid = total === totalParticipants;

	return (
		<div className="bg-gray-800/50 p-4 rounded-lg">
			<Label className="text-base font-medium text-gray-200 block mb-3">
				{title}
			</Label>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				{options.map(({ label, key }) => (
					<div key={key}>
						<Label className="text-gray-400 text-sm">{label}</Label>
						<Input
							type="number"
							min="0"
							max={totalParticipants}
							value={responseCounts[key]}
							onChange={(e) =>
								updateResponse(key, Number(e.target.value), keys)
							}
							className="bg-gray-700 border-gray-600 text-gray-100 mt-1"
						/>
					</div>
				))}
			</div>
			<p
				className={`mt-2 text-sm ${
					isValid ? "text-green-400" : "text-red-400"
				}`}
			>
				Total: {total} / {totalParticipants}
				{isValid && " ✓"}
			</p>
		</div>
	);
}