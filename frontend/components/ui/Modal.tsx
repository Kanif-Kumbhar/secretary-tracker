"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
	if (!isOpen) return null;

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 dark:bg-white/20"
			onClick={onClose}
		>
			<div
				className={cn(
					"rounded-lg shadow-lg w-full max-w-lg p-6",
					"bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
				)}
				onClick={(e) => e.stopPropagation()}
			>
				{children}
			</div>
		</div>
	);
};