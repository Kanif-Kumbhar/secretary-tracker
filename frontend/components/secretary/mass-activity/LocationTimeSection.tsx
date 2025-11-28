"use client";

import {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface LocationTimeSectionProps {
	control: any;
}

export default function LocationTimeSection({
	control,
}: LocationTimeSectionProps) {
	return (
		<fieldset className="border border-gray-700 rounded-lg p-6 bg-gray-800/50">
			<legend className="text-lg font-semibold text-orange-400 px-3">
				Location & Schedule *
			</legend>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
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
					name="duration"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-gray-300">
								Duration of Activity *
							</FormLabel>
							<FormControl>
								<Input
									placeholder="e.g., 5 hours, 2 days"
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
									placeholder="e.g., Bhnadara, Dehuroad"
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