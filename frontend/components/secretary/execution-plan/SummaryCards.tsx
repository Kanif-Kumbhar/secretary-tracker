"use client";

import { Presentation, Users, Activity } from "lucide-react";

interface SummaryCardsProps {
    totals: {
        presentations: { committed: number; achieved: number; surplus: number };
        students: { committed: number; achieved: number; surplus: number };
        impact: { committed: number; achieved: number; surplus: number };
    };
}

export default function SummaryCards({ totals }: SummaryCardsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <CompactSummaryCard
                icon={<Presentation className="w-5 h-5" />}
                title="Total Presentations"
                committed={totals.presentations.committed}
                achieved={totals.presentations.achieved}
                surplus={totals.presentations.surplus}
                color="orange"
            />
            <CompactSummaryCard
                icon={<Users className="w-5 h-5" />}
                title="Total Students"
                committed={totals.students.committed}
                achieved={totals.students.achieved}
                surplus={totals.students.surplus}
                color="blue"
            />
            <CompactSummaryCard
                icon={<Activity className="w-5 h-5" />}
                title="Impact Activities"
                committed={totals.impact.committed}
                achieved={totals.impact.achieved}
                surplus={totals.impact.surplus}
                color="purple"
            />
        </div>
    );
}

interface CompactSummaryCardProps {
    icon: React.ReactNode;
    title: string;
    committed: number;
    achieved: number;
    surplus: number;
    color: "orange" | "blue" | "purple";
}

function CompactSummaryCard({
    icon,
    title,
    committed,
    achieved,
    surplus,
    color,
}: CompactSummaryCardProps) {
    const colorClasses = {
        orange: "from-orange-500 to-red-500",
        blue: "from-blue-500 to-cyan-500",
        purple: "from-purple-500 to-pink-500",
    };

    const progress = committed > 0 ? (achieved / committed) * 100 : 0;

    return (
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg border border-gray-700 p-4">
            <div className="flex items-center justify-between mb-3">
                <div className="flex-1">
                    <p className="text-gray-400 text-xs mb-1">{title}</p>
                    <div className="flex items-baseline space-x-2">
                        <span className="text-2xl font-bold text-white">{achieved}</span>
                        <span className="text-gray-400 text-xs">/ {committed}</span>
                    </div>
                </div>
                <div
                    className={`w-10 h-10 bg-gradient-to-br ${colorClasses[color]} rounded-lg flex items-center justify-center text-white flex-shrink-0`}
                >
                    {icon}
                </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-2">
                <div className="w-full bg-gray-700 rounded-full h-1.5 overflow-hidden">
                    <div
                        className={`h-full bg-gradient-to-r ${colorClasses[color]} transition-all duration-500`}
                        style={{ width: `${Math.min(progress, 100)}%` }}
                    />
                </div>
                <p className="text-[10px] text-gray-400 mt-1">
                    {progress.toFixed(0)}% Complete
                </p>
            </div>

            {/* Surplus/Deficit */}
            <div className="flex items-center justify-between text-xs pt-2 border-t border-gray-700">
                <span className="text-gray-400">Surplus:</span>
                <span
                    className={`font-semibold ${
                        surplus > 0
                            ? "text-green-400"
                            : surplus < 0
                            ? "text-red-400"
                            : "text-gray-400"
                    }`}
                >
                    {surplus > 0 ? "+" : ""}
                    {surplus}
                </span>
            </div>
        </div>
    );
}