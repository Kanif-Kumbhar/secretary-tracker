"use client";

import React from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/button";
import type { Teacher } from "@/types/teachers";

interface Props {
	isOpen: boolean;
	onClose: () => void;
	teacher: Teacher | null;
	onVerify: (teacher: Teacher) => void;
	onSendBack: (teacher: Teacher) => void;
}

export const TeacherDetailsModal: React.FC<Props> = ({
	isOpen,
	onClose,
	teacher,
	onVerify,
	onSendBack,
}) => {
	if (!teacher) return null;

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			{/* Header */}
			<h2 className="text-xl font-bold mb-4">Teacher Details</h2>

			{/* Body */}
			<div className="space-y-2 mb-4">
				<p>
					<strong>Name:</strong> {teacher.name}
				</p>
				<p>
					<strong>Institute:</strong> {teacher.institute}
				</p>
				<p>
					<strong>Mobile:</strong> {teacher.mobile}
				</p>
				<p>
					<strong>Age:</strong> {teacher.age}
				</p>
				<p>
					<strong>Bank Details:</strong> {teacher.bankDetails}
				</p>
				<p>
					<strong>Address:</strong> {teacher.address}
				</p>
			</div>

			{/* Footer */}
			<div className="flex justify-end gap-2">
				<Button
					variant="outline"
					className="bg-red-600 hover:bg-red-700"
					onClick={() => onSendBack(teacher)}
				>
					Send Back
				</Button>
				<Button
					className="bg-green-500 hover:bg-green-600"
					onClick={() => onVerify(teacher)}
				>
					Verify
				</Button>
			</div>
		</Modal>
	);
};