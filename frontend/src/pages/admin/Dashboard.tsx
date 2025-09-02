import StatCards from "../../components/admin/dashboard/StatCards";
import VisitorsChart from "../../components/admin/dashboard/VisitorsChart";
import LeaderBoard from "../../components/admin/dashboard/LeaderBoard";
import Header from "@/components/admin/dashboard/Header";

export default function AdminDashboard() {
	return (
		<div className="bg-gray-900 text-gray-200 min-h-screen flex">
			<main className="flex-1 bg-black overflow-y-auto">
				<Header title="Admin Dashboard"/>
				<StatCards />
				<VisitorsChart />
				<LeaderBoard />
			</main>
		</div>
	);
}