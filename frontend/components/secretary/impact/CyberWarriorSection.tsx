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
import { CYBER_WARRIOR_TEAMS } from "@/types/impact";

interface CyberWarriorsSectionProps {
	control: any;
}

export default function CyberWarriorsSection({
	control,
}: CyberWarriorsSectionProps) {
	return (
		<fieldset className="border border-gray-700 rounded-lg p-6 bg-gray-800/50">
			<legend className="text-lg font-semibold text-orange-400 px-3">
				Cyber Warriors Team *
			</legend>
			<FormField
				control={control}
				name="cyberWarriors"
				render={({ field }) => (
					<FormItem>
						<FormLabel className="text-gray-300">
							Select Cyber Warriors *
						</FormLabel>
						<FormControl>
							<Select value={field.value} onValueChange={field.onChange}>
								<SelectTrigger className="bg-gray-700 border-gray-600 text-gray-100 focus:ring-orange-500">
									<SelectValue placeholder="Choose Cyber Warrior Team" />
								</SelectTrigger>
								<SelectContent className="bg-gray-700 border-gray-600">
									{CYBER_WARRIOR_TEAMS.map((team) => (
										<SelectItem
											key={team.value}
											value={team.value}
											className="text-gray-100 focus:bg-gray-600 focus:text-white"
										>
											{team.label}
										</SelectItem>
									))}
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