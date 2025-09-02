import Sidebar from "../../components/admin/dashboard/Sidebar";
import { Outlet } from "@tanstack/react-router";

export default function AdminLayout() {
	return (
		<div className="bg-gray-900 text-gray-200 min-h-screen flex">
			<Sidebar />
			<main className="flex-1 bg-black overflow-y-auto">
				<Outlet /> {/* This renders nested routes */}
			</main>
		</div>
	);
}