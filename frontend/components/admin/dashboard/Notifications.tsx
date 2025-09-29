"use client";

import { useState } from "react";
import { Bell } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Notifications() {
	const [open, setOpen] = useState(false);

	return (
		<div className="relative">
			{/* Bell Button */}
			<Button
				size="icon"
				variant="outline"
				onClick={() => setOpen(!open)}
				className="relative z-10"
			>
				<Bell className="w-5 h-5 text-gray-500 dark:text-gray-100" />
			</Button>

			{/* Collapsible notifications panel */}
			<AnimatePresence>
				{open && (
					<motion.div
						initial={{ opacity: 0, scale: 0.95, y: -10 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.95, y: -10 }}
						transition={{ duration: 0.2 }}
						className="absolute right-0 mt-2 w-80 z-20"
					>
						<Card className="shadow-lg">
							<CardContent className="p-4">
								<div className="flex items-center space-x-2 mb-4">
									<Bell className="w-5 h-5 text-gray-500" />
									<h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
										Notifications
									</h3>
								</div>

								{/* Notification List */}
								<div className="space-y-2">
									<p className="text-gray-500 dark:text-gray-400 text-sm text-center">
										No notifications yet!
									</p>
								</div>
							</CardContent>
						</Card>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}