"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { presentationSchema } from "@/lib/validations/presentation";
import toast from "react-hot-toast";

export function usePresentationForm() {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	const form = useForm({
		resolver: zodResolver(presentationSchema),
		mode: "onChange",
		defaultValues: {
			cyberWarriors: "",
			schoolName: "",
			address: "",
			phoneNo: "",
			emailId: "",
			principalName: "",
			city: "",
			taluka: "",
			district: "",
			medium: "",
			presentationDate: "",
			timeFrom: "",
			timeTo: "",
			classGroup: "",
			std5Boys: 0,
			std5Girls: 0,
			std6Boys: 0,
			std6Girls: 0,
			std7Boys: 0,
			std7Girls: 0,
			std8Boys: 0,
			std8Girls: 0,
			std9Boys: 0,
			std9Girls: 0,
			std10Boys: 0,
			std10Girls: 0,
			std11Boys: 0,
			std11Girls: 0,
			std12Boys: 0,
			std12Girls: 0,
			collegeBoys: 0,
			collegeGirls: 0,
			presentationRating: "",
			remarks: "",
		},
	});

	const handleSubmit = (data: any, totalStudents: number) => {
		if (totalStudents === 0) {
			toast.error("Please enter at least one student count");
			return;
		}

		startTransition(async () => {
			console.log("Presentation Data:", data);

			// TODO: Backend team - API integration here
			// const response = await fetch("/api/secretary/presentation", {
			//   method: "POST",
			//   headers: { "Content-Type": "application/json" },
			//   body: JSON.stringify({ ...data, totalStudents }),
			// });
			// const result = await response.json();

			const presentationId = "PRES-" + Date.now();

			toast.success("Visit report saved successfully!");

			setTimeout(() => {
				router.push(
					`/secretary/feedback/${presentationId}?classGroup=${data.classGroup}&totalStudents=${totalStudents}`
				);
			}, 1000);
		});
	};

	return {
		form,
		isPending,
		handleSubmit,
	};
}