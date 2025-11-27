"use client";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useImpactForm } from "@/hooks/secretary/impact-activity/useImpactForm";
import { useFileUpload } from "@/hooks/secretary/useFileUpload";
import CyberWarriorsSection from "@/components/secretary/impact/CyberWarriorSection";
import ActivityDetailsSection from "@/components/secretary/impact/ActivityDetailsSection";
import FileUploadSection from "@/components/secretary/impact/FileUploadSection";
import AdditionalInfoSection from "@/components/secretary/impact/AdditionalInfoSection";
import ActivityFeedbackSection from "@/components/secretary/impact/ActivityFeedbackSection";

export default function ImpactActivityPage() {
	const { form, isPending, handleSubmit } = useImpactForm();
	const { pdfFile, handlePdfUpload, removePdf } = useFileUpload();

	const onSubmit = (data: any) => {
		handleSubmit(data, pdfFile);
	};

	return (
		<div className="min-h-screen bg-gray-800 p-10">
			<h1 className="text-3xl font-bold text-gray-100 mb-8 text-center">
				Impact Activity Details
			</h1>

			<div className="max-w-5xl mx-auto bg-gray-900 rounded-2xl shadow-2xl p-8 border border-gray-700">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<CyberWarriorsSection control={form.control} />

						<ActivityDetailsSection control={form.control} />

						<FileUploadSection
							control={form.control}
							pdfFile={pdfFile}
							handlePdfUpload={handlePdfUpload}
							removePdf={removePdf}
						/>

						<AdditionalInfoSection control={form.control} />

						<ActivityFeedbackSection control={form.control} />

						<div className="mt-6">
							<Button
								type="submit"
								disabled={isPending}
								className="w-full py-4 font-semibold text-white rounded-lg shadow-md bg-orange-500 hover:bg-orange-600 transition-colors disabled:opacity-50"
							>
								{isPending ? (
									<>
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										Processing...
									</>
								) : (
									"Save Activity & Continue to Feedback"
								)}
							</Button>
						</div>
					</form>
				</Form>
			</div>
		</div>
	);
}
