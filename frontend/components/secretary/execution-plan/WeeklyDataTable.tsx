"use client";

import { Input } from "@/components/ui/input";
import { WeekData } from "@/hooks/secretary/execution-plan/useExecutionPlan";

interface WeeklyDataTableProps {
    weeks: WeekData[];
    onUpdateCommitment: (
        weekIndex: number,
        category: "presentations" | "students" | "impact",
        value: number
    ) => void;
}

export default function WeeklyDataTable({
    weeks,
    onUpdateCommitment,
}: WeeklyDataTableProps) {
    return (
        <div className="bg-gray-800/50 rounded-2xl shadow-xl border border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-900/80">
                            <th className="sticky left-0 z-20 bg-gray-900 px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider border-r border-gray-700">
                                SN
                            </th>
                            <th className="sticky left-12 z-20 bg-gray-900 px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider border-r border-gray-700">
                                Week
                            </th>
                            <th
                                colSpan={3}
                                className="px-4 py-3 text-center text-xs font-semibold text-orange-400 uppercase tracking-wider border-r border-gray-700"
                            >
                                Presentations
                            </th>
                            <th
                                colSpan={3}
                                className="px-4 py-3 text-center text-xs font-semibold text-blue-400 uppercase tracking-wider border-r border-gray-700"
                            >
                                Students Sensitized
                            </th>
                            <th
                                colSpan={2}
                                className="px-4 py-3 text-center text-xs font-semibold text-purple-400 uppercase tracking-wider"
                            >
                                Impact
                            </th>
                        </tr>
                        <tr className="bg-gray-800">
                            <th className="sticky left-0 z-20 bg-gray-800"></th>
                            <th className="sticky left-12 z-20 bg-gray-800 border-r border-gray-700"></th>
                            <th className="px-4 py-2 text-xs font-medium text-gray-400">
                                Committed
                            </th>
                            <th className="px-4 py-2 text-xs font-medium text-gray-400">
                                Achieved
                            </th>
                            <th className="px-4 py-2 text-xs font-medium text-gray-400 border-r border-gray-700">
                                Surplus/Deficit
                            </th>
                            <th className="px-4 py-2 text-xs font-medium text-gray-400">
                                Committed
                            </th>
                            <th className="px-4 py-2 text-xs font-medium text-gray-400">
                                Achieved
                            </th>
                            <th className="px-4 py-2 text-xs font-medium text-gray-400 border-r border-gray-700">
                                Surplus/Deficit
                            </th>
                            <th className="px-4 py-2 text-xs font-medium text-gray-400">
                                Committed
                            </th>
                            <th className="px-4 py-2 text-xs font-medium text-gray-400">
                                Achieved
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {weeks.map((week, index) => (
                            <tr
                                key={week.week}
                                className="hover:bg-gray-700/30 transition-colors"
                            >
                                <td className="sticky left-0 z-10 bg-gray-800 px-4 py-3 text-sm text-gray-300 border-r border-gray-700">
                                    {week.week}
                                </td>
                                <td className="sticky left-12 z-10 bg-gray-800 px-4 py-3 text-sm font-medium text-gray-200 border-r border-gray-700">
                                    {week.weekLabel}
                                </td>

                                {/* Presentations */}
                                <td className="px-4 py-3">
                                    <Input
                                        type="number"
                                        min="0"
                                        value={week.presentations.committed || ""}
                                        onChange={(e) =>
                                            onUpdateCommitment(
                                                index,
                                                "presentations",
                                                Number(e.target.value)
                                            )
                                        }
                                        className="w-20 bg-gray-700 border-gray-600 text-gray-100 text-center"
                                    />
                                </td>
                                <td className="px-4 py-3 text-sm text-center text-gray-300">
                                    {week.presentations.achieved}
                                </td>
                                <td
                                    className={`px-4 py-3 text-sm text-center font-semibold border-r border-gray-700 ${
                                        week.presentations.surplus > 0
                                            ? "text-green-400"
                                            : week.presentations.surplus < 0
                                            ? "text-red-400"
                                            : "text-gray-400"
                                    }`}
                                >
                                    {week.presentations.surplus}
                                </td>

                                {/* Students */}
                                <td className="px-4 py-3">
                                    <Input
                                        type="number"
                                        min="0"
                                        value={week.students.committed || ""}
                                        onChange={(e) =>
                                            onUpdateCommitment(
                                                index,
                                                "students",
                                                Number(e.target.value)
                                            )
                                        }
                                        className="w-20 bg-gray-700 border-gray-600 text-gray-100 text-center"
                                    />
                                </td>
                                <td className="px-4 py-3 text-sm text-center text-gray-300">
                                    {week.students.achieved}
                                </td>
                                <td
                                    className={`px-4 py-3 text-sm text-center font-semibold border-r border-gray-700 ${
                                        week.students.surplus > 0
                                            ? "text-green-400"
                                            : week.students.surplus < 0
                                            ? "text-red-400"
                                            : "text-gray-400"
                                    }`}
                                >
                                    {week.students.surplus}
                                </td>

                                {/* Impact */}
                                <td className="px-4 py-3">
                                    <Input
                                        type="number"
                                        min="0"
                                        value={week.impact.committed || ""}
                                        onChange={(e) =>
                                            onUpdateCommitment(
                                                index,
                                                "impact",
                                                Number(e.target.value)
                                            )
                                        }
                                        className="w-20 bg-gray-700 border-gray-600 text-gray-100 text-center"
                                    />
                                </td>
                                <td className="px-4 py-3 text-sm text-center text-gray-300">
                                    {week.impact.achieved}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}