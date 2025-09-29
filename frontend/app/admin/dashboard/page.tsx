import VisitorsChart from "@/components/admin/dashboard/VisitorsChart";
import LeaderBoard from "@/components/admin/dashboard/LeaderBoard";
import Header from "@/components/admin/dashboard/Header";
import StatCards from "@/components/admin/dashboard/StatCard";

export default function AdminDashboard() {
	return (
		<div className="p-4">
			<Header title="Admin Dashboard" />
			<StatCards />
			<VisitorsChart />
			<LeaderBoard />
		</div>
	);
}