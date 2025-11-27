"use client";

import {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface ActivityDetailsSectionProps {
	control: any;
}

export default function ActivityDetailsSection({
	control,
}: ActivityDetailsSectionProps) {
	return (
		<fieldset className="border border-gray-700 rounded-lg p-6 bg-gray-800/50">
			<legend className="text-lg font-semibold text-orange-400 px-3">
				Activity Details *
			</legend>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
				<FormField
					control={control}
					name="organization"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-gray-300">
								Organization Name *
							</FormLabel>
							<FormControl>
								<Input
									placeholder="Organization Name"
									{...field}
									className="bg-gray-700 border-gray-600 text-gray-100 placeholder:text-gray-400 focus:ring-orange-500 focus:border-orange-500"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={control}
					name="leaderName"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-gray-300">Leader Name *</FormLabel>
							<FormControl>
								<Input
									placeholder="Leader Name"
									{...field}
									className="bg-gray-700 border-gray-600 text-gray-100 placeholder:text-gray-400 focus:ring-orange-500 focus:border-orange-500"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={control}
					name="messagePropagated"
					render={({ field }) => (
						<FormItem className="md:col-span-2">
							<FormLabel className="text-gray-300">
								Message Propagated *
							</FormLabel>
							<FormControl>
								<Input
									placeholder="Message Propagated"
									{...field}
									className="bg-gray-700 border-gray-600 text-gray-100 placeholder:text-gray-400 focus:ring-orange-500 focus:border-orange-500"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={control}
					name="date"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-gray-300">Date *</FormLabel>
							<FormControl>
								<Input
									type="date"
									{...field}
									className="bg-gray-700 border-gray-600 text-gray-100 focus:ring-orange-500 focus:border-orange-500"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={control}
					name="activityDuration"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-gray-300">
								Activity Duration (mins) *
							</FormLabel>
							<FormControl>
								<Input
									type="number"
									placeholder="Duration in minutes"
									{...field}
									className="bg-gray-700 border-gray-600 text-gray-100 placeholder:text-gray-400 focus:ring-orange-500 focus:border-orange-500"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={control}
					name="location"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-gray-300">Location *</FormLabel>
							<FormControl>
								<Input
									placeholder="Location"
									{...field}
									className="bg-gray-700 border-gray-600 text-gray-100 placeholder:text-gray-400 focus:ring-orange-500 focus:border-orange-500"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={control}
					name="participants"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-gray-300">
								Number of Participants *
							</FormLabel>
							<FormControl>
								<Input
									type="number"
									placeholder="Number of Participants"
									{...field}
									className="bg-gray-700 border-gray-600 text-gray-100 placeholder:text-gray-400 focus:ring-orange-500 focus:border-orange-500"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
		</fieldset>
	);
}