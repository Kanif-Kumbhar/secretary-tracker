import { z } from "zod";

export const presentationSchema = z
	.object({
		cyberWarriors: z.string().min(1, "Please select Cyber Warriors team"),
		schoolName: z.string().min(1, "School name is required"),
		address: z.string().min(1, "Address is required"),
		phoneNo: z
			.string()
			.min(10, "Phone number must be at least 10 digits")
			.max(10, "Phone number must be exactly 10 digits")
			.regex(/^\d+$/, "Phone number must contain only digits"),
		emailId: z.string().email("Valid email required"),
		principalName: z.string().min(1, "Principal name is required"),
		city: z.string().min(1, "City is required"),
		taluka: z.string().min(1, "Taluka is required"),
		district: z.string().min(1, "District is required"),
		medium: z.string().min(1, "Medium is required"),
		presentationDate: z.string().min(1, "Date is required"),
		timeFrom: z.string().min(1, "Start time is required"),
		timeTo: z.string().min(1, "End time is required"),
		classGroup: z.enum(["5-7", "8-10", "college"], {
			errorMap: () => ({ message: "Please select a class group" }),
		}),
		presentationRating: z.string().min(1, "Rating is required"),
		remarks: z.string().optional(),
	})
	.passthrough();