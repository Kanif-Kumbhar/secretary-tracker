"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ImpactFeedbackFormProps {
  totalParticipants: number;
  impactId: string;
}

export default function ImpactFeedbackForm({ totalParticipants, impactId }: ImpactFeedbackFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [responseCounts, setResponseCounts] = useState({
    q1_aware: 0,
    q1_somewhat: 0,
    q1_notReally: 0,
    q2_veryUseful: 0,
    q2_useful: 0,
    q2_okay: 0,
    q3_yes: 0,
    q3_maybe: 0,
    q3_no: 0,
  });

  const getQuestionTotal = (keys: string[]) => {
    return keys.reduce((sum, key) => sum + (responseCounts[key as keyof typeof responseCounts] || 0), 0);
  };

  const validateForm = () => {
    const errors: string[] = [];

    const questions = [
      { keys: ["q1_aware", "q1_somewhat", "q1_notReally"], label: "Q1" },
      { keys: ["q2_veryUseful", "q2_useful", "q2_okay"], label: "Q2" },
      { keys: ["q3_yes", "q3_maybe", "q3_no"], label: "Q3" },
    ];

    questions.forEach(({ keys, label }) => {
      const total = getQuestionTotal(keys);
      if (total !== totalParticipants) {
        errors.push(`${label}: Total responses (${total}) must equal ${totalParticipants} participants`);
      }
    });

    return errors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validateForm();

    if (errors.length > 0) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: (
          <div className="space-y-1">
            <p className="font-semibold">Please fix the following errors:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              {errors.map((error, idx) => (
                <li key={idx} className="text-sm">{error}</li>
              ))}
            </ul>
          </div>
        ),
        duration: 5000,
      });
      return;
    }

    startTransition(() => {
      const feedbackData = {
        impactId,
        totalParticipants,
        responseCounts,
      };
      console.log("Impact Feedback Data:", feedbackData);

      toast({
        title: "Success!",
        description: "Impact feedback submitted successfully",
        duration: 3000,
      });

      setTimeout(() => {
        router.push("/secretary/dashboard");
      }, 1000);
    });
  };

  const updateResponse = (key: string, value: number) => {
    setResponseCounts((prev) => ({
      ...prev,
      [key]: Math.max(0, Math.min(value, totalParticipants)),
    }));
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-100">Impact Activity Feedback</h1>
          <p className="text-gray-400 mt-2">
            Total Participants: <span className="text-orange-400 font-bold">{totalParticipants}</span>
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
          Enter the number of participants who raised their hands for each response option.
          <span className="text-orange-400 font-semibold"> Total for each question must equal {totalParticipants}.</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Feedback Questions */}
          <fieldset className="border border-blue-700 rounded-lg p-6 bg-blue-900/10">
            <legend className="text-lg font-semibold text-blue-400 px-3">Activity Feedback</legend>

            <div className="space-y-8 mt-4">
              {/* Q1 */}
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <Label className="text-base font-medium text-gray-200 block mb-3">
                  1. Are you aware of cyber safety now?
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { label: "Yes, fully aware", key: "q1_aware" },
                    { label: "Somewhat aware", key: "q1_somewhat" },
                    { label: "Not really", key: "q1_notReally" },
                  ].map(({ label, key }) => (
                    <div key={key}>
                      <Label className="text-gray-400 text-sm">{label}</Label>
                      <Input
                        type="number"
                        min="0"
                        max={totalParticipants}
                        value={responseCounts[key as keyof typeof responseCounts]}
                        onChange={(e) => updateResponse(key, Number(e.target.value))}
                        className="bg-gray-700 border-gray-600 text-gray-100 mt-1"
                      />
                    </div>
                  ))}
                </div>
                <p
                  className={`mt-2 text-sm ${
                    getQuestionTotal(["q1_aware", "q1_somewhat", "q1_notReally"]) === totalParticipants
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  Total: {getQuestionTotal(["q1_aware", "q1_somewhat", "q1_notReally"])} / {totalParticipants}
                  {getQuestionTotal(["q1_aware", "q1_somewhat", "q1_notReally"]) === totalParticipants && " ✓"}
                </p>
              </div>

              {/* Q2 */}
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <Label className="text-base font-medium text-gray-200 block mb-3">
                  2. How useful was this activity?
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { label: "Very useful", key: "q2_veryUseful" },
                    { label: "Useful", key: "q2_useful" },
                    { label: "Okay", key: "q2_okay" },
                  ].map(({ label, key }) => (
                    <div key={key}>
                      <Label className="text-gray-400 text-sm">{label}</Label>
                      <Input
                        type="number"
                        min="0"
                        max={totalParticipants}
                        value={responseCounts[key as keyof typeof responseCounts]}
                        onChange={(e) => updateResponse(key, Number(e.target.value))}
                        className="bg-gray-700 border-gray-600 text-gray-100 mt-1"
                      />
                    </div>
                  ))}
                </div>
                <p
                  className={`mt-2 text-sm ${
                    getQuestionTotal(["q2_veryUseful", "q2_useful", "q2_okay"]) === totalParticipants
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  Total: {getQuestionTotal(["q2_veryUseful", "q2_useful", "q2_okay"])} / {totalParticipants}
                  {getQuestionTotal(["q2_veryUseful", "q2_useful", "q2_okay"]) === totalParticipants && " ✓"}
                </p>
              </div>

              {/* Q3 */}
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <Label className="text-base font-medium text-gray-200 block mb-3">
                  3. Will you share this knowledge with others?
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { label: "Yes, definitely", key: "q3_yes" },
                    { label: "Maybe", key: "q3_maybe" },
                    { label: "No", key: "q3_no" },
                  ].map(({ label, key }) => (
                    <div key={key}>
                      <Label className="text-gray-400 text-sm">{label}</Label>
                      <Input
                        type="number"
                        min="0"
                        max={totalParticipants}
                        value={responseCounts[key as keyof typeof responseCounts]}
                        onChange={(e) => updateResponse(key, Number(e.target.value))}
                        className="bg-gray-700 border-gray-600 text-gray-100 mt-1"
                      />
                    </div>
                  ))}
                </div>
                <p
                  className={`mt-2 text-sm ${
                    getQuestionTotal(["q3_yes", "q3_maybe", "q3_no"]) === totalParticipants
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  Total: {getQuestionTotal(["q3_yes", "q3_maybe", "q3_no"])} / {totalParticipants}
                  {getQuestionTotal(["q3_yes", "q3_maybe", "q3_no"]) === totalParticipants && " ✓"}
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
                "Submit Feedback"
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