"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function useFileUpload() {
	const { toast } = useToast();
	const [pdfFile, setPdfFile] = useState<File | null>(null);

	const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		if (file.type !== "application/pdf") {
			toast({
				title: "Invalid file type",
				description: "Please upload a PDF file",
				variant: "destructive",
			});
			return;
		}

		if (file.size > 10 * 1024 * 1024) {
			toast({
				title: "File too large",
				description: "PDF must be less than 10MB",
				variant: "destructive",
			});
			return;
		}

		setPdfFile(file);
		toast({
			title: "PDF uploaded",
			description: file.name,
		});
	};

	const removePdf = () => {
		setPdfFile(null);
	};

	return {
		pdfFile,
		handlePdfUpload,
		removePdf,
	};
}