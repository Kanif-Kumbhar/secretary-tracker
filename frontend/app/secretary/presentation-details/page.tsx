"use client";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { usePresentationForm } from "@/hooks/secretary/presentation/usePresentationForm";
import { useStudentCounts } from "@/hooks/secretary/presentation/useStudentCounts";
import CyberWarriorsSection from "@/components/secretary/presentation/CyberWarriorSection";
import SchoolDetailsSection from "@/components/secretary/presentation/SchoolDetailsSection";
import LocationSection from "@/components/secretary/presentation/LocationSection";
import ClassGroupSection from "@/components/secretary/presentation/ClassGroupSection";
import StudentCountSection from "@/components/secretary/presentation/StudentCountSection";
import PresentationScheduleSection from "@/components/secretary/presentation/PresentationScheduleSection";
import SchoolAuthorityRatingSection from "@/components/secretary/presentation/SchoolAuthorityRatingSection";

export default function PresentationDetailsPage() {
	const { form, isPending, handleSubmit } = usePresentationForm();

	const classGroup = form.watch("classGroup");
	const formValues = form.watch();

	const studentCounts = useStudentCounts(formValues, classGroup);

	const onSubmit = (data: any) => {
		handleSubmit(data, studentCounts.totalStudents);
	};

	return (
		<div className="min-h-screen bg-gray-800 p-10">
			<h1 className="text-3xl font-bold text-gray-100 mb-8 text-center">
				Visit Report - Cyber Shiksha for Cyber Suraksha
			</h1>

			<div className="max-w-6xl mx-auto bg-gray-900 rounded-2xl shadow-2xl p-8 border border-gray-700">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<CyberWarriorsSection control={form.control} />

						<SchoolDetailsSection control={form.control} />

						<LocationSection control={form.control} />

						<ClassGroupSection control={form.control} />

						<StudentCountSection
							control={form.control}
							classGroup={classGroup}
							studentCounts={studentCounts}
							isPending={isPending}
						/>

						<PresentationScheduleSection control={form.control} />

						<SchoolAuthorityRatingSection control={form.control} />

						{/* Submit Button */}
						<div className="mt-6">
							<Button
								type="submit"
								disabled={isPending || studentCounts.totalStudents === 0}
								className="w-full py-4 font-semibold text-white rounded-lg shadow-md bg-orange-500 hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
							>
								{isPending ? (
									<>
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										Processing...
									</>
								) : (
									"Save Visit Report & Continue to Digital Behavior Survey"
								)}
							</Button>
						</div>
					</form>
				</Form>
			</div>
		</div>
	);
}