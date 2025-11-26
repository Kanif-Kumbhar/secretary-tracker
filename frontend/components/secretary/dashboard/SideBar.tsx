"use client";

import {
	Home,
	Users,
	Activity,
	BarChart2,
	Settings,
	HelpCircle,
	MoreHorizontal,
} from "lucide-react";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

const Sidebar = () => {
	const pathname = usePathname();
	const router = useRouter();

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
						priority
					/>
				</div>

				{/* Navigation */}
				<nav className="space-y-2 flex-1">
					<p className="px-3 text-xs font-semibold text-gray-500 uppercase">
						Main
					</p>
					<NavItem
						icon={<Home size={20} />}
						label="Dashboard"
						to="/secretary/dashboard"
						pathname={pathname}
						router={router}
					/>
					<NavItem
						icon={<BarChart2 size={20} />}
						label="Presentation Details"
						to="/secretary/presentation-details"
						pathname={pathname}
						router={router}
					/>
					<NavItem
						icon={<Users size={20} />}
						label="Impact Details"
						to="/secretary/impact-details"
						pathname={pathname}
						router={router}
					/>
					{/* <NavItem
						icon={<Activity size={20} />}
						label="Mass Activity"
						to="/teacher/mass-activity"
						pathname={pathname}
						router={router}
					/>
					<NavItem
						icon={<BarChart2 size={20} />}
						label="College Summary"
						to="/teacher/college-summary"
						pathname={pathname}
						router={router}
					/> */}
				</nav>
			</div>

			{/* Bottom Section */}
			<div className="mt-auto">
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
								src="https://placehold.co/40x40/2D3748/E2E8F0?text=T"
								alt="Teacher"
							/>
							<AvatarFallback>T</AvatarFallback>
						</Avatar>
						<div className="ml-3">
							<p className="text-sm font-semibold text-white">Teacher Name</p>
							<p className="text-xs text-gray-400">teacher@email.com</p>
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