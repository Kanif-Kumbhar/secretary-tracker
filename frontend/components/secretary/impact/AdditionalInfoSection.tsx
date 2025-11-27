"use client";

import {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface AdditionalInfoSectionProps {
	control: any;
}

export default function AdditionalInfoSection({
	control,
}: AdditionalInfoSectionProps) {
	return (
		<fieldset className="border border-gray-700 rounded-lg p-6 bg-gray-800/50">
			<legend className="text-lg font-semibold text-orange-400 px-3">
				Additional Information
			</legend>
			<div className="grid grid-cols-1 gap-6 mt-4">
				<FormField
					control={control}
					name="resourceInvolved"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-gray-300">
								Resources Involved
							</FormLabel>
							<FormControl>
								<Input
									placeholder="Resources Involved"
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
					name="socialLinks"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-gray-300">
								Social Media Links
							</FormLabel>
							<FormControl>
								<Input
									placeholder="Social Media Links"
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
					name="mediaLinks"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-gray-300">
								Print / Online Media Links
							</FormLabel>
							<FormControl>
								<Input
									placeholder="Print / Online Media Links"
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