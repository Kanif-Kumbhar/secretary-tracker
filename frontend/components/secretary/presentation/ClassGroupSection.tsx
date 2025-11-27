"use client";

import {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface ClassGroupSectionProps {
	control: any;
}

export default function ClassGroupSection({ control }: ClassGroupSectionProps) {
	return (
		<fieldset className="border border-orange-500 rounded-lg p-6 bg-orange-900/10">
			<legend className="text-lg font-semibold text-orange-400 px-3">
				Target Class Group *
			</legend>
			<FormField
				control={control}
				name="classGroup"
				render={({ field }) => (
					<FormItem className="mt-4">
						<FormLabel className="text-gray-300">
							Select Class Group *
						</FormLabel>
						<FormControl>
							<Select value={field.value} onValueChange={field.onChange}>
								<SelectTrigger className="bg-gray-700 border-gray-600 text-gray-100 focus:ring-orange-500">
									<SelectValue placeholder="Choose Class Group" />
								</SelectTrigger>
								<SelectContent className="bg-gray-700 border-gray-600">
									<SelectItem
										value="5-7"
										className="text-gray-100 focus:bg-gray-600 focus:text-white"
									>
										STD 5-7 (Junior)
									</SelectItem>
									<SelectItem
										value="8-10"
										className="text-gray-100 focus:bg-gray-600 focus:text-white"
									>
										STD 8-10 (Middle)
									</SelectItem>
									<SelectItem
										value="college"
										className="text-gray-100 focus:bg-gray-600 focus:text-white"
									>
										College Students (11, 12 & College)
									</SelectItem>
								</SelectContent>
							</Select>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</fieldset>
	);
}