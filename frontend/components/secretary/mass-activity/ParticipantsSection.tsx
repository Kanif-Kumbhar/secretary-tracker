"use client";

import {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface ParticipantsSectionProps {
	control: any;
}

export default function ParticipantsSection({
	control,
}: ParticipantsSectionProps) {
	return (
		<fieldset className="border border-gray-700 rounded-lg p-6 bg-gray-800/50">
			<legend className="text-lg font-semibold text-orange-400 px-3">
				Participants & Stakeholders *
			</legend>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
				<FormField
					control={control}
					name="participants"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-gray-300">
								No. of Participants *
							</FormLabel>
							<FormControl>
								<Input
									type="number"
									min="1"
									placeholder="e.g., 1200, 700"
									{...field}
									onChange={(e) => field.onChange(Number(e.target.value))}
									className="bg-gray-700 border-gray-600 text-gray-100 placeholder:text-gray-400 focus:ring-orange-500 focus:border-orange-500"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={control}
					name="stakeholders"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-gray-300">Stakeholders *</FormLabel>
							<FormControl>
								<Input
									placeholder="e.g., police, media"
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