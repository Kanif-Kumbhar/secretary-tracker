export interface ImpactFormData {
	cyberWarriors: string;
	organization: string;
	leaderName: string;
	messagePropagated: string;
	date: string;
	activityDuration: string;
	location: string;
	participants: string;
	resourceInvolved: string;
	socialLinks: string;
	mediaLinks: string;
	remarks: string;
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