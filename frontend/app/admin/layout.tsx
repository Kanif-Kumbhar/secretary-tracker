import Sidebar from "@/components/admin/dashboard/SideBar";
import { SessionProvider } from "@/context/session";
import { getSessionUser } from "@/hooks/user";
import { userRole } from "@/types/common";
import { redirect } from "next/navigation";
import React from "react";

export default async function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await getSessionUser();
	if (!session || session.user.role !== userRole.ADMIN || session === null) return redirect("/auth");

	return (
		<div className="flex h-screen bg-gray-900 text-gray-200">
			<SessionProvider session={session}>
				<Sidebar session={session} />
				<main className="flex-1 bg-gray-800 overflow-y-auto h-full">
					{children}
				</main>
			</SessionProvider>
		</div>
	);
}