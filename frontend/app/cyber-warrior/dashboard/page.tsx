import VisitorsChart from "@/components/cyber-warrior/dashboard/VisitorsChart";
import LeaderBoard from "@/components/cyber-warrior/dashboard/LeaderBoard";
import Header from "@/components/admin/dashboard/Header";
import StatCards from "@/components/cyber-warrior/dashboard/StatCard";
import { getSessionUser } from "@/hooks/user";
import Sidebar from "@/components/cyber-warrior/dashboard/SideBar";

export default async function AdminDashboard() {
    // const data = await getSessionUser();
    // console.log(data);
    return (
			<div className="p-4">
				<Header title="Cyber Warrior Dashboard" />
				<StatCards />
				<VisitorsChart />
				<LeaderBoard />
			</div>
		);
}