import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PresentationVerificationSection from "@/components/admin/report-verification/PresentationVerificationSection";
import ImpactVerificationSection from "@/components/admin/report-verification/ImpactVerificationSection";
import { FileText, Award } from "lucide-react";

export default async function ReportVerificationPage() {
    const session = await auth();

    if (!session || session.user.role !== "ADMIN") {
        redirect("/unauthorized");
    }

    return (
        <div className="min-h-screen bg-gray-900 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">
                        Report Verification
                    </h1>
                    <p className="text-gray-400">
                        Review and verify presentation and impact reports submitted by
                        teachers
                    </p>
                </div>

                {/* Tabs for Presentation and Impact */}
                <Tabs defaultValue="presentation" className="w-full">
                    <TabsList className="grid w-full max-w-md grid-cols-2 bg-gray-800 p-1 mb-6">
                        <TabsTrigger
                            value="presentation"
                            className="text-orange-500 data-[state=active]:bg-orange-500 data-[state=active]:text-white transition-all duration-200"
                        >
                            <FileText className="w-4 h-4 mr-2" />
                            Presentation Reports
                        </TabsTrigger>
                        <TabsTrigger
                            value="impact"
                            className="text-orange-500 data-[state=active]:bg-orange-500 data-[state=active]:text-white transition-all duration-200"
                        >
                            <Award className="w-4 h-4 mr-2" />
                            Impact Reports
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="presentation">
                        <PresentationVerificationSection />
                    </TabsContent>

                    <TabsContent value="impact">
                        <ImpactVerificationSection />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}