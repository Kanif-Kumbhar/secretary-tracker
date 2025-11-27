"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { impactSchema } from "@/lib/validations/impact";
import { useToast } from "@/hooks/use-toast";

export function useImpactForm() {
	const router = useRouter();
	const { toast } = useToast();
	const [isPending, startTransition] = useTransition();

	const form = useForm({
		resolver: zodResolver(impactSchema),
		mode: "onChange",
		defaultValues: {
			cyberWarriors: "",
			organization: "",
			leaderName: "",
			messagePropagated: "",
			date: "",
			activityDuration: "",
			location: "",
			participants: "",
			resourceInvolved: "",
			socialLinks: "",
			mediaLinks: "",
			remarks: "",
			impactPdf: undefined,
		},
	});

	const handleSubmit = async (data: any, pdfFile: File | null) => {
		startTransition(async () => {
			try {
				// Prepare FormData for API
				const formData = new FormData();

				// Append all form fields
				Object.keys(data).forEach((key) => {
					if (data[key] !== undefined && key !== "impactPdf") {
						formData.append(key, data[key]);
					}
				});

				// Append PDF file
				if (pdfFile) {
					formData.append("impactPdf", pdfFile);
				}

				// TODO: Replace with actual API call
				// const response = await fetch('/api/secretary/impact-activity', {
				//   method: 'POST',
				//   body: formData,
				// });
				// const result = await response.json();

				// Simulated API call
				console.log("Submitting to backend:", {
					formData: data,
					pdfFile,
				});

				await new Promise((resolve) => setTimeout(resolve, 1000));

				const impactId = "IMPACT-" + Date.now();

				toast({
					title: "Success!",
					description: "Impact activity saved successfully",
					duration: 2000,
				});

				setTimeout(() => {
					router.push(
						`/secretary/impact-feedback/${impactId}?participants=${data.participants}`
					);
				}, 1000);
			} catch (error) {
				console.error("Submission error:", error);
				toast({
					title: "Error",
					description: "Failed to save impact activity. Please try again.",
					variant: "destructive",
				});
			}
		});
	};

	return {
		form,
		isPending,
		handleSubmit,
	};
}