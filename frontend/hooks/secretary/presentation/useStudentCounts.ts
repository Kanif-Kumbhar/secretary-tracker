"use client";

import { useMemo } from "react";

export type StudentCounts = {
	totalBoys: number;
	totalGirls: number;
	totalStudents: number;
};

export function useStudentCounts(formValues: any, classGroup: string) {
	const counts = useMemo(() => {
		let boys = 0;
		let girls = 0;

		if (classGroup === "5-7") {
			boys =
				(formValues.std5Boys || 0) +
				(formValues.std6Boys || 0) +
				(formValues.std7Boys || 0);
			girls =
				(formValues.std5Girls || 0) +
				(formValues.std6Girls || 0) +
				(formValues.std7Girls || 0);
		} else if (classGroup === "8-10") {
			boys =
				(formValues.std8Boys || 0) +
				(formValues.std9Boys || 0) +
				(formValues.std10Boys || 0);
			girls =
				(formValues.std8Girls || 0) +
				(formValues.std9Girls || 0) +
				(formValues.std10Girls || 0);
		} else if (classGroup === "college") {
			boys =
				(formValues.std11Boys || 0) +
				(formValues.std12Boys || 0) +
				(formValues.collegeBoys || 0);
			girls =
				(formValues.std11Girls || 0) +
				(formValues.std12Girls || 0) +
				(formValues.collegeGirls || 0);
		}

		return {
			totalBoys: boys,
			totalGirls: girls,
			totalStudents: boys + girls,
		};
	}, [
		formValues.std5Boys,
		formValues.std5Girls,
		formValues.std6Boys,
		formValues.std6Girls,
		formValues.std7Boys,
		formValues.std7Girls,
		formValues.std8Boys,
		formValues.std8Girls,
		formValues.std9Boys,
		formValues.std9Girls,
		formValues.std10Boys,
		formValues.std10Girls,
		formValues.std11Boys,
		formValues.std11Girls,
		formValues.std12Boys,
		formValues.std12Girls,
		formValues.collegeBoys,
		formValues.collegeGirls,
		classGroup,
	]);

	return counts;
}