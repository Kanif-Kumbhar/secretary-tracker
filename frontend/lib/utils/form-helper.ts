import type { QuestionValidation } from "@/types/feedback";

export const calculateStudentTotals = (
	formData: Record<string, any>,
	classGroup: string
): { totalBoys: number; totalGirls: number; totalStudents: number } => {
	let boys = 0;
	let girls = 0;

	if (classGroup === "5-7") {
		boys =
			(Number(formData.std5Boys) || 0) +
			(Number(formData.std6Boys) || 0) +
			(Number(formData.std7Boys) || 0);
		girls =
			(Number(formData.std5Girls) || 0) +
			(Number(formData.std6Girls) || 0) +
			(Number(formData.std7Girls) || 0);
	} else if (classGroup === "8-10") {
		boys =
			(Number(formData.std8Boys) || 0) +
			(Number(formData.std9Boys) || 0) +
			(Number(formData.std10Boys) || 0);
		girls =
			(Number(formData.std8Girls) || 0) +
			(Number(formData.std9Girls) || 0) +
			(Number(formData.std10Girls) || 0);
	} else if (classGroup === "college") {
		boys =
			(Number(formData.std11Boys) || 0) +
			(Number(formData.std12Boys) || 0) +
			(Number(formData.collegeBoys) || 0);
		girls =
			(Number(formData.std11Girls) || 0) +
			(Number(formData.std12Girls) || 0) +
			(Number(formData.collegeGirls) || 0);
	}

	return {
		totalBoys: boys,
		totalGirls: girls,
		totalStudents: boys + girls,
	};
};

export const validateResponseTotals = (
	responseCounts: Record<string, number>,
	totalStudents: number,
	questionKeys: QuestionValidation[]
): string[] => {
	const errors: string[] = [];

	questionKeys.forEach(({ keys, label }) => {
		const total = keys.reduce(
			(sum: number, key: string) => sum + (responseCounts[key] || 0),
			0
		);
		if (total !== totalStudents) {
			errors.push(
				`${label}: Total responses (${total}) must equal ${totalStudents} students`
			);
		}
	});

	return errors;
};

export const getQuestionTotal = (
	responseCounts: Record<string, number>,
	keys: string[]
): number => {
	return keys.reduce((sum, key) => sum + (responseCounts[key] || 0), 0);
};