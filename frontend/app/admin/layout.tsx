import Sidebar from "@/components/admin/dashboard/SideBar";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await auth();

	// Redirect if not authenticated
	if (!session || !session.user) {
		redirect("/auth");
	}

	// Role-based access control
	if (session.user.role !== "ADMIN") {
		redirect("/unauthorized");
	}

	return (
		<div className="flex h-screen bg-gray-900 text-gray-200">
			<Sidebar session={session} />
			<main className="flex-1 bg-gray-800 overflow-y-auto h-full">
				{children}
			</main>
		</div>
	);
}