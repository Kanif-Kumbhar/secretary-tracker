"use client";

import {
	Home,
	BarChart2,
	Folder,
	Users,
	FileText,
	Settings,
	HelpCircle,
	MoreHorizontal,
	MessageCircle,
	LogOut,
	User,
} from "lucide-react";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useTransition } from "react";
import toast from "react-hot-toast";
import { Session } from "next-auth";
import { logOut } from "@/hooks/user";

interface SidebarProps {
	session: Session;
}

const Sidebar = ({ session }: SidebarProps) => {
	const pathname = usePathname();
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	const [showLogoutAlert, setShowLogoutAlert] = useState(false);
	const [showProfileDialog, setShowProfileDialog] = useState(false);

	const user = session.user;

	const handleLogout = () => {
		setShowLogoutAlert(false);
		startTransition(async () => {
			await logOut();
		});
	};

	return (
		<aside className="w-64 flex-shrink-0 bg-gray-900 p-4 flex flex-col h-screen">
			{/* Top Section */}
			<div className="flex flex-col flex-1">
				{/* Logo */}
				<div className="flex items-center justify-center mb-8">
					<Image
						src={"/logo-dark.svg"}
						alt="Quick Heal"
						width={120}
						height={40}
						className="h-16 w-auto"
						style={{ width: "auto", height: "4rem" }}
						priority
					/>
				</div>

				{/* Navigation */}
				<nav className="space-y-2 flex-1">
					<p className="px-3 text-xs font-semibold text-gray-500 uppercase">
						Home
					</p>
					<NavItem
						icon={<Home size={20} />}
						label="Dashboard"
						to="/admin/dashboard"
						pathname={pathname}
						router={router}
					/>
					<NavItem
						icon={<BarChart2 size={20} />}
						label="Institution Analytics"
						to="/admin/analytics"
						pathname={pathname}
						router={router}
					/>
					<NavItem
						icon={<Folder size={20} />}
						label="Report Verification"
						to="/admin/report-verification"
						pathname={pathname}
						router={router}
					/>

					<p className="px-3 pt-4 text-xs font-semibold text-gray-500 uppercase">
						Documents
					</p>
					<NavItem
						icon={<FileText size={20} />}
						label="College List"
						to="/admin/colleges"
						pathname={pathname}
						router={router}
					/>
					<NavItem
						icon={<Users size={20} />}
						label="Teacher Verification"
						to="/admin/teacher-verification"
						pathname={pathname}
						router={router}
					/>
					<NavItem
						icon={<MessageCircle size={20} />}
						label="Reports"
						to="/admin/reports"
						pathname={pathname}
						router={router}
					/>
				</nav>
			</div>

			{/* Bottom Section */}
			<div className="mt-auto">
				<div
					className="p-3 hover:bg-gray-800 rounded-md cursor-pointer text-gray-300 flex items-center transition-colors"
					onClick={() => router.push("/admin/help")}
				>
					<HelpCircle size={20} className="mr-3" /> Get Help
				</div>

				<div className="border-t border-gray-700 mt-4 pt-4 flex items-center justify-between">
					<div className="flex items-center flex-1 min-w-0">
						<Avatar className="flex-shrink-0">
							<AvatarImage
								src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
									user.name || "User"
								)}&background=2D3748&color=E2E8F0`}
								alt="User Avatar"
							/>
							<AvatarFallback>
								{user.name?.substring(0, 2).toUpperCase() || "U"}
							</AvatarFallback>
						</Avatar>
						<div className="ml-3 flex-1 min-w-0">
							<p className="text-sm font-semibold text-white truncate">
								{user.name || "User"}
							</p>
							<p className="text-xs text-gray-400 truncate">
								{user.email || ""}
							</p>
						</div>
					</div>

					<DropdownMenu modal={false}>
						<DropdownMenuTrigger asChild>
							<button
								className="text-gray-400 hover:text-white transition-colors focus:outline-none ml-2 flex-shrink-0"
								disabled={isPending}
							>
								<MoreHorizontal size={20} className="cursor-pointer" />
							</button>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							align="end"
							className="w-56 bg-gray-800 border-gray-700 text-gray-100"
						>
							<DropdownMenuLabel className="text-gray-400 font-normal">
								Account Options
							</DropdownMenuLabel>
							<DropdownMenuSeparator className="bg-gray-700" />
							<DropdownMenuItem
								onClick={() => setShowProfileDialog(true)}
								disabled={isPending}
								className="cursor-pointer hover:bg-gray-700 focus:bg-gray-700 focus:text-white"
							>
								<User size={16} className="mr-2" />
								Show Profile
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={() => setShowLogoutAlert(true)}
								disabled={isPending}
								className="cursor-pointer text-red-400 hover:bg-gray-700 hover:text-red-300 focus:bg-gray-700 focus:text-red-300"
							>
								<LogOut size={16} className="mr-2" />
								Logout
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>

			{/* Enhanced Profile Dialog - FIXED with DialogTitle */}
			<Dialog open={showProfileDialog} onOpenChange={setShowProfileDialog}>
				<DialogContent className="sm:max-w-[500px] bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 text-gray-100 p-0 overflow-hidden">
					{/* IMPORTANT: DialogTitle is required for accessibility */}
					<DialogHeader className="sr-only">
						<DialogTitle>User Profile</DialogTitle>
					</DialogHeader>

					{/* Header with gradient background */}
					<div className="relative h-32 bg-gradient-to-r from-orange-500 to-red-500">
						<div className="absolute inset-0 bg-black/20"></div>
						<div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
							<div className="relative">
								<Avatar className="h-32 w-32 border-4 border-gray-800 shadow-2xl">
									<AvatarImage
										src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
											user.name || "User"
										)}&background=gradient&color=fff&size=256&bold=true`}
										alt="User Avatar"
									/>
									<AvatarFallback className="text-4xl font-bold bg-gradient-to-br from-orange-500 to-red-500">
										{user.name?.substring(0, 2).toUpperCase() || "U"}
									</AvatarFallback>
								</Avatar>
								<div className="absolute bottom-2 right-2 h-6 w-6 bg-green-500 rounded-full border-4 border-gray-800"></div>
							</div>
						</div>
					</div>

					{/* Content */}
					<div className="pt-20 px-6 pb-6">
						{/* Name and Role Badge */}
						<div className="text-center mb-6">
							<h2 className="text-2xl font-bold text-white mb-2">
								{user.name || "User"}
							</h2>
							<div className="inline-flex items-center px-4 py-1.5 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-full">
								<div className="h-2 w-2 bg-orange-500 rounded-full mr-2 animate-pulse"></div>
								<span className="text-sm font-semibold text-orange-400 uppercase tracking-wide">
									{user.role || "N/A"}
								</span>
							</div>
						</div>

						{/* Info Cards */}
						<div className="space-y-3">
							{/* Email Card */}
							<div className="group relative overflow-hidden bg-gray-800/50 hover:bg-gray-800 backdrop-blur-sm rounded-xl p-4 border border-gray-700 hover:border-orange-500/50 transition-all duration-300">
								<div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-orange-500/10 to-transparent rounded-full -mr-10 -mt-10"></div>
								<div className="relative flex items-start space-x-3">
									<div className="flex-shrink-0 mt-1">
										<div className="h-10 w-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
											<svg
												className="h-5 w-5 text-white"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
												/>
											</svg>
										</div>
									</div>
									<div className="flex-1 min-w-0">
										<p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">
											Email Address
										</p>
										<p className="text-sm font-semibold text-white break-all">
											{user.email || "N/A"}
										</p>
									</div>
								</div>
							</div>

							{/* User ID Card */}
							<div className="group relative overflow-hidden bg-gray-800/50 hover:bg-gray-800 backdrop-blur-sm rounded-xl p-4 border border-gray-700 hover:border-orange-500/50 transition-all duration-300">
								<div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full -mr-10 -mt-10"></div>
								<div className="relative flex items-start space-x-3">
									<div className="flex-shrink-0 mt-1">
										<div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
											<svg
												className="h-5 w-5 text-white"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
												/>
											</svg>
										</div>
									</div>
									<div className="flex-1 min-w-0">
										<p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">
											User ID
										</p>
										<p className="text-xs font-mono text-white break-all bg-gray-900/50 px-2 py-1 rounded">
											{user.id || "N/A"}
										</p>
									</div>
								</div>
							</div>

							{/* Stats Row */}
							<div className="grid grid-cols-2 gap-3 pt-2">
								<div className="bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/30 rounded-xl p-4 text-center">
									<div className="text-2xl font-bold text-green-400 mb-1">
										Active
									</div>
									<div className="text-xs text-gray-400 uppercase tracking-wide">
										Status
									</div>
								</div>
								<div className="bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/30 rounded-xl p-4 text-center">
									<div className="text-2xl font-bold text-purple-400 mb-1">
										{new Date().toLocaleDateString("en-US", {
											month: "short",
											year: "numeric",
										})}
									</div>
									<div className="text-xs text-gray-400 uppercase tracking-wide">
										Member Since
									</div>
								</div>
							</div>
						</div>

						{/* Action Buttons */}
						<div className="flex gap-3 mt-6">
							<button
								onClick={() => setShowProfileDialog(false)}
								className="flex-1 px-4 py-2.5 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors"
							>
								Close
							</button>
							<button
								onClick={() => {
									setShowProfileDialog(false);
									toast("Edit profile coming soon!", { icon: "ℹ️" });
								}}
								className="flex-1 px-4 py-2.5 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-orange-500/50"
							>
								Edit Profile
							</button>
						</div>
					</div>
				</DialogContent>
			</Dialog>

			{/* Logout Confirmation Alert */}
			<AlertDialog open={showLogoutAlert} onOpenChange={setShowLogoutAlert}>
				<AlertDialogContent className="bg-gray-800 border-gray-700 text-gray-100">
					<AlertDialogHeader>
						<AlertDialogTitle className="text-xl">
							Are you sure you want to logout?
						</AlertDialogTitle>
						<AlertDialogDescription className="text-gray-400">
							You will be signed out of your account and redirected to the login
							page. Any unsaved changes will be lost.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel
							className="bg-gray-700 hover:bg-gray-600 text-gray-100 border-gray-600"
							disabled={isPending}
						>
							Cancel
						</AlertDialogCancel>
						<AlertDialogAction
							onClick={handleLogout}
							disabled={isPending}
							className="bg-red-600 hover:bg-red-700 text-white"
						>
							{isPending ? "Logging out..." : "Logout"}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</aside>
	);
};

const NavItem = ({
	icon,
	label,
	to,
	pathname,
	router,
}: {
	icon: React.ReactNode;
	label: string;
	to: string;
	pathname: string | null;
	router: ReturnType<typeof useRouter>;
}) => {
	const isActive = pathname === to;

	return (
		<div
			onClick={() => router.push(to)}
			className={`flex items-center px-3 py-2 text-sm font-medium rounded-md cursor-pointer transition-colors ${isActive
					? "bg-gray-800 text-white"
					: "text-gray-400 hover:bg-gray-800 hover:text-white"
				}`}
		>
			{icon}
			<span className="ml-3">{label}</span>
		</div>
	);
};

export default Sidebar;