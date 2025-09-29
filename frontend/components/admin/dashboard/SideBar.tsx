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
} from "lucide-react";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import HeaderLogo from "../HeaderLogo";
import { usePathname, useRouter } from "next/navigation";

const Sidebar = () => {
	const pathname = usePathname();
	const router = useRouter();

	return (
		<aside className="w-64 flex-shrink-0 bg-gray-900 p-4 flex flex-col justify-between h-screen">
			{/* Logo */}
			<div>
				<div className="flex items-center justify-center mb-8">
					<HeaderLogo className="h-16 w-auto" />
				</div>

				{/* Navigation */}
				<nav className="space-y-2">
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
						label="Teacher List"
						to="/admin/teachers"
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

			{/* Footer / Settings */}
			<div>
				<div className="p-3 hover:bg-gray-800 rounded-md cursor-pointer text-gray-300 flex items-center">
					<Settings size={20} className="mr-3" /> Settings
				</div>
				<div className="p-3 hover:bg-gray-800 rounded-md cursor-pointer text-gray-300 flex items-center">
					<HelpCircle size={20} className="mr-3" /> Get Help
				</div>
				<div className="border-t border-gray-700 mt-4 pt-4 flex items-center justify-between">
					<div className="flex items-center">
						<Avatar>
							<AvatarImage
								src="https://placehold.co/40x40/2D3748/E2E8F0?text=O"
								alt="shadcn"
							/>
							<AvatarFallback>S</AvatarFallback>
						</Avatar>
						<div className="ml-3">
							<p className="text-sm font-semibold text-white">The Odd Dev</p>
							<p className="text-xs text-gray-400">theodddev@gmail.com</p>
						</div>
					</div>
					<MoreHorizontal size={20} className="text-gray-400 cursor-pointer" />
				</div>
			</div>
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
			className={`flex items-center px-3 py-2 text-sm font-medium rounded-md cursor-pointer ${
				isActive
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