"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useFeedbackForm } from "@/hooks/secretary/presentation/useFeedbackForm";

interface FeedbackFormCollegeProps {
    totalStudents: number;
    presentationId: string;
}

const QUESTIONS = [
    { keys: ["q1_safeUsage", "q1_riskAware", "q1_notConcerned"], label: "Q1" },
    { keys: ["q2_strongPasswords", "q2_samePassword", "q2_saveBrowser"], label: "Q2" },
    { keys: ["q3_factCheck", "q3_forwardBlindly", "q3_ignoreAll"], label: "Q3" },
    { keys: ["q4_privacyControls", "q4_publicProfile", "q4_dontKnow"], label: "Q4" },
    { keys: ["p1_wontOvershare", "p1_maybeOvershare", "p1_noChange"], label: "Post-Q1" },
    { keys: ["p2_enable2FA", "p2_laterMaybe", "p2_tooComplex"], label: "Post-Q2" },
    { keys: ["p3_reportAbuse", "p3_muteBlock", "p3_ignore"], label: "Post-Q3" },
    { keys: ["p4_verifySources", "p4_askFriends", "p4_shareAnyway"], label: "Post-Q4" },
];

const INITIAL_COUNTS = {
    q1_safeUsage: 0,
    q1_riskAware: 0,
    q1_notConcerned: 0,
    q2_strongPasswords: 0,
    q2_samePassword: 0,
    q2_saveBrowser: 0,
    q3_factCheck: 0,
    q3_forwardBlindly: 0,
    q3_ignoreAll: 0,
    q4_privacyControls: 0,
    q4_publicProfile: 0,
    q4_dontKnow: 0,
    p1_wontOvershare: 0,
    p1_maybeOvershare: 0,
    p1_noChange: 0,
    p2_enable2FA: 0,
    p2_laterMaybe: 0,
    p2_tooComplex: 0,
    p3_reportAbuse: 0,
    p3_muteBlock: 0,
    p3_ignore: 0,
    p4_verifySources: 0,
    p4_askFriends: 0,
    p4_shareAnyway: 0,
};

export default function FeedbackFormCollege({
    totalStudents,
    presentationId,
}: FeedbackFormCollegeProps) {
    const router = useRouter();

    const {
        isPending,
        responseCounts,
        getQuestionTotal,
        updateResponse,
        handleSubmit,
    } = useFeedbackForm(
        totalStudents,
        presentationId,
        "college",
        QUESTIONS,
        INITIAL_COUNTS
    );

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-100">
                        Digital Behavior Survey - College Students
                    </h1>
                    <p className="text-gray-400 mt-2">
                        Total Students:{" "}
                        <span className="text-orange-400 font-bold">{totalStudents}</span>
                    </p>
                </div>
                <Button
                    onClick={() => router.back()}
                    variant="outline"
                    className="border-gray-600 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                    ← Back
                </Button>
            </div>

            <div className="bg-gray-900 rounded-2xl shadow-2xl p-8 border border-gray-700">
                <p className="text-gray-300 mb-6">
                    Cyber Warriors will conduct this survey orally. Students respond by
                    raising hands.
                    <span className="text-orange-400 font-semibold">
                        {" "}
                        Total for each question must equal {totalStudents}.
                    </span>
                </p>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Pre-Survey */}
                    <fieldset className="border border-green-700 rounded-lg p-6 bg-green-900/10">
                        <legend className="text-lg font-semibold text-green-400 px-3">
                            ✅ Pre-Survey (Before Session)
                        </legend>

                        <div className="space-y-8 mt-4">
                            {/* Q1 */}
                            <div className="bg-gray-800/50 p-4 rounded-lg">
                                <Label className="text-base font-medium text-gray-200 block mb-3">
                                    1. How do you see your daily online behaviour?
                                </Label>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {[
                                        {
                                            label: "Mostly safe & balanced",
                                            key: "q1_safeUsage",
                                        },
                                        {
                                            label: "Aware but still take risks",
                                            key: "q1_riskAware",
                                        },
                                        {
                                            label: "Not really concerned",
                                            key: "q1_notConcerned",
                                        },
                                    ].map(({ label, key }) => (
                                        <div key={key}>
                                            <Label className="text-gray-400 text-sm">{label}</Label>
                                            <Input
                                                type="number"
                                                min="0"
                                                max={totalStudents}
                                                value={responseCounts[key]}
                                                onChange={(e) =>
                                                    updateResponse(
                                                        key,
                                                        Number(e.target.value),
                                                        ["q1_safeUsage", "q1_riskAware", "q1_notConcerned"]
                                                    )
                                                }
                                                className="bg-gray-700 border-gray-600 text-gray-100 mt-1"
                                            />
                                        </div>
                                    ))}
                                </div>
                                <p
                                    className={`mt-2 text-sm ${
                                        getQuestionTotal([
                                            "q1_safeUsage",
                                            "q1_riskAware",
                                            "q1_notConcerned",
                                        ]) === totalStudents
                                            ? "text-green-400"
                                            : "text-red-400"
                                    }`}
                                >
                                    Total:{" "}
                                    {getQuestionTotal([
                                        "q1_safeUsage",
                                        "q1_riskAware",
                                        "q1_notConcerned",
                                    ])}{" "}
                                    / {totalStudents}
                                    {getQuestionTotal([
                                        "q1_safeUsage",
                                        "q1_riskAware",
                                        "q1_notConcerned",
                                    ]) === totalStudents && " ✓"}
                                </p>
                            </div>

                            {/* Q2 */}
                            <div className="bg-gray-800/50 p-4 rounded-lg">
                                <Label className="text-base font-medium text-gray-200 block mb-3">
                                    2. Your current password habits:
                                </Label>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {[
                                        {
                                            label: "Unique & strong passwords",
                                            key: "q2_strongPasswords",
                                        },
                                        {
                                            label: "Same password everywhere",
                                            key: "q2_samePassword",
                                        },
                                        {
                                            label: "Saved in browser/device",
                                            key: "q2_saveBrowser",
                                        },
                                    ].map(({ label, key }) => (
                                        <div key={key}>
                                            <Label className="text-gray-400 text-sm">{label}</Label>
                                            <Input
                                                type="number"
                                                min="0"
                                                max={totalStudents}
                                                value={responseCounts[key]}
                                                onChange={(e) =>
                                                    updateResponse(
                                                        key,
                                                        Number(e.target.value),
                                                        ["q2_strongPasswords", "q2_samePassword", "q2_saveBrowser"]
                                                    )
                                                }
                                                className="bg-gray-700 border-gray-600 text-gray-100 mt-1"
                                            />
                                        </div>
                                    ))}
                                </div>
                                <p
                                    className={`mt-2 text-sm ${
                                        getQuestionTotal([
                                            "q2_strongPasswords",
                                            "q2_samePassword",
                                            "q2_saveBrowser",
                                        ]) === totalStudents
                                            ? "text-green-400"
                                            : "text-red-400"
                                    }`}
                                >
                                    Total:{" "}
                                    {getQuestionTotal([
                                        "q2_strongPasswords",
                                        "q2_samePassword",
                                        "q2_saveBrowser",
                                    ])}{" "}
                                    / {totalStudents}
                                    {getQuestionTotal([
                                        "q2_strongPasswords",
                                        "q2_samePassword",
                                        "q2_saveBrowser",
                                    ]) === totalStudents && " ✓"}
                                </p>
                            </div>

                            {/* Q3 */}
                            <div className="bg-gray-800/50 p-4 rounded-lg">
                                <Label className="text-base font-medium text-gray-200 block mb-3">
                                    3. When you receive sensational news or forwards:
                                </Label>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {[
                                        {
                                            label: "I fact-check before sharing",
                                            key: "q3_factCheck",
                                        },
                                        {
                                            label: "Forward without checking",
                                            key: "q3_forwardBlindly",
                                        },
                                        { label: "Ignore everything", key: "q3_ignoreAll" },
                                    ].map(({ label, key }) => (
                                        <div key={key}>
                                            <Label className="text-gray-400 text-sm">{label}</Label>
                                            <Input
                                                type="number"
                                                min="0"
                                                max={totalStudents}
                                                value={responseCounts[key]}
                                                onChange={(e) =>
                                                    updateResponse(
                                                        key,
                                                        Number(e.target.value),
                                                        ["q3_factCheck", "q3_forwardBlindly", "q3_ignoreAll"]
                                                    )
                                                }
                                                className="bg-gray-700 border-gray-600 text-gray-100 mt-1"
                                            />
                                        </div>
                                    ))}
                                </div>
                                <p
                                    className={`mt-2 text-sm ${
                                        getQuestionTotal([
                                            "q3_factCheck",
                                            "q3_forwardBlindly",
                                            "q3_ignoreAll",
                                        ]) === totalStudents
                                            ? "text-green-400"
                                            : "text-red-400"
                                    }`}
                                >
                                    Total:{" "}
                                    {getQuestionTotal([
                                        "q3_factCheck",
                                        "q3_forwardBlindly",
                                        "q3_ignoreAll",
                                    ])}{" "}
                                    / {totalStudents}
                                    {getQuestionTotal([
                                        "q3_factCheck",
                                        "q3_forwardBlindly",
                                        "q3_ignoreAll",
                                    ]) === totalStudents && " ✓"}
                                </p>
                            </div>

                            {/* Q4 */}
                            <div className="bg-gray-800/50 p-4 rounded-lg">
                                <Label className="text-base font-medium text-gray-200 block mb-3">
                                    4. Social media privacy settings:
                                </Label>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {[
                                        {
                                            label: "I use privacy controls actively",
                                            key: "q4_privacyControls",
                                        },
                                        {
                                            label: "My profile is mostly public",
                                            key: "q4_publicProfile",
                                        },
                                        {
                                            label: "Don't know how to adjust",
                                            key: "q4_dontKnow",
                                        },
                                    ].map(({ label, key }) => (
                                        <div key={key}>
                                            <Label className="text-gray-400 text-sm">{label}</Label>
                                            <Input
                                                type="number"
                                                min="0"
                                                max={totalStudents}
                                                value={responseCounts[key]}
                                                onChange={(e) =>
                                                    updateResponse(
                                                        key,
                                                        Number(e.target.value),
                                                        ["q4_privacyControls", "q4_publicProfile", "q4_dontKnow"]
                                                    )
                                                }
                                                className="bg-gray-700 border-gray-600 text-gray-100 mt-1"
                                            />
                                        </div>
                                    ))}
                                </div>
                                <p
                                    className={`mt-2 text-sm ${
                                        getQuestionTotal([
                                            "q4_privacyControls",
                                            "q4_publicProfile",
                                            "q4_dontKnow",
                                        ]) === totalStudents
                                            ? "text-green-400"
                                            : "text-red-400"
                                    }`}
                                >
                                    Total:{" "}
                                    {getQuestionTotal([
                                        "q4_privacyControls",
                                        "q4_publicProfile",
                                        "q4_dontKnow",
                                    ])}{" "}
                                    / {totalStudents}
                                    {getQuestionTotal([
                                        "q4_privacyControls",
                                        "q4_publicProfile",
                                        "q4_dontKnow",
                                    ]) === totalStudents && " ✓"}
                                </p>
                            </div>
                        </div>
                    </fieldset>

                    {/* Post-Survey */}
                    <fieldset className="border border-blue-700 rounded-lg p-6 bg-blue-900/10">
                        <legend className="text-lg font-semibold text-blue-400 px-3">
                            ✅ Post-Survey (After Session)
                        </legend>

                        <div className="space-y-8 mt-4">
                            {/* P1 */}
                            <div className="bg-gray-800/50 p-4 rounded-lg">
                                <Label className="text-base font-medium text-gray-200 block mb-3">
                                    1. After today&apos;s session, will you rethink what you share
                                    online?
                                </Label>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {[
                                        {
                                            label: "Yes, won't overshare anymore",
                                            key: "p1_wontOvershare",
                                        },
                                        {
                                            label: "Maybe, but I'll see",
                                            key: "p1_maybeOvershare",
                                        },
                                        {
                                            label: "No change needed for me",
                                            key: "p1_noChange",
                                        },
                                    ].map(({ label, key }) => (
                                        <div key={key}>
                                            <Label className="text-gray-400 text-sm">{label}</Label>
                                            <Input
                                                type="number"
                                                min="0"
                                                max={totalStudents}
                                                value={responseCounts[key]}
                                                onChange={(e) =>
                                                    updateResponse(
                                                        key,
                                                        Number(e.target.value),
                                                        ["p1_wontOvershare", "p1_maybeOvershare", "p1_noChange"]
                                                    )
                                                }
                                                className="bg-gray-700 border-gray-600 text-gray-100 mt-1"
                                            />
                                        </div>
                                    ))}
                                </div>
                                <p
                                    className={`mt-2 text-sm ${
                                        getQuestionTotal([
                                            "p1_wontOvershare",
                                            "p1_maybeOvershare",
                                            "p1_noChange",
                                        ]) === totalStudents
                                            ? "text-green-400"
                                            : "text-red-400"
                                    }`}
                                >
                                    Total:{" "}
                                    {getQuestionTotal([
                                        "p1_wontOvershare",
                                        "p1_maybeOvershare",
                                        "p1_noChange",
                                    ])}{" "}
                                    / {totalStudents}
                                    {getQuestionTotal([
                                        "p1_wontOvershare",
                                        "p1_maybeOvershare",
                                        "p1_noChange",
                                    ]) === totalStudents && " ✓"}
                                </p>
                            </div>

                            {/* P2 */}
                            <div className="bg-gray-800/50 p-4 rounded-lg">
                                <Label className="text-base font-medium text-gray-200 block mb-3">
                                    2. Will you implement stronger password security & 2FA now?
                                </Label>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {[
                                        {
                                            label: "Yes, will enable 2FA & strong passwords",
                                            key: "p2_enable2FA",
                                        },
                                        { label: "Maybe later", key: "p2_laterMaybe" },
                                        {
                                            label: "Too complex for me",
                                            key: "p2_tooComplex",
                                        },
                                    ].map(({ label, key }) => (
                                        <div key={key}>
                                            <Label className="text-gray-400 text-sm">{label}</Label>
                                            <Input
                                                type="number"
                                                min="0"
                                                max={totalStudents}
                                                value={responseCounts[key]}
                                                onChange={(e) =>
                                                    updateResponse(
                                                        key,
                                                        Number(e.target.value),
                                                        ["p2_enable2FA", "p2_laterMaybe", "p2_tooComplex"]
                                                    )
                                                }
                                                className="bg-gray-700 border-gray-600 text-gray-100 mt-1"
                                            />
                                        </div>
                                    ))}
                                </div>
                                <p
                                    className={`mt-2 text-sm ${
                                        getQuestionTotal([
                                            "p2_enable2FA",
                                            "p2_laterMaybe",
                                            "p2_tooComplex",
                                        ]) === totalStudents
                                            ? "text-green-400"
                                            : "text-red-400"
                                    }`}
                                >
                                    Total:{" "}
                                    {getQuestionTotal([
                                        "p2_enable2FA",
                                        "p2_laterMaybe",
                                        "p2_tooComplex",
                                    ])}{" "}
                                    / {totalStudents}
                                    {getQuestionTotal([
                                        "p2_enable2FA",
                                        "p2_laterMaybe",
                                        "p2_tooComplex",
                                    ]) === totalStudents && " ✓"}
                                </p>
                            </div>

                            {/* P3 */}
                            <div className="bg-gray-800/50 p-4 rounded-lg">
                                <Label className="text-base font-medium text-gray-200 block mb-3">
                                    3. If you encounter cyberbullying or harassment, what will you
                                    do?
                                </Label>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {[
                                        {
                                            label: "Report it immediately",
                                            key: "p3_reportAbuse",
                                        },
                                        { label: "Mute/block the person", key: "p3_muteBlock" },
                                        { label: "Ignore and move on", key: "p3_ignore" },
                                    ].map(({ label, key }) => (
                                        <div key={key}>
                                            <Label className="text-gray-400 text-sm">{label}</Label>
                                            <Input
                                                type="number"
                                                min="0"
                                                max={totalStudents}
                                                value={responseCounts[key]}
                                                onChange={(e) =>
                                                    updateResponse(
                                                        key,
                                                        Number(e.target.value),
                                                        ["p3_reportAbuse", "p3_muteBlock", "p3_ignore"]
                                                    )
                                                }
                                                className="bg-gray-700 border-gray-600 text-gray-100 mt-1"
                                            />
                                        </div>
                                    ))}
                                </div>
                                <p
                                    className={`mt-2 text-sm ${
                                        getQuestionTotal([
                                            "p3_reportAbuse",
                                            "p3_muteBlock",
                                            "p3_ignore",
                                        ]) === totalStudents
                                            ? "text-green-400"
                                            : "text-red-400"
                                    }`}
                                >
                                    Total:{" "}
                                    {getQuestionTotal([
                                        "p3_reportAbuse",
                                        "p3_muteBlock",
                                        "p3_ignore",
                                    ])}{" "}
                                    / {totalStudents}
                                    {getQuestionTotal([
                                        "p3_reportAbuse",
                                        "p3_muteBlock",
                                        "p3_ignore",
                                    ]) === totalStudents && " ✓"}
                                </p>
                            </div>

                            {/* P4 */}
                            <div className="bg-gray-800/50 p-4 rounded-lg">
                                <Label className="text-base font-medium text-gray-200 block mb-3">
                                    4. Going forward, how will you handle viral/sensational
                                    content?
                                </Label>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {[
                                        {
                                            label: "Verify sources before sharing",
                                            key: "p4_verifySources",
                                        },
                                        {
                                            label: "Ask friends if it's real",
                                            key: "p4_askFriends",
                                        },
                                        {
                                            label: "Share anyway if it's interesting",
                                            key: "p4_shareAnyway",
                                        },
                                    ].map(({ label, key }) => (
                                        <div key={key}>
                                            <Label className="text-gray-400 text-sm">{label}</Label>
                                            <Input
                                                type="number"
                                                min="0"
                                                max={totalStudents}
                                                value={responseCounts[key]}
                                                onChange={(e) =>
                                                    updateResponse(
                                                        key,
                                                        Number(e.target.value),
                                                        ["p4_verifySources", "p4_askFriends", "p4_shareAnyway"]
                                                    )
                                                }
                                                className="bg-gray-700 border-gray-600 text-gray-100 mt-1"
                                            />
                                        </div>
                                    ))}
                                </div>
                                <p
                                    className={`mt-2 text-sm ${
                                        getQuestionTotal([
                                            "p4_verifySources",
                                            "p4_askFriends",
                                            "p4_shareAnyway",
                                        ]) === totalStudents
                                            ? "text-green-400"
                                            : "text-red-400"
                                    }`}
                                >
                                    Total:{" "}
                                    {getQuestionTotal([
                                        "p4_verifySources",
                                        "p4_askFriends",
                                        "p4_shareAnyway",
                                    ])}{" "}
                                    / {totalStudents}
                                    {getQuestionTotal([
                                        "p4_verifySources",
                                        "p4_askFriends",
                                        "p4_shareAnyway",
                                    ]) === totalStudents && " ✓"}
                                </p>
                            </div>
                        </div>
                    </fieldset>

                    {/* Submit */}
                    <div className="flex gap-4">
                        <Button
                            type="submit"
                            disabled={isPending}
                            className="flex-1 py-4 font-semibold text-white rounded-lg shadow-md bg-orange-500 hover:bg-orange-600"
                        >
                            {isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Submitting...
                                </>
                            ) : (
                                "Submit Survey"
                            )}
                        </Button>
                        <Button
                            type="button"
                            onClick={() => router.back()}
                            variant="outline"
                            className="px-8 py-4 border-gray-600 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}