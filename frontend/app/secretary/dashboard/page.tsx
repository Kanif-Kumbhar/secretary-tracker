import VisitorsChart from "@/components/secretary/dashboard/VisitorsChart";
import LeaderBoard from "@/components/secretary/dashboard/LeaderBoard";
import Header from "@/components/admin/dashboard/Header";
import StatCards from "@/components/secretary/dashboard/StatCard";
import { getSessionUser } from "@/hooks/user";

export default async function AdminDashboard() {
	// const data = await getSessionUser();
	// console.log(data);
	return (
		<div className="p-4">
			<Header title="Secretary Dashboard" />
			<StatCards />
			<VisitorsChart />
			<LeaderBoard />
		</div>
	);
}
