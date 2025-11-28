"use client";

import { useState } from "react";
import { FileText, Calendar, Users, MapPin, Clock } from "lucide-react";
import ReportCard from "./ReportCard";
import ReportDetailModal from "./ReportDetailModal";

// Mock data - replace with actual API call
const mockPresentationReports = [
    {
        id: "1",
        teacherName: "Dr. Rajesh Kumar",
        teacherEmail: "rajesh.kumar@example.com",
        collegeName: "Government College of Engineering, Karad",
        submittedDate: "2025-11-15",
        status: "PENDING",
        data: {
            weekNumber: 5,
            date: "2025-11-10",
            classStandard: "9th",
            venue: "Main Hall, Room 101",
            duration: "45 minutes",
            topicCovered: "Cyber Security Basics and Online Safety",
            numberOfStudents: 45,
            teachingMethod: "Interactive presentation with live demonstrations",
            resourcesUsed: "Projector, Slides, Videos",
            studentEngagement: "High - Students asked many questions",
            challenges: "Some students had difficulty understanding technical terms",
            feedback: "Overall positive response from students",
            attachments: ["presentation_week5.pdf", "photos_session.jpg"],
        },
    },
    {
        id: "2",
        teacherName: "Prof. Priya Sharma",
        teacherEmail: "priya.sharma@example.com",
        collegeName: "Maharashtra Institute of Technology",
        submittedDate: "2025-11-16",
        status: "PENDING",
        data: {
            weekNumber: 3,
            date: "2025-11-08",
            classStandard: "10th",
            venue: "Computer Lab, Block B",
            duration: "60 minutes",
            topicCovered: "Social Media Safety and Digital Footprint",
            numberOfStudents: 38,
            teachingMethod: "Hands-on workshop with practical examples",
            resourcesUsed: "Computers, Interactive tools, Case studies",
            studentEngagement: "Very High - Active participation",
            challenges: "None",
            feedback: "Students enjoyed the practical approach",
            attachments: ["workshop_materials.pdf"],
        },
    },
];

export default function PresentationVerificationSection() {
    const [selectedReport, setSelectedReport] = useState<any>(null);
    const [reports, setReports] = useState(mockPresentationReports);

    const handleReportClick = (report: any) => {
        setSelectedReport(report);
    };

    const handleCloseModal = () => {
        setSelectedReport(null);
    };

    const handleVerification = (reportId: string, status: string, remarks: string) => {
        setReports(reports.map(report => 
            report.id === reportId 
                ? { ...report, status, adminRemarks: remarks }
                : report
        ));
        setSelectedReport(null);
    };

    const pendingReports = reports.filter(r => r.status === "PENDING");
    const verifiedReports = reports.filter(r => r.status !== "PENDING");

    return (
        <div className="space-y-6">
            {/* Pending Reports */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-white">
                        Pending Verification ({pendingReports.length})
                    </h2>
                </div>
                
                {pendingReports.length === 0 ? (
                    <div className="bg-gray-800 rounded-lg p-8 text-center">
                        <FileText className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                        <p className="text-gray-400">No pending presentation reports</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 gap-4">
                        {pendingReports.map((report) => (
                            <ReportCard
                                key={report.id}
                                report={report}
                                type="presentation"
                                onClick={() => handleReportClick(report)}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Verified Reports */}
            {verifiedReports.length > 0 && (
                <div>
                    <h2 className="text-xl font-semibold text-white mb-4">
                        Recently Verified ({verifiedReports.length})
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        {verifiedReports.map((report) => (
                            <ReportCard
                                key={report.id}
                                report={report}
                                type="presentation"
                                onClick={() => handleReportClick(report)}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Modal */}
            {selectedReport && (
                <ReportDetailModal
                    report={selectedReport}
                    type="presentation"
                    onClose={handleCloseModal}
                    onVerify={handleVerification}
                />
            )}
        </div>
    );
}