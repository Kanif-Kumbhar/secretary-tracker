import { auth } from "@/auth";
import { redirect } from "next/navigation";
import {
    BookOpen,
    Users,
    FileText,
    BarChart2,
    Mail,
    Phone,
    MessageCircle,
    Video,
    Shield,
    Clock,
    CheckCircle,
    AlertCircle,
} from "lucide-react";

export default async function HelpPage() {
    const session = await auth();
    if (!session || session.user.role !== "ADMIN") {
        redirect("/unauthorized");
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-full mb-4">
                        <BookOpen className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
                        Admin Help Center
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                        Everything you need to manage your platform effectively
                    </p>
                </div>

                {/* Quick Start Guide */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                        <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
                        Quick Start Guide
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <QuickStartCard
                            number="1"
                            title="Review Applications"
                            description="Check new teacher and secretary registration requests from the Teacher Verification page"
                            icon={<Users className="w-6 h-6" />}
                        />
                        <QuickStartCard
                            number="2"
                            title="Approve or Reject"
                            description="Review each application carefully and make decisions based on the provided information"
                            icon={<CheckCircle className="w-6 h-6" />}
                        />
                        <QuickStartCard
                            number="3"
                            title="Monitor Activity"
                            description="Use the Dashboard and Analytics pages to track platform activity and performance"
                            icon={<BarChart2 className="w-6 h-6" />}
                        />
                    </div>
                </div>

                {/* Main Features */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {/* Dashboard */}
                    <FeatureCard
                        icon={<BarChart2 className="w-8 h-8 text-orange-500" />}
                        title="Dashboard"
                        description="Your command center for quick overview of platform statistics"
                    >
                        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                            <li className="flex items-start">
                                <span className="text-orange-500 mr-2">•</span>
                                View total number of teachers, secretaries, and institutions
                            </li>
                            <li className="flex items-start">
                                <span className="text-orange-500 mr-2">•</span>
                                Check recent activity and pending approvals
                            </li>
                            <li className="flex items-start">
                                <span className="text-orange-500 mr-2">•</span>
                                Monitor system health and alerts
                            </li>
                        </ul>
                    </FeatureCard>

                    {/* Teacher Verification */}
                    <FeatureCard
                        icon={<Users className="w-8 h-8 text-blue-500" />}
                        title="Teacher Verification"
                        description="Manage teacher registration requests"
                    >
                        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                            <li className="flex items-start">
                                <span className="text-blue-500 mr-2">•</span>
                                Review teacher applications with complete details
                            </li>
                            <li className="flex items-start">
                                <span className="text-blue-500 mr-2">•</span>
                                Approve qualified teachers to give them access
                            </li>
                            <li className="flex items-start">
                                <span className="text-blue-500 mr-2">•</span>
                                Reject applications that don't meet requirements
                            </li>
                        </ul>
                    </FeatureCard>

                    {/* Institution Analytics */}
                    <FeatureCard
                        icon={<BarChart2 className="w-8 h-8 text-purple-500" />}
                        title="Institution Analytics"
                        description="Track performance across all institutions"
                    >
                        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                            <li className="flex items-start">
                                <span className="text-purple-500 mr-2">•</span>
                                View detailed statistics for each college
                            </li>
                            <li className="flex items-start">
                                <span className="text-purple-500 mr-2">•</span>
                                Compare performance across institutions
                            </li>
                            <li className="flex items-start">
                                <span className="text-purple-500 mr-2">•</span>
                                Export reports for external use
                            </li>
                        </ul>
                    </FeatureCard>

                    {/* Reports */}
                    <FeatureCard
                        icon={<FileText className="w-8 h-8 text-green-500" />}
                        title="Reports"
                        description="Access comprehensive activity reports"
                    >
                        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                            <li className="flex items-start">
                                <span className="text-green-500 mr-2">•</span>
                                Generate custom reports based on date ranges
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-500 mr-2">•</span>
                                Download reports in PDF or Excel format
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-500 mr-2">•</span>
                                Schedule automated report generation
                            </li>
                        </ul>
                    </FeatureCard>
                </div>

                {/* Common Tasks */}
                <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl shadow-xl p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                        <AlertCircle className="w-6 h-6 text-orange-500 mr-3" />
                        Common Tasks
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        <TaskCard
                            title="How to approve a teacher?"
                            steps={[
                                "Go to 'Teacher Verification' from the sidebar",
                                "Click on a teacher's card to view details",
                                "Review their information carefully",
                                "Click 'Approve' button to grant access",
                            ]}
                        />
                        <TaskCard
                            title="How to view college statistics?"
                            steps={[
                                "Navigate to 'Institution Analytics'",
                                "Select a college from the list",
                                "View detailed metrics and charts",
                                "Export data if needed",
                            ]}
                        />
                        <TaskCard
                            title="How to generate a report?"
                            steps={[
                                "Click on 'Reports' in the sidebar",
                                "Select report type and date range",
                                "Click 'Generate Report' button",
                                "Download in your preferred format",
                            ]}
                        />
                        <TaskCard
                            title="How to manage my account?"
                            steps={[
                                "Click on your profile icon at bottom left",
                                "Select 'Show Profile' to view details",
                                "Update information as needed",
                                "Click 'Save Changes'",
                            ]}
                        />
                    </div>
                </div>

                {/* Contact Support */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                        Need More Help?
                    </h2>
                    <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
                        Our support team is here to help you 24/7
                    </p>
                    <div className="grid md:grid-cols-3 gap-6">
                        <ContactCard
                            icon={<Mail className="w-6 h-6 text-orange-500" />}
                            title="Email Support"
                            content="support@quickheal.com"
                            description="We'll respond within 24 hours"
                        />
                        <ContactCard
                            icon={<Phone className="w-6 h-6 text-blue-500" />}
                            title="Phone Support"
                            content="+91 1800-XXX-XXXX"
                            description="Mon-Fri, 9 AM - 6 PM IST"
                        />
                        <ContactCard
                            icon={<MessageCircle className="w-6 h-6 text-green-500" />}
                            title="Live Chat"
                            content="Click to Chat"
                            description="Available 24/7"
                        />
                    </div>
                </div>

                {/* Video Tutorials */}
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl shadow-xl p-8 mt-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                        <Video className="w-6 h-6 text-blue-500 mr-3" />
                        Video Tutorials
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <VideoCard
                            title="Getting Started"
                            duration="5 min"
                            thumbnail="🎬"
                        />
                        <VideoCard
                            title="Managing Teachers"
                            duration="8 min"
                            thumbnail="👥"
                        />
                        <VideoCard
                            title="Generating Reports"
                            duration="6 min"
                            thumbnail="📊"
                        />
                    </div>
                </div>

                {/* Tips */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mt-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                        <Shield className="w-6 h-6 text-orange-500 mr-3" />
                        Pro Tips
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <TipCard
                            icon="💡"
                            title="Regular Monitoring"
                            description="Check the dashboard daily to stay updated on pending approvals and platform activity"
                        />
                        <TipCard
                            icon="⚡"
                            title="Quick Actions"
                            description="Use keyboard shortcuts: Press 'D' for Dashboard, 'T' for Teacher Verification"
                        />
                        <TipCard
                            icon="🔒"
                            title="Security Best Practices"
                            description="Always logout when finished and never share your admin credentials"
                        />
                        <TipCard
                            icon="📈"
                            title="Data Analysis"
                            description="Export analytics data weekly to track trends and make informed decisions"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

// Helper Components
function QuickStartCard({
    number,
    title,
    description,
    icon,
}: {
    number: string;
    title: string;
    description: string;
    icon: React.ReactNode;
}) {
    return (
        <div className="relative bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-700 dark:to-gray-700 rounded-xl p-6 border-2 border-orange-200 dark:border-gray-600">
            <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                {number}
            </div>
            <div className="mt-4 mb-3 text-orange-600 dark:text-orange-400">{icon}</div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
        </div>
    );
}

function FeatureCard({
    icon,
    title,
    description,
    children,
}: {
    icon: React.ReactNode;
    title: string;
    description: string;
    children: React.ReactNode;
}) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
            <div className="flex items-start mb-4">
                <div className="mr-4">{icon}</div>
                <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                        {title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
                </div>
            </div>
            {children}
        </div>
    );
}

function TaskCard({ title, steps }: { title: string; steps: string[] }) {
    return (
        <div className="bg-white dark:bg-gray-700 rounded-lg p-5 border border-orange-200 dark:border-gray-600">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">{title}</h3>
            <ol className="space-y-2">
                {steps.map((step, index) => (
                    <li
                        key={index}
                        className="flex items-start text-sm text-gray-600 dark:text-gray-400"
                    >
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-orange-500 text-white text-xs font-bold mr-2 flex-shrink-0 mt-0.5">
                            {index + 1}
                        </span>
                        {step}
                    </li>
                ))}
            </ol>
        </div>
    );
}

function ContactCard({
    icon,
    title,
    content,
    description,
}: {
    icon: React.ReactNode;
    title: string;
    content: string;
    description: string;
}) {
    return (
        <div className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-xl hover:shadow-md transition-shadow">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-white dark:bg-gray-600 rounded-full mb-4">
                {icon}
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
            <p className="text-orange-600 dark:text-orange-400 font-medium mb-1">
                {content}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
        </div>
    );
}

function VideoCard({
    title,
    duration,
    thumbnail,
}: {
    title: string;
    duration: string;
    thumbnail: string;
}) {
    return (
        <div className="bg-white dark:bg-gray-700 rounded-xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
            <div className="h-40 bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-6xl">
                {thumbnail}
            </div>
            <div className="p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{title}</h3>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Clock className="w-4 h-4 mr-1" />
                    {duration}
                </div>
            </div>
        </div>
    );
}

function TipCard({
    icon,
    title,
    description,
}: {
    icon: string;
    title: string;
    description: string;
}) {
    return (
        <div className="flex items-start bg-gray-50 dark:bg-gray-700 rounded-lg p-5">
            <div className="text-3xl mr-4">{icon}</div>
            <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
            </div>
        </div>
    );
}