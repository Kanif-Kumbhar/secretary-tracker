"use client";

import { useParams, useSearchParams } from "next/navigation";
import ImpactFeedbackForm from "@/components/secretary/impact/ImpactFeedbackForm";

export default function ImpactFeedbackPage() {
  const params = useParams();
  const searchParams = useSearchParams();

  const impactId = params.impactId as string;
  const totalParticipants = Number(searchParams.get("participants"));

  if (!totalParticipants) {
    return (
      <div className="min-h-screen bg-gray-800 flex items-center justify-center">
        <div className="text-center bg-gray-900 p-8 rounded-lg border border-red-700">
          <h2 className="text-2xl font-bold text-red-400 mb-4">Invalid Parameters</h2>
          <p className="text-gray-300">Missing participant count information.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-800 p-10">
      <ImpactFeedbackForm totalParticipants={totalParticipants} impactId={impactId} />
    </div>
  );
}