import Sidebar from "@/components/teacher/dashboard/SideBar";
import React from "react";

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex h-screen bg-gray-900 text-gray-200">
			<Sidebar />
			<main className="flex-1 bg-gray-800 overflow-y-auto h-full">
				{children}
			</main>
		</div>
	);
}