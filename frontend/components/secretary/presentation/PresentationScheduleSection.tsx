"use client";

import {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface PresentationScheduleSectionProps {
	control: any;
}

export default function PresentationScheduleSection({
	control,
}: PresentationScheduleSectionProps) {
	return (
		<fieldset className="border border-gray-700 rounded-lg p-6 bg-gray-800/50">
			<legend className="text-lg font-semibold text-orange-400 px-3">
				Presentation Schedule *
			</legend>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
				<FormField
					control={control}
					name="presentationDate"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-gray-300">
								Date of Presentation *
							</FormLabel>
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
					name="timeFrom"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-gray-300">Time From *</FormLabel>
							<FormControl>
								<Input
									type="time"
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
					name="timeTo"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-gray-300">Time To *</FormLabel>
							<FormControl>
								<Input
									type="time"
									{...field}
									className="bg-gray-700 border-gray-600 text-gray-100 focus:ring-orange-500 focus:border-orange-500"
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