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
	Presentation,
	Activity,
	Megaphone,
} from "lucide-react";

export default async function HelpPage() {
	const session = await auth();
	if (!session || session.user.role !== "SECRETARY") {
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
						Secretary Help Center
					</h1>
					<p className="text-lg text-gray-600 dark:text-gray-400">
						Everything you need to manage presentations, impact activities, and
						mass campaigns
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
							title="Record Presentation"
							description="Fill in the presentation details form with all required information about the cyber awareness session"
							icon={<Presentation className="w-6 h-6" />}
						/>
						<QuickStartCard
							number="2"
							title="Collect Feedback"
							description="Conduct digital behavior survey orally and record student responses by hand count"
							icon={<Users className="w-6 h-6" />}
						/>
						<QuickStartCard
							number="3"
							title="Submit Report"
							description="Review all entries carefully and submit the complete report to the system"
							icon={<CheckCircle className="w-6 h-6" />}
						/>
					</div>
				</div>

				{/* Main Features */}
				<div className="grid md:grid-cols-2 gap-6 mb-8">
					{/* Presentation Details */}
					<FeatureCard
						icon={<Presentation className="w-8 h-8 text-orange-500" />}
						title="Presentation Details"
						description="Record cyber awareness presentation information"
					>
						<ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
							<li className="flex items-start">
								<span className="text-orange-500 mr-2">•</span>
								Enter school/college information and contact details
							</li>
							<li className="flex items-start">
								<span className="text-orange-500 mr-2">•</span>
								Record student counts by class and gender
							</li>
							<li className="flex items-start">
								<span className="text-orange-500 mr-2">•</span>
								Rate presentation quality and add remarks
							</li>
						</ul>
					</FeatureCard>

					{/* Feedback Survey */}
					<FeatureCard
						icon={<Users className="w-8 h-8 text-blue-500" />}
						title="Digital Behavior Survey"
						description="Collect pre and post-presentation feedback"
					>
						<ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
							<li className="flex items-start">
								<span className="text-blue-500 mr-2">•</span>
								Ask questions orally to all students
							</li>
							<li className="flex items-start">
								<span className="text-blue-500 mr-2">•</span>
								Count raised hands for each response option
							</li>
							<li className="flex items-start">
								<span className="text-blue-500 mr-2">•</span>
								Ensure totals match the number of participants
							</li>
						</ul>
					</FeatureCard>

					{/* Impact Details */}
					<FeatureCard
						icon={<Activity className="w-8 h-8 text-purple-500" />}
						title="Impact Activity"
						description="Record details of awareness campaigns and activities"
					>
						<ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
							<li className="flex items-start">
								<span className="text-purple-500 mr-2">•</span>
								Document outreach activities and campaigns
							</li>
							<li className="flex items-start">
								<span className="text-purple-500 mr-2">•</span>
								Record participant details and resources used
							</li>
							<li className="flex items-start">
								<span className="text-purple-500 mr-2">•</span>
								Upload supporting documents (PDF only)
							</li>
						</ul>
					</FeatureCard>

					{/* Mass Activity */}
					<FeatureCard
						icon={<Megaphone className="w-8 h-8 text-pink-500" />}
						title="Mass Activity"
						description="Document large-scale awareness campaigns and rallies"
					>
						<ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
							<li className="flex items-start">
								<span className="text-pink-500 mr-2">•</span>
								Record mass events like rallies, nukkad natak, etc.
							</li>
							<li className="flex items-start">
								<span className="text-pink-500 mr-2">•</span>
								Add multiple social media and news links
							</li>
							<li className="flex items-start">
								<span className="text-pink-500 mr-2">•</span>
								Track participant count and stakeholder involvement
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
							title="How to submit a presentation report?"
							steps={[
								"Click 'Presentation Details' from sidebar",
								"Fill in all required school and date information",
								"Enter student counts for the target class group",
								"Rate the presentation and add remarks",
								"Click 'Save & Continue to Survey'",
							]}
						/>
						<TaskCard
							title="How to conduct feedback survey?"
							steps={[
								"After saving presentation, survey page opens",
								"Read each question aloud to students",
								"Ask students to raise hands for their answer",
								"Count and enter the number for each option",
								"Ensure total equals number of participants",
							]}
						/>
						<TaskCard
							title="How to record an impact activity?"
							steps={[
								"Go to 'Impact Details' from sidebar",
								"Fill organization and activity details",
								"Enter participant count and resources used",
								"Upload PDF document if available",
								"Submit activity feedback form",
							]}
						/>
						<TaskCard
							title="How to submit a mass activity?"
							steps={[
								"Click 'Mass Activity' from sidebar",
								"Enter activity name and description",
								"Fill date, duration, and location details",
								"Add participant count and stakeholders",
								"Use + button to add multiple media links",
								"Review and click 'Submit Mass Activity Report'",
							]}
						/>
						<TaskCard
							title="How to add multiple media links?"
							steps={[
								"In Mass Activity form, find Links section",
								"Click '+ Add Link' button for social media",
								"Paste the URL in the input field",
								"Click '+ Add Link' for print/online media",
								"Remove unwanted links using X button",
							]}
						/>
						<TaskCard
							title="What if I make a mistake?"
							steps={[
								"Contact your admin immediately",
								"Provide the presentation/activity ID",
								"Explain what needs to be corrected",
								"Admin will review and make necessary changes",
							]}
						/>
					</div>
				</div>

				{/* Dashboard Overview */}
				<div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
					<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
						<BarChart2 className="w-6 h-6 text-green-500 mr-3" />
						Dashboard Overview
					</h2>
					<div className="grid md:grid-cols-3 gap-6">
						<DashboardCard
							icon={<Presentation className="w-6 h-6 text-orange-500" />}
							title="Presentations"
							description="Track all cyber awareness presentations delivered"
						/>
						<DashboardCard
							icon={<Activity className="w-6 h-6 text-purple-500" />}
							title="Impact Activities"
							description="Monitor documented awareness campaigns"
						/>
						<DashboardCard
							icon={<Megaphone className="w-6 h-6 text-pink-500" />}
							title="Mass Activities"
							description="View large-scale events and rallies"
						/>
					</div>
				</div>

				{/* Contact Support */}
				<div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
					<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
						Need More Help?
					</h2>
					<p className="text-center text-gray-600 dark:text-gray-400 mb-8">
						Our support team is here to assist you
					</p>
					<div className="grid md:grid-cols-3 gap-6">
						<ContactCard
							icon={<Mail className="w-6 h-6 text-orange-500" />}
							title="Email Support"
							content="secretary@quickheal.com"
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
					<div className="grid md:grid-cols-4 gap-6">
						<VideoCard
							title="Recording Presentations"
							duration="7 min"
							thumbnail="🎬"
						/>
						<VideoCard
							title="Conducting Surveys"
							duration="5 min"
							thumbnail="📊"
						/>
						<VideoCard
							title="Impact Activities"
							duration="6 min"
							thumbnail="🎯"
						/>
						<VideoCard
							title="Mass Activity Reports"
							duration="8 min"
							thumbnail="📢"
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
							icon="✅"
							title="Double Check Counts"
							description="Always verify student counts before submission. Ask students to remain seated and count carefully"
						/>
						<TipCard
							icon="📝"
							title="Keep Notes"
							description="Write down important details during the presentation. This helps when filling the form later"
						/>
						<TipCard
							icon="⏰"
							title="Submit Promptly"
							description="Submit reports within 24 hours of the presentation while details are fresh in memory"
						/>
						<TipCard
							icon="💾"
							title="Save Frequently"
							description="Forms auto-save, but it's good practice to click save after completing each section"
						/>
						<TipCard
							icon="🔗"
							title="Verify Links"
							description="For mass activities, test all social media and news links before submission to ensure they work"
						/>
						<TipCard
							icon="📸"
							title="Document Everything"
							description="Take photos and collect evidence during mass activities. This helps with accurate reporting"
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
			<div className="mt-4 mb-3 text-orange-600 dark:text-orange-400">
				{icon}
			</div>
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
					<p className="text-sm text-gray-600 dark:text-gray-400">
						{description}
					</p>
				</div>
			</div>
			{children}
		</div>
	);
}

function TaskCard({ title, steps }: { title: string; steps: string[] }) {
	return (
		<div className="bg-white dark:bg-gray-700 rounded-lg p-5 border border-orange-200 dark:border-gray-600">
			<h3 className="font-semibold text-gray-900 dark:text-white mb-3">
				{title}
			</h3>
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

function DashboardCard({
	icon,
	title,
	description,
}: {
	icon: React.ReactNode;
	title: string;
	description: string;
}) {
	return (
		<div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow">
			<div className="flex items-center justify-center w-12 h-12 bg-white dark:bg-gray-600 rounded-full mb-4">
				{icon}
			</div>
			<h3 className="font-semibold text-gray-900 dark:text-white mb-2">
				{title}
			</h3>
			<p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
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