"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type ResponseCounts = {
	q1_aware: number;
	q1_somewhat: number;
	q1_notReally: number;
	q2_veryUseful: number;
	q2_useful: number;
	q2_okay: number;
	q3_yes: number;
	q3_maybe: number;
	q3_no: number;
};

export function useImpactFeedbackForm(
	totalParticipants: number,
	impactId: string
) {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	const [responseCounts, setResponseCounts] = useState<ResponseCounts>({
		q1_aware: 0,
		q1_somewhat: 0,
		q1_notReally: 0,
		q2_veryUseful: 0,
		q2_useful: 0,
		q2_okay: 0,
		q3_yes: 0,
		q3_maybe: 0,
		q3_no: 0,
	});

	const getQuestionTotal = (keys: (keyof ResponseCounts)[]) => {
		return keys.reduce((sum, key) => sum + (responseCounts[key] || 0), 0);
	};

	const validateForm = () => {
		const errors: string[] = [];

		const questions: { keys: (keyof ResponseCounts)[]; label: string }[] = [
			{ keys: ["q1_aware", "q1_somewhat", "q1_notReally"], label: "Q1" },
			{ keys: ["q2_veryUseful", "q2_useful", "q2_okay"], label: "Q2" },
			{ keys: ["q3_yes", "q3_maybe", "q3_no"], label: "Q3" },
		];

		questions.forEach(({ keys, label }) => {
			const total = getQuestionTotal(keys);
			if (total !== totalParticipants) {
				errors.push(`${label}: ${total}/${totalParticipants}`);
			}
		});

		return errors;
	};

	const updateResponse = (
		key: keyof ResponseCounts,
		rawValue: number,
		groupKeys: (keyof ResponseCounts)[]
	) => {
		const safeValue = isNaN(rawValue) ? 0 : Math.max(0, rawValue);

		setResponseCounts((prev) => {
			const currentGroupTotal = groupKeys.reduce(
				(sum, k) => sum + (k === key ? 0 : prev[k] || 0),
				0
			);

			const remaining = Math.max(0, totalParticipants - currentGroupTotal);
			const finalValue = Math.min(safeValue, remaining);

			return {
				...prev,
				[key]: finalValue,
			};
		});
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const errors = validateForm();

		if (errors.length > 0) {
			toast.error(
				`Please correct: ${errors.join(
					", "
				)}. Each must total ${totalParticipants}.`,
				{
					duration: 4000,
					position: "top-center",
				}
			);
			return;
		}

		startTransition(async () => {
			const feedbackData = {
				impactId,
				totalParticipants,
				responseCounts,
			};

			console.log("Impact Feedback Data:", feedbackData);

			// TODO: Backend API call here

			toast.success("Feedback saved successfully!", {
				duration: 3000,
				position: "top-center",
			});

			setTimeout(() => {
				router.push("/secretary/dashboard");
			}, 1000);
		});
	};

	return {
		isPending,
		responseCounts,
		getQuestionTotal,
		updateResponse,
		handleSubmit,
	};
}