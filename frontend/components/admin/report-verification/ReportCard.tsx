import { Calendar, User, MapPin, FileText, Award, Clock } from "lucide-react";

interface ReportCardProps {
    report: any;
    type: "presentation" | "impact";
    onClick: () => void;
}

export default function ReportCard({ report, type, onClick }: ReportCardProps) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case "PENDING":
                return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
            case "APPROVED":
                return "bg-green-500/10 text-green-500 border-green-500/20";
            case "REJECTED":
                return "bg-red-500/10 text-red-500 border-red-500/20";
            case "APPROVED_WITH_REMARKS":
                return "bg-blue-500/10 text-blue-500 border-blue-500/20";
            default:
                return "bg-gray-500/10 text-gray-500 border-gray-500/20";
        }
    };

    return (
        <div
            onClick={onClick}
            className="bg-gray-800 hover:bg-gray-750 border border-gray-700 rounded-lg p-5 cursor-pointer transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/10 group"
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-orange-500/10 rounded-lg">
                        {type === "presentation" ? (
                            <FileText className="w-5 h-5 text-orange-500" />
                        ) : (
                            <Award className="w-5 h-5 text-orange-500" />
                        )}
                    </div>
                    <div>
                        <h3 className="text-white font-semibold group-hover:text-orange-500 transition-colors">
                            Week {report.data.weekNumber} - {type === "presentation" ? "Presentation" : "Impact"} Report
                        </h3>
                        <p className="text-sm text-gray-400">ID: #{report.id}</p>
                    </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(report.status)}`}>
                    {report.status}
                </span>
            </div>

            {/* Teacher Info */}
            <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-300">
                    <User className="w-4 h-4 mr-2 text-gray-500" />
                    {report.teacherName}
                </div>
                <div className="flex items-center text-sm text-gray-300">
                    <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                    {report.collegeName}
                </div>
                <div className="flex items-center text-sm text-gray-300">
                    <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                    Submitted: {new Date(report.submittedDate).toLocaleDateString()}
                </div>
            </div>

            {/* Quick Info */}
            <div className="pt-4 border-t border-gray-700">
                {type === "presentation" ? (
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">
                            Class: <span className="text-white">{report.data.classStandard}</span>
                        </span>
                        <span className="text-gray-400">
                            Students: <span className="text-white">{report.data.numberOfStudents}</span>
                        </span>
                        <span className="text-gray-400">
                            Duration: <span className="text-white">{report.data.duration}</span>
                        </span>
                    </div>
                ) : (
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">
                            Type: <span className="text-white">{report.data.impactType}</span>
                        </span>
                        <span className="text-gray-400">
                            Beneficiaries: <span className="text-white">{report.data.numberOfBeneficiaries}</span>
                        </span>
                    </div>
                )}
            </div>

            {/* View Details Indicator */}
            <div className="mt-4 text-sm text-orange-500 group-hover:text-orange-400 flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                Click to view details and verify
            </div>
        </div>
    );
}