import VisitorsChart from "@/components/teacher/dashboard/VisitorsChart";
import LeaderBoard from "@/components/teacher/dashboard/LeaderBoard";
import Header from "@/components/admin/dashboard/Header";
import StatCards from "@/components/teacher/dashboard/StatCard";

export default function AdminDashboard() {
    return (
        <div className="p-4">
            <Header title="Teacher Dashboard" />
            <StatCards />
            <VisitorsChart />
            <LeaderBoard />
        </div>
    );
}