"use client";

import { useState } from "react";
import { Bell, UserPlus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

// --- Demo Data ---
const demoTeacherRequests = [
	{
		id: 1,
		teacherName: "Dr. Rohan Narute",
		instituteName: "Quantum University",
	},
	{
		id: 2,
		teacherName: "Miss Emma Watson",
		instituteName: "Celestial College of Arts",
	},
	{
		id: 3,
		teacherName: "Ichigo Kurosaki",
		instituteName: "Apex Institute of Technology",
	},
];

type TeacherRequestNotification = {
	id: number;
	teacherName: string;
	instituteName: string;
};

export function Notifications() {
	const [open, setOpen] = useState(false);
	const [notifications, setNotifications] =
		useState<TeacherRequestNotification[]>(demoTeacherRequests);

	/**
	 * Handles the click event on a notification.
	 * It simulates navigation and removes the notification from the list.
	 */
	const handleNotificationClick = (
		notification: TeacherRequestNotification
	) => {
		// Simulate navigation to the verification page for the specific teacher.
		console.log(
			`ACTION: Navigate to verification page for teacher ID: ${notification.id} (${notification.teacherName})`
		);

		// Remove the clicked notification from the state to update the UI.
		setNotifications((prevNotifications) =>
			prevNotifications.filter((n) => n.id !== notification.id)
		);

		setOpen(false);
	};

	return (
		<div className="relative">
			{/* Bell Button with Notification Badge */}
			<Button
				size="icon"
				variant="outline"
				onClick={() => setOpen(!open)}
				className="relative z-10 rounded-full"
			>
				<Bell className="w-5 h-5 text-gray-500 dark:text-gray-100" />
				{notifications.length > 0 && (
					<div className="absolute top-0 right-0 -mt-1 -mr-1">
						<span className="relative flex h-5 w-5">
							<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
							<span className="relative inline-flex rounded-full h-5 w-5 bg-red-500 text-white text-xs font-semibold items-center justify-center">
								{notifications.length}
							</span>
						</span>
					</div>
				)}
			</Button>

			{/* Collapsible notifications panel */}
			<AnimatePresence>
				{open && (
					<motion.div
						initial={{ opacity: 0, scale: 0.95, y: -10 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.95, y: -10 }}
						transition={{ duration: 0.2, ease: "easeInOut" }}
						className="absolute right-0 mt-2 w-80 z-20"
					>
						<Card className="shadow-lg border">
							<CardContent className="p-4">
								<div className="flex items-center space-x-2 mb-4">
									<Bell className="w-5 h-5 text-gray-500" />
									<h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
										Notifications
									</h3>
								</div>

								{/* Notification List */}
								<div className="space-y-2 max-h-80 overflow-y-auto pr-2">
									{notifications.length > 0 ? (
										notifications.map((notification) => (
											<div
												key={notification.id}
												onClick={() => handleNotificationClick(notification)}
												className="flex items-start p-3 -mx-2 space-x-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors duration-150"
											>
												<div className="bg-blue-100 dark:bg-blue-900/50 rounded-full p-2">
													<UserPlus className="w-5 h-5 text-blue-600 dark:text-blue-300" />
												</div>
												<div>
													<p className="font-semibold text-sm text-gray-900 dark:text-gray-100">
														{notification.teacherName}
													</p>
													<p className="text-xs text-gray-500 dark:text-gray-400">
														New verification request from{" "}
														<span className="font-medium">
															{notification.instituteName}
														</span>
														.
													</p>
												</div>
											</div>
										))
									) : (
										<div className="text-center py-8">
											<p className="text-gray-500 dark:text-gray-400 text-sm">
												All caught up!
											</p>
											<p className="text-xs text-gray-400 dark:text-gray-500">
												No new notifications.
											</p>
										</div>
									)}
								</div>
							</CardContent>
						</Card>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
