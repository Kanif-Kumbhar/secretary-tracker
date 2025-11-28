"use client";

import { useState } from "react";
import { differenceInWeeks, parse, startOfWeek, endOfWeek, isWithinInterval, isBefore, addWeeks, startOfDay } from "date-fns";

export type WeekStatus = "past" | "current" | "upcoming" | "future";

export interface WeekData {
    week: number;
    startDate: Date;
    endDate: Date;
    status: WeekStatus;
    presentations: {
        committed: number;
        achieved: number;
        surplus: number;
    };
    students: {
        committed: number;
        achieved: number;
        surplus: number;
    };
    impact: {
        committed: number;
        achieved: number;
        surplus: number;
    };
    isSaved: boolean;
}

export function useExecutionPlan() {
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const [showModal, setShowModal] = useState(true);
    const [weeks, setWeeks] = useState<WeekData[]>([]);

    const calculateWeekStatus = (weekStartDate: Date, weekEndDate: Date, isSaved: boolean): WeekStatus => {
        const today = startOfDay(new Date());
        const weekStart = startOfDay(weekStartDate);
        const weekEnd = startOfDay(weekEndDate);

        // If already saved and week has ended, it's past
        if (isSaved && isBefore(weekEnd, today)) {
            return "past";
        }

        // Check if today is within this week
        if (isWithinInterval(today, { start: weekStart, end: weekEnd })) {
            return "current";
        }

        // Check if this week is in the past
        if (isBefore(weekEnd, today)) {
            return "past";
        }

        // Get the current week's end date
        const currentWeekEnd = endOfWeek(today, { weekStartsOn: 1 });
        const nextWeekStart = startOfDay(addWeeks(currentWeekEnd, 1));
        const nextWeekEnd = endOfWeek(nextWeekStart, { weekStartsOn: 1 });

        // Check if this week is the next week
        if (isWithinInterval(weekStart, { start: nextWeekStart, end: nextWeekEnd })) {
            return "upcoming";
        }

        // Future weeks
        return "future";
    };

    const calculateWeeks = () => {
        if (!startDate || !endDate) return;

        const start = parse(startDate, "yyyy-MM-dd", new Date());
        const end = parse(endDate, "yyyy-MM-dd", new Date());
        const totalWeeks = differenceInWeeks(end, start) + 1;

        const weeksData: WeekData[] = [];
        for (let i = 0; i < totalWeeks; i++) {
            const weekStart = addWeeks(start, i);
            const weekEnd = endOfWeek(weekStart, { weekStartsOn: 1 });
            
            weeksData.push({
                week: i + 1,
                startDate: weekStart,
                endDate: weekEnd,
                status: calculateWeekStatus(weekStart, weekEnd, false),
                presentations: { committed: 0, achieved: 0, surplus: 0 },
                students: { committed: 0, achieved: 0, surplus: 0 },
                impact: { committed: 0, achieved: 0, surplus: 0 },
                isSaved: false,
            });
        }
        setWeeks(weeksData);
    };

    const updateCommitment = (
        weekIndex: number,
        category: "presentations" | "students" | "impact",
        value: number
    ) => {
        setWeeks((prev) => {
            const updated = [...prev];
            const week = updated[weekIndex];

            // Only allow editing if week is current or upcoming
            if (week.status !== "current" && week.status !== "upcoming") {
                return prev;
            }

            // If already saved, don't allow changes
            if (week.isSaved) {
                return prev;
            }

            updated[weekIndex][category].committed = value;
            updated[weekIndex][category].surplus =
                updated[weekIndex][category].achieved -
                updated[weekIndex][category].committed;
            
            return updated;
        });
    };

    const saveWeekCommitment = (weekIndex: number) => {
        setWeeks((prev) => {
            const updated = [...prev];
            const week = updated[weekIndex];

            // Validate that at least one commitment is set
            if (
                week.presentations.committed === 0 &&
                week.students.committed === 0 &&
                week.impact.committed === 0
            ) {
                return prev;
            }

            // Only save if current or upcoming
            if (week.status === "current" || week.status === "upcoming") {
                updated[weekIndex].isSaved = true;
                
                // Recalculate status for all weeks
                updated.forEach((w, idx) => {
                    updated[idx].status = calculateWeekStatus(
                        w.startDate,
                        w.endDate,
                        updated[idx].isSaved
                    );
                });
            }

            return updated;
        });
    };

    const handleStartPlan = () => {
        if (!startDate || !endDate) return;
        calculateWeeks();
        setShowModal(false);
    };

    const getTotals = () => {
        return weeks.reduce(
            (acc, week) => ({
                presentations: {
                    committed: acc.presentations.committed + week.presentations.committed,
                    achieved: acc.presentations.achieved + week.presentations.achieved,
                    surplus: acc.presentations.surplus + week.presentations.surplus,
                },
                students: {
                    committed: acc.students.committed + week.students.committed,
                    achieved: acc.students.achieved + week.students.achieved,
                    surplus: acc.students.surplus + week.students.surplus,
                },
                impact: {
                    committed: acc.impact.committed + week.impact.committed,
                    achieved: acc.impact.achieved + week.impact.achieved,
                    surplus: acc.impact.surplus + week.impact.surplus,
                },
            }),
            {
                presentations: { committed: 0, achieved: 0, surplus: 0 },
                students: { committed: 0, achieved: 0, surplus: 0 },
                impact: { committed: 0, achieved: 0, surplus: 0 },
            }
        );
    };

    return {
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        showModal,
        weeks,
        handleStartPlan,
        updateCommitment,
        saveWeekCommitment,
        getTotals,
    };
}