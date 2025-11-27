"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useFeedbackForm } from "@/hooks/secretary/presentation/useFeedbackForm";

interface FeedbackForm8_10Props {
    totalStudents: number;
    presentationId: string;
}

const QUESTIONS = [
    { keys: ["q1_acceptKnown", "q1_addNew", "q1_ignoreSometimes"], label: "Q1" },
    { keys: ["q2_unique", "q2_sameAll", "q2_simple"], label: "Q2" },
    { keys: ["q3_never", "q3_sometimes", "q3_withoutThinking"], label: "Q3" },
    { keys: ["q4_secureApp", "q4_parentPhone", "q4_dontCheck"], label: "Q4" },
    { keys: ["p1_dontAccept", "p1_mightAccept", "p1_askAdult"], label: "Post-Q1" },
    { keys: ["p2_strong2FA", "p2_tryLater", "p2_complicated"], label: "Post-Q2" },
    { keys: ["p3_neverAgain", "p3_stillLearning", "p3_notBigDeal"], label: "Post-Q3" },
    { keys: ["p4_doubleCheck", "p4_askTrusted", "p4_sameBefore"], label: "Post-Q4" },
];

const INITIAL_COUNTS = {
    q1_acceptKnown: 0,
    q1_addNew: 0,
    q1_ignoreSometimes: 0,
    q2_unique: 0,
    q2_sameAll: 0,
    q2_simple: 0,
    q3_never: 0,
    q3_sometimes: 0,
    q3_withoutThinking: 0,
    q4_secureApp: 0,
    q4_parentPhone: 0,
    q4_dontCheck: 0,
    p1_dontAccept: 0,
    p1_mightAccept: 0,
    p1_askAdult: 0,
    p2_strong2FA: 0,
    p2_tryLater: 0,
    p2_complicated: 0,
    p3_neverAgain: 0,
    p3_stillLearning: 0,
    p3_notBigDeal: 0,
    p4_doubleCheck: 0,
    p4_askTrusted: 0,
    p4_sameBefore: 0,
};

export default function FeedbackForm8_10({
    totalStudents,
    presentationId,
}: FeedbackForm8_10Props) {
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
        "8-10",
        QUESTIONS,
        INITIAL_COUNTS
    );

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-100">
                        Digital Behavior Survey - STD 8-10
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
                    The survey will be conducted orally by our Cyber Warriors. Students will
                    respond by raising their hands.
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
                                    1. Unknown person sends a game/message -- what do you do?
                                </Label>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {[
                                        {
                                            label: "Accept only if I know them",
                                            key: "q1_acceptKnown",
                                        },
                                        { label: "I add new people -- it's fun", key: "q1_addNew" },
                                        {
                                            label: "I ignore -- but not always",
                                            key: "q1_ignoreSometimes",
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
                                                        ["q1_acceptKnown", "q1_addNew", "q1_ignoreSometimes"]
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
                                            "q1_acceptKnown",
                                            "q1_addNew",
                                            "q1_ignoreSometimes",
                                        ]) === totalStudents
                                            ? "text-green-400"
                                            : "text-red-400"
                                    }`}
                                >
                                    Total:{" "}
                                    {getQuestionTotal([
                                        "q1_acceptKnown",
                                        "q1_addNew",
                                        "q1_ignoreSometimes",
                                    ])}{" "}
                                    / {totalStudents}
                                    {getQuestionTotal([
                                        "q1_acceptKnown",
                                        "q1_addNew",
                                        "q1_ignoreSometimes",
                                    ]) === totalStudents && " ✓"}
                                </p>
                            </div>

                            {/* Q2 */}
                            <div className="bg-gray-800/50 p-4 rounded-lg">
                                <Label className="text-base font-medium text-gray-200 block mb-3">
                                    2. Your password style?
                                </Label>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {[
                                        { label: "Unique for every app", key: "q2_unique" },
                                        {
                                            label: "Same for all -- easy to remember",
                                            key: "q2_sameAll",
                                        },
                                        {
                                            label: "Simple one -- I forget anyway",
                                            key: "q2_simple",
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
                                                        ["q2_unique", "q2_sameAll", "q2_simple"]
                                                    )
                                                }
                                                className="bg-gray-700 border-gray-600 text-gray-100 mt-1"
                                            />
                                        </div>
                                    ))}
                                </div>
                                <p
                                    className={`mt-2 text-sm ${
                                        getQuestionTotal(["q2_unique", "q2_sameAll", "q2_simple"]) ===
                                        totalStudents
                                            ? "text-green-400"
                                            : "text-red-400"
                                    }`}
                                >
                                    Total:{" "}
                                    {getQuestionTotal(["q2_unique", "q2_sameAll", "q2_simple"])} /{" "}
                                    {totalStudents}
                                    {getQuestionTotal(["q2_unique", "q2_sameAll", "q2_simple"]) ===
                                        totalStudents && " ✓"}
                                </p>
                            </div>

                            {/* Q3 */}
                            <div className="bg-gray-800/50 p-4 rounded-lg">
                                <Label className="text-base font-medium text-gray-200 block mb-3">
                                    3. Friend shares funny link or asks for OTP -- your action?
                                </Label>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {[
                                        { label: "Never click/share", key: "q3_never" },
                                        { label: "Sometimes I check", key: "q3_sometimes" },
                                        {
                                            label: "Click without thinking",
                                            key: "q3_withoutThinking",
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
                                                        ["q3_never", "q3_sometimes", "q3_withoutThinking"]
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
                                            "q3_never",
                                            "q3_sometimes",
                                            "q3_withoutThinking",
                                        ]) === totalStudents
                                            ? "text-green-400"
                                            : "text-red-400"
                                    }`}
                                >
                                    Total:{" "}
                                    {getQuestionTotal([
                                        "q3_never",
                                        "q3_sometimes",
                                        "q3_withoutThinking",
                                    ])}{" "}
                                    / {totalStudents}
                                    {getQuestionTotal([
                                        "q3_never",
                                        "q3_sometimes",
                                        "q3_withoutThinking",
                                    ]) === totalStudents && " ✓"}
                                </p>
                            </div>

                            {/* Q4 */}
                            <div className="bg-gray-800/50 p-4 rounded-lg">
                                <Label className="text-base font-medium text-gray-200 block mb-3">
                                    4. Downloading apps -- how do you pick?
                                </Label>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {[
                                        { label: "Secure app stores only", key: "q4_secureApp" },
                                        { label: "From parent's phone", key: "q4_parentPhone" },
                                        { label: "Don't really check", key: "q4_dontCheck" },
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
                                                        ["q4_secureApp", "q4_parentPhone", "q4_dontCheck"]
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
                                            "q4_secureApp",
                                            "q4_parentPhone",
                                            "q4_dontCheck",
                                        ]) === totalStudents
                                            ? "text-green-400"
                                            : "text-red-400"
                                    }`}
                                >
                                    Total:{" "}
                                    {getQuestionTotal([
                                        "q4_secureApp",
                                        "q4_parentPhone",
                                        "q4_dontCheck",
                                    ])}{" "}
                                    / {totalStudents}
                                    {getQuestionTotal([
                                        "q4_secureApp",
                                        "q4_parentPhone",
                                        "q4_dontCheck",
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
                                    1. Stranger sends game link -- now what?
                                </Label>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {[
                                        { label: "Don't accept at all", key: "p1_dontAccept" },
                                        {
                                            label: "Might accept if it looks fun",
                                            key: "p1_mightAccept",
                                        },
                                        { label: "Ask an adult first", key: "p1_askAdult" },
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
                                                        ["p1_dontAccept", "p1_mightAccept", "p1_askAdult"]
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
                                            "p1_dontAccept",
                                            "p1_mightAccept",
                                            "p1_askAdult",
                                        ]) === totalStudents
                                            ? "text-green-400"
                                            : "text-red-400"
                                    }`}
                                >
                                    Total:{" "}
                                    {getQuestionTotal([
                                        "p1_dontAccept",
                                        "p1_mightAccept",
                                        "p1_askAdult",
                                    ])}{" "}
                                    / {totalStudents}
                                    {getQuestionTotal([
                                        "p1_dontAccept",
                                        "p1_mightAccept",
                                        "p1_askAdult",
                                    ]) === totalStudents && " ✓"}
                                </p>
                            </div>

                            {/* P2 */}
                            <div className="bg-gray-800/50 p-4 rounded-lg">
                                <Label className="text-base font-medium text-gray-200 block mb-3">
                                    2. What&apos;s your plan for password security going forward?
                                </Label>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {[
                                        { label: "Strong + 2FA", key: "p2_strong2FA" },
                                        { label: "I'll try...later", key: "p2_tryLater" },
                                        {
                                            label: "Seems complicated",
                                            key: "p2_complicated",
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
                                                        ["p2_strong2FA", "p2_tryLater", "p2_complicated"]
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
                                            "p2_strong2FA",
                                            "p2_tryLater",
                                            "p2_complicated",
                                        ]) === totalStudents
                                            ? "text-green-400"
                                            : "text-red-400"
                                    }`}
                                >
                                    Total:{" "}
                                    {getQuestionTotal([
                                        "p2_strong2FA",
                                        "p2_tryLater",
                                        "p2_complicated",
                                    ])}{" "}
                                    / {totalStudents}
                                    {getQuestionTotal([
                                        "p2_strong2FA",
                                        "p2_tryLater",
                                        "p2_complicated",
                                    ]) === totalStudents && " ✓"}
                                </p>
                            </div>

                            {/* P3 */}
                            <div className="bg-gray-800/50 p-4 rounded-lg">
                                <Label className="text-base font-medium text-gray-200 block mb-3">
                                    3. Link from friend / OTP request -- what now?
                                </Label>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {[
                                        { label: "Never again", key: "p3_neverAgain" },
                                        { label: "Still learning", key: "p3_stillLearning" },
                                        { label: "Not a big deal", key: "p3_notBigDeal" },
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
                                                        ["p3_neverAgain", "p3_stillLearning", "p3_notBigDeal"]
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
                                            "p3_neverAgain",
                                            "p3_stillLearning",
                                            "p3_notBigDeal",
                                        ]) === totalStudents
                                            ? "text-green-400"
                                            : "text-red-400"
                                    }`}
                                >
                                    Total:{" "}
                                    {getQuestionTotal([
                                        "p3_neverAgain",
                                        "p3_stillLearning",
                                        "p3_notBigDeal",
                                    ])}{" "}
                                    / {totalStudents}
                                    {getQuestionTotal([
                                        "p3_neverAgain",
                                        "p3_stillLearning",
                                        "p3_notBigDeal",
                                    ]) === totalStudents && " ✓"}
                                </p>
                            </div>

                            {/* P4 */}
                            <div className="bg-gray-800/50 p-4 rounded-lg">
                                <Label className="text-base font-medium text-gray-200 block mb-3">
                                    4. App downloads going forward?
                                </Label>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {[
                                        { label: "Double check everything", key: "p4_doubleCheck" },
                                        { label: "Ask a trusted adult", key: "p4_askTrusted" },
                                        { label: "Same as before", key: "p4_sameBefore" },
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
                                                        ["p4_doubleCheck", "p4_askTrusted", "p4_sameBefore"]
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
                                            "p4_doubleCheck",
                                            "p4_askTrusted",
                                            "p4_sameBefore",
                                        ]) === totalStudents
                                            ? "text-green-400"
                                            : "text-red-400"
                                    }`}
                                >
                                    Total:{" "}
                                    {getQuestionTotal([
                                        "p4_doubleCheck",
                                        "p4_askTrusted",
                                        "p4_sameBefore",
                                    ])}{" "}
                                    / {totalStudents}
                                    {getQuestionTotal([
                                        "p4_doubleCheck",
                                        "p4_askTrusted",
                                        "p4_sameBefore",
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