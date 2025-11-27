"use client";

import {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface LocationSectionProps {
	control: any;
}

export default function LocationSection({ control }: LocationSectionProps) {
	return (
		<fieldset className="border border-gray-700 rounded-lg p-6 bg-gray-800/50">
			<legend className="text-lg font-semibold text-orange-400 px-3">
				Location Details *
			</legend>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
				<FormField
					control={control}
					name="city"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-gray-300">City *</FormLabel>
							<FormControl>
								<Input
									placeholder="City"
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
					name="taluka"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-gray-300">Taluka *</FormLabel>
							<FormControl>
								<Input
									placeholder="Taluka"
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
					name="district"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-gray-300">District *</FormLabel>
							<FormControl>
								<Input
									placeholder="District"
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