"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { WeekData } from "@/hooks/secretary/execution-plan/useExecutionPlan";
import { Presentation, Users, Activity, Lock, Check, Calendar, History } from "lucide-react";
import { format } from "date-fns";
import toast from "react-hot-toast";

interface WeekCardProps {
    week: WeekData;
    weekIndex: number;
    onUpdateCommitment: (
        weekIndex: number,
        category: "presentations" | "students" | "impact",
        value: number
    ) => void;
    onSaveWeek: (weekIndex: number) => void;
}

export default function WeekCard({
    week,
    weekIndex,
    onUpdateCommitment,
    onSaveWeek,
}: WeekCardProps) {
    const isEditable = (week.status === "current" || week.status === "upcoming") && !week.isSaved;
    const showSaveButton = isEditable && (
        week.presentations.committed > 0 ||
        week.students.committed > 0 ||
        week.impact.committed > 0
    );

    const handleSave = () => {
        if (
            week.presentations.committed === 0 &&
            week.students.committed === 0 &&
            week.impact.committed === 0
        ) {
            toast.error("Please set at least one commitment before saving");
            return;
        }
        onSaveWeek(weekIndex);
        toast.success(`Week ${week.week} commitment saved successfully!`);
    };

    const getStatusBadge = () => {
        switch (week.status) {
            case "past":
                return (
                    <div className="flex items-center space-x-1 px-2 py-1 bg-gray-700/50 rounded-full text-xs">
                        <History className="w-3 h-3 text-gray-400" />
                        <span className="text-gray-400">Completed</span>
                    </div>
                );
            case "current":
                return (
                    <div className="flex items-center space-x-1 px-2 py-1 bg-green-500/20 border border-green-500/50 rounded-full text-xs">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-green-400 font-semibold">Current Week</span>
                    </div>
                );
            case "upcoming":
                return (
                    <div className="flex items-center space-x-1 px-2 py-1 bg-blue-500/20 border border-blue-500/50 rounded-full text-xs">
                        <Calendar className="w-3 h-3 text-blue-400" />
                        <span className="text-blue-400 font-semibold">Upcoming</span>
                    </div>
                );
            case "future":
                return (
                    <div className="flex items-center space-x-1 px-2 py-1 bg-orange-500/20 border border-orange-500/50 rounded-full text-xs">
                        <Lock className="w-3 h-3 text-orange-400" />
                        <span className="text-orange-400">Locked</span>
                    </div>
                );
        }
    };

    return (
        <div
            className={`relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg border p-5 transition-all ${
                isEditable
                    ? "border-orange-500/50 shadow-orange-500/20"
                    : week.status === "past"
                    ? "border-gray-700/50 opacity-80"
                    : "border-gray-700"
            }`}
        >
            {/* Week Header */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-700">
                <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-xl font-bold text-white">Week {week.week}</h3>
                        {getStatusBadge()}
                    </div>
                    <p className="text-gray-400 text-xs">
                        {format(week.startDate, "MMM dd")} - {format(week.endDate, "MMM dd, yyyy")}
                    </p>
                </div>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0 ${
                    week.isSaved 
                        ? "bg-gradient-to-br from-green-500 to-emerald-500"
                        : week.status === "past"
                        ? "bg-gray-700"
                        : "bg-gradient-to-br from-orange-500 to-red-500"
                }`}>
                    {week.isSaved ? <Check className="w-5 h-5" /> : week.week}
                </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-3">
                <CompactMetricCard
                    icon={<Presentation className="w-4 h-4" />}
                    title="Presentations"
                    color="orange"
                    committed={week.presentations.committed}
                    achieved={week.presentations.achieved}
                    surplus={week.presentations.surplus}
                    onCommitmentChange={(value) =>
                        onUpdateCommitment(weekIndex, "presentations", value)
                    }
                    isEditable={isEditable}
                />

                <CompactMetricCard
                    icon={<Users className="w-4 h-4" />}
                    title="Students"
                    color="blue"
                    committed={week.students.committed}
                    achieved={week.students.achieved}
                    surplus={week.students.surplus}
                    onCommitmentChange={(value) =>
                        onUpdateCommitment(weekIndex, "students", value)
                    }
                    isEditable={isEditable}
                />

                <CompactMetricCard
                    icon={<Activity className="w-4 h-4" />}
                    title="Impact"
                    color="purple"
                    committed={week.impact.committed}
                    achieved={week.impact.achieved}
                    surplus={week.impact.surplus}
                    onCommitmentChange={(value) =>
                        onUpdateCommitment(weekIndex, "impact", value)
                    }
                    isEditable={isEditable}
                />
            </div>

            {/* Save Button */}
            {showSaveButton && (
                <div className="mt-4 pt-4 border-t border-gray-700">
                    <Button
                        onClick={handleSave}
                        className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold"
                    >
                        <Check className="w-4 h-4 mr-2" />
                        Save Week {week.week} Commitment
                    </Button>
                </div>
            )}

            {/* Saved Indicator */}
            {week.isSaved && (
                <div className="mt-4 pt-4 border-t border-gray-700">
                    <div className="flex items-center justify-center space-x-2 text-green-400 text-sm">
                        <Check className="w-4 h-4" />
                        <span className="font-semibold">Commitment Saved</span>
                    </div>
                </div>
            )}

            {/* Lock Overlay ONLY for Future Weeks */}
            {week.status === "future" && (
                <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm rounded-xl flex items-center justify-center z-10">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-orange-500/20 border-2 border-orange-500/50 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Lock className="w-8 h-8 text-orange-400" />
                        </div>
                        <p className="text-white text-base font-semibold mb-1">Not Available Yet</p>
                        <p className="text-gray-400 text-sm">
                            Available when current/upcoming week
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

interface CompactMetricCardProps {
    icon: React.ReactNode;
    title: string;
    color: "orange" | "blue" | "purple";
    committed: number;
    achieved: number;
    surplus: number;
    onCommitmentChange: (value: number) => void;
    isEditable: boolean;
}

function CompactMetricCard({
    icon,
    title,
    color,
    committed,
    achieved,
    surplus,
    onCommitmentChange,
    isEditable,
}: CompactMetricCardProps) {
    const colorClasses = {
        orange: {
            bg: "from-orange-500/10 to-red-500/10",
            border: "border-orange-500/30",
            text: "text-orange-400",
            icon: "bg-orange-500",
        },
        blue: {
            bg: "from-blue-500/10 to-cyan-500/10",
            border: "border-blue-500/30",
            text: "text-blue-400",
            icon: "bg-blue-500",
        },
        purple: {
            bg: "from-purple-500/10 to-pink-500/10",
            border: "border-purple-500/30",
            text: "text-purple-400",
            icon: "bg-purple-500",
        },
    };

    const colors = colorClasses[color];

    return (
        <div
            className={`bg-gradient-to-br ${colors.bg} border ${colors.border} rounded-lg p-3`}
        >
            {/* Header */}
            <div className="flex items-center space-x-2 mb-3">
                <div className={`${colors.icon} p-1.5 rounded-md text-white`}>
                    {icon}
                </div>
                <span className={`font-semibold text-xs ${colors.text}`}>
                    {title}
                </span>
            </div>

            {/* Stats */}
            <div className="space-y-2">
                {/* Committed */}
                <div>
                    <label className="text-gray-400 text-[10px] mb-0.5 block">
                        Committed
                    </label>
                    {isEditable ? (
                        <Input
                            type="number"
                            min="0"
                            value={committed || ""}
                            onChange={(e) => onCommitmentChange(Number(e.target.value))}
                            className="bg-gray-700/50 border-gray-600 text-white font-semibold text-center h-8 text-sm"
                        />
                    ) : (
                        <div className="bg-gray-700/30 border border-gray-600 rounded-md h-8 flex items-center justify-center text-gray-300 font-semibold text-sm">
                            {committed}
                        </div>
                    )}
                </div>

                {/* Achieved */}
                <div>
                    <label className="text-gray-400 text-[10px] mb-0.5 block">
                        Achieved
                    </label>
                    <div className="bg-gray-700/30 border border-gray-600 rounded-md h-8 flex items-center justify-center text-gray-300 font-semibold text-sm">
                        {achieved}
                    </div>
                </div>

                {/* Surplus/Deficit */}
                <div>
                    <label className="text-gray-400 text-[10px] mb-0.5 block">
                        Surplus
                    </label>
                    <div
                        className={`border rounded-md h-8 flex items-center justify-center font-bold text-sm ${
                            surplus > 0
                                ? "bg-green-500/10 border-green-500/40 text-green-400"
                                : surplus < 0
                                ? "bg-red-500/10 border-red-500/40 text-red-400"
                                : "bg-gray-700/30 border-gray-600 text-gray-400"
                        }`}
                    >
                        {surplus > 0 ? "+" : ""}
                        {surplus}
                    </div>
                </div>
            </div>
        </div>
    );
}