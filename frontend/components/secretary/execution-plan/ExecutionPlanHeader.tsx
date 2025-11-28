"use client";

import { format } from "date-fns";
import { Calendar, Clock } from "lucide-react";

interface ExecutionPlanHeaderProps {
    startDate: string;
    endDate: string;
    weeksAvailable: number;
    institutionName: string;
}

export default function ExecutionPlanHeader({
    startDate,
    endDate,
    weeksAvailable,
    institutionName,
}: ExecutionPlanHeaderProps) {
    return (
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-xl p-6 border border-gray-700 mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Execution Plan - 2025-26
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <InfoCard
                    icon={<Calendar className="w-5 h-5" />}
                    label="Institution"
                    value={institutionName}
                />
                <InfoCard
                    icon={<Calendar className="w-5 h-5" />}
                    label="Start Date"
                    value={format(new Date(startDate), "dd-MMM-yy")}
                />
                <InfoCard
                    icon={<Calendar className="w-5 h-5" />}
                    label="End Date"
                    value={format(new Date(endDate), "dd-MMM-yy")}
                />
                <InfoCard
                    icon={<Clock className="w-5 h-5" />}
                    label="Weeks Available"
                    value={weeksAvailable.toString()}
                />
            </div>
        </div>
    );
}

function InfoCard({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
}) {
    return (
        <div className="bg-gray-700/50 rounded-lg p-4">
            <div className="flex items-center text-gray-400 text-sm mb-1">
                {icon}
                <span className="ml-2">{label}</span>
            </div>
            <p className="text-white font-semibold text-lg">{value}</p>
        </div>
    );
}