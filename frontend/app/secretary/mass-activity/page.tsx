"use client";

import { useRouter } from "next/navigation";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useMassActivityForm } from "@/hooks/secretary/mass-activity/useMassActivityForm";
import ActivityDetailsSection from "@/components/secretary/mass-activity/ActivityDetailsSection";
import LocationTimeSection from "@/components/secretary/mass-activity/LocationTimeSection";
import ParticipantsSection from "@/components/secretary/mass-activity/ParticipantsSection";
import LinksSection from "@/components/secretary/mass-activity/LinksSection";

export default function MassActivityPage() {
    const router = useRouter();
    const {
        form,
        isPending,
        handleSubmit,
        socialMediaLinks,
        addSocialMediaLink,
        removeSocialMediaLink,
        updateSocialMediaLink,
        mediaLinks,
        addMediaLink,
        removeMediaLink,
        updateMediaLink,
    } = useMassActivityForm();

    return (
        <div className="min-h-screen bg-gray-800 p-10">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-100">
                        Mass Activity Report
                    </h1>
                    <p className="text-gray-400 mt-2">
                        Record details of awareness campaigns and outreach activities
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

            <div className="max-w-6xl mx-auto bg-gray-900 rounded-2xl shadow-2xl p-8 border border-gray-700">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleSubmit)}
                        className="space-y-8"
                    >
                        <ActivityDetailsSection control={form.control} />

                        <LocationTimeSection control={form.control} />

                        <ParticipantsSection control={form.control} />

                        <LinksSection
                            control={form.control}
                            socialMediaLinks={socialMediaLinks}
                            addSocialMediaLink={addSocialMediaLink}
                            removeSocialMediaLink={removeSocialMediaLink}
                            updateSocialMediaLink={updateSocialMediaLink}
                            mediaLinks={mediaLinks}
                            addMediaLink={addMediaLink}
                            removeMediaLink={removeMediaLink}
                            updateMediaLink={updateMediaLink}
                        />

                        {/* Submit Button */}
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
                                    "Submit Mass Activity Report"
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
                </Form>
            </div>
        </div>
    );
}