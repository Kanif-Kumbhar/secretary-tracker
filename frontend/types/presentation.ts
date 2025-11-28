export type ClassGroup = "5-7" | "8-10" | "college";

export interface StudentCounts {
	totalBoys: number;
	totalGirls: number;
	totalStudents: number;
}

export interface PresentationFormData {
	cyberWarriors: string;
	schoolName: string;
	address: string;
	phoneNo: string;
	emailId: string;
	principalName: string;
	city: string;
	taluka: string;
	district: string;
	medium: string;
	presentationDate: string;
	timeFrom: string;
	timeTo: string;
	classGroup: ClassGroup;
	std5Boys?: number;
	std5Girls?: number;
	std6Boys?: number;
	std6Girls?: number;
	std7Boys?: number;
	std7Girls?: number;
	std8Boys?: number;
	std8Girls?: number;
	std9Boys?: number;
	std9Girls?: number;
	std10Boys?: number;
	std10Girls?: number;
	std11Boys?: number;
	std11Girls?: number;
	std12Boys?: number;
	std12Girls?: number;
	collegeBoys?: number;
	collegeGirls?: number;
	presentationRating: string;
	remarks?: string;
}

export const CYBER_WARRIOR_TEAMS = [
	{ value: "akasha-olive", label: "Akasha & Olive" },
	{ value: "john-smith", label: "John & Smith" },
	{ value: "raj-priya", label: "Raj & Priya" },
	{ value: "amit-neha", label: "Amit & Neha" },
	{ value: "vikram-shreya", label: "Vikram & Shreya" },
	{ value: "rahul-anjali", label: "Rahul & Anjali" },
	{ value: "sanjay-pooja", label: "Sanjay & Pooja" },
	{ value: "arjun-kavya", label: "Arjun & Kavya" },
] as const;
