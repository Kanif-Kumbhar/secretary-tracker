"use client";

import React from "react";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export default function ImpactActivityPage() {
	const form = useForm({
		defaultValues: {
			groupMembers: "",
			organization: "",
			leaderName: "",
			messagePropagated: "",
			date: "",
			activityDuration: "",
			location: "",
			participants: "",
			resourceInvolved: "",
			socialLinks: "",
			mediaLinks: "",
			remarks: "",
		},
	});

	return (
		<div className="flex min-h-screen bg-gray-100">
			{/* Main Section */}
			<main className="flex-1 p-10">
				<h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
					Impact Activity Details
				</h1>

				<div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
					<Form {...form}>
						<form className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{/* Group Members */}
							<FormField
								control={form.control}
								name="groupMembers"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												placeholder="Group Members"
												{...field}
												className="bg-white border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Organization */}
							<FormField
								control={form.control}
								name="organization"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												placeholder="Organization Name"
												{...field}
												className="bg-white border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Leader Name */}
							<FormField
								control={form.control}
								name="leaderName"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												placeholder="Leader Name"
												{...field}
												className="bg-white border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Message Propagated */}
							<FormField
								control={form.control}
								name="messagePropagated"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												placeholder="Message Propagated"
												{...field}
												className="bg-white border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Date */}
							<FormField
								control={form.control}
								name="date"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												type="date"
												{...field}
												className="bg-white border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Activity Duration */}
							<FormField
								control={form.control}
								name="activityDuration"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												placeholder="Activity Duration (in mins)"
												type="number"
												{...field}
												className="bg-white border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Location */}
							<FormField
								control={form.control}
								name="location"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												placeholder="Location"
												{...field}
												className="bg-white border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* No. of Participants */}
							<FormField
								control={form.control}
								name="participants"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												placeholder="Number of Participants"
												type="number"
												{...field}
												className="bg-white border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Resource Involved */}
							<FormField
								control={form.control}
								name="resourceInvolved"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												placeholder="Resources Involved"
												{...field}
												className="bg-white border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Social Media Links */}
							<FormField
								control={form.control}
								name="socialLinks"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												placeholder="Social Media Links"
												{...field}
												className="bg-white border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Print / Online Media Links */}
							<FormField
								control={form.control}
								name="mediaLinks"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												placeholder="Print / Online Media Links"
												{...field}
												className="bg-white border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Activity Remarks */}
							<FormField
								control={form.control}
								name="remarks"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Select
												value={field.value}
												onValueChange={field.onChange}
											>
												<SelectTrigger className="w-full px-4 py-3 bg-white text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500">
													<SelectValue placeholder="Activity Remarks" />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="excellent">Excellent</SelectItem>
													<SelectItem value="good">Good</SelectItem>
													<SelectItem value="better">Better</SelectItem>
													<SelectItem value="satisfactory">
														Satisfactory
													</SelectItem>
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<div className="md:col-span-2 mt-4">
								<Button
									type="button"
									className="w-full py-4 font-semibold text-white rounded-lg shadow-md bg-orange-500 hover:bg-orange-600"
								>
									Save Activity
								</Button>
							</div>
						</form>
					</Form>
				</div>
			</main>
		</div>
	);
}