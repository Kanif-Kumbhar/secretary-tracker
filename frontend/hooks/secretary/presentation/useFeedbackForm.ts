"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type ResponseCounts = Record<string, number>;

interface Question {
    keys: string[];
    label: string;
}

export function useFeedbackForm(
    totalStudents: number,
    presentationId: string,
    classGroup: string,
    questions: Question[],
    initialCounts: ResponseCounts
) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [responseCounts, setResponseCounts] = useState<ResponseCounts>(initialCounts);

    const getQuestionTotal = (keys: string[]) => {
        return keys.reduce((sum, key) => sum + (responseCounts[key] || 0), 0);
    };

    const validateForm = () => {
        const errors: string[] = [];

        questions.forEach(({ keys, label }) => {
            const total = getQuestionTotal(keys);
            if (total !== totalStudents) {
                errors.push(`${label}: ${total}/${totalStudents}`);
            }
        });

        return errors;
    };

    const updateResponse = (
        key: string,
        rawValue: number,
        groupKeys: string[]
    ) => {
        const safeValue = isNaN(rawValue) ? 0 : Math.max(0, rawValue);

        setResponseCounts((prev) => {
            const currentGroupTotal = groupKeys.reduce(
                (sum, k) => sum + (k === key ? 0 : prev[k] || 0),
                0
            );

            const remaining = Math.max(0, totalStudents - currentGroupTotal);
            const finalValue = Math.min(safeValue, remaining);

            return {
                ...prev,
                [key]: finalValue,
            };
        });
    };

    const handleSubmit = (e: React.FormEvent, additionalData?: any) => {
        e.preventDefault();

        const errors = validateForm();

        if (errors.length > 0) {
            toast.error(
                `Please correct: ${errors.join(", ")}. Each must total ${totalStudents}.`,
                {
                    duration: 4000,
                    position: "top-center",
                }
            );
            return;
        }

        startTransition(async () => {
            const feedbackData = {
                presentationId,
                totalStudents,
                responseCounts,
                classGroup,
                ...additionalData,
            };

            console.log("Feedback Data:", feedbackData);

            // TODO: Backend team - API integration
            // const response = await fetch("/api/secretary/feedback", {
            //   method: "POST",
            //   headers: { "Content-Type": "application/json" },
            //   body: JSON.stringify(feedbackData),
            // });

            toast.success("Survey submitted successfully!", {
                duration: 3000,
                position: "top-center",
            });

            setTimeout(() => {
                router.push("/secretary/dashboard");
            }, 1000);
        });
    };

    return {
        isPending,
        responseCounts,
        getQuestionTotal,
        updateResponse,
        handleSubmit,
    };
}