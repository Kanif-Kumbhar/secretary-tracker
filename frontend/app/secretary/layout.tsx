import Sidebar from "@/components/secretary/dashboard/SideBar";
import { Toaster } from "@/components/ui/toaster";
import { getSessionUser } from "@/hooks/user";
import { redirect } from "next/navigation";
import React from "react";

export default async function TeacherLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	// const session = await getSessionUser();
	// if (!session || session.user.role !== "TEACHER" || session === null) return redirect("/auth");
	return (
		<div className="flex h-screen bg-gray-900 text-gray-200">
			<Sidebar />
			<main className="flex-1 bg-gray-800 overflow-y-auto h-full">
				{children}
				<Toaster />
			</main>
		</div>
	);
}
