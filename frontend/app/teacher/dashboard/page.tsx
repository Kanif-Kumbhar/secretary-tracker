import VisitorsChart from "@/components/teacher/dashboard/VisitorsChart";
import LeaderBoard from "@/components/teacher/dashboard/LeaderBoard";
import Header from "@/components/admin/dashboard/Header";
import StatCards from "@/components/teacher/dashboard/StatCard";
import { getSessionUser } from "@/hooks/user";

export default async function AdminDashboard() {
    // const data = await getSessionUser();
    // console.log(data);
    return (
        <div className="p-4">
            <Header title="Teacher Dashboard" />
            <StatCards />
            <VisitorsChart />
            <LeaderBoard />
        </div>
    );
}