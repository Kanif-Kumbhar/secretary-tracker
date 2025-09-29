import Sidebar from "@/components/admin/dashboard/SideBar";
import React from "react";

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="bg-gray-900 text-gray-200 min-h-screen flex">
			<Sidebar />
			<main className="flex-1 bg-black overflow-y-auto">
				{children}
			</main>
		</div>
	);
}