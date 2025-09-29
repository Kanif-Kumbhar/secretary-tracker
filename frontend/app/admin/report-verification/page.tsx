"use client";

import { useState } from "react";
import Header from "@/components/admin/dashboard/Header";
import { TeacherCard } from "@/components/admin/teacher-verification/TeacherCard";
import { TeacherDetailsModal } from "@/components/admin/teacher-verification/TeacherDetailModal";
import type { Teacher } from "@/types/teachers";

// Mock data
const TEACHERS: Teacher[] = [
	{
		id: "1",
		name: "Priyanka Shinde",
		profileImage: "/images/teacher1.jpg",
		institute: "GCE Karad",
		mobile: "9876543210",
		age: 32,
		bankDetails: "HDFC Bank, A/C 12345678",
		address: "123 Main Street, Pune",
	},
	{
		id: "2",
		name: "Varsha Patil",
		profileImage: "/images/teacher2.jpg",
		institute: "DY Patil",
		mobile: "9123456780",
		age: 29,
		bankDetails: "SBI Bank, A/C 87654321",
		address: "45 MG Road, Mumbai",
	},
];

export default function ReportVerification() {
	const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
	const [modalOpen, setModalOpen] = useState(false);

	const handleCardClick = (teacher: Teacher) => {
		setSelectedTeacher(teacher);
		setModalOpen(true);
	};

	const handleVerify = (teacher: Teacher) => {
		console.log("Verified", teacher);
		setModalOpen(false);
	};

	const handleSendBack = (teacher: Teacher) => {
		console.log("Send Back", teacher);
		setModalOpen(false);
	};

	return (
		<div className="min-h-screen p-6 bg-gray-900 text-gray-200">
			<Header title="Report Verification" />

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
				{TEACHERS.map((teacher) => (
					<TeacherCard
						key={teacher.id}
						name={teacher.name}
						profileImage={teacher.profileImage}
						institute={teacher.institute}
						onClick={() => handleCardClick(teacher)}
					/>
				))}
			</div>

			<TeacherDetailsModal
				isOpen={modalOpen}
				onClose={() => setModalOpen(false)}
				teacher={selectedTeacher}
				onVerify={handleVerify}
				onSendBack={handleSendBack}
			/>
		</div>
	);
}