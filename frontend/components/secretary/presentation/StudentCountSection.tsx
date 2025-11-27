"use client";

import {
	FormField,
	FormItem,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface StudentCountSectionProps {
	control: any;
	classGroup: string;
	studentCounts: {
		totalBoys: number;
		totalGirls: number;
		totalStudents: number;
	};
	isPending: boolean;
}

export default function StudentCountSection({
	control,
	classGroup,
	studentCounts,
	isPending,
}: StudentCountSectionProps) {
	if (!classGroup) return null;

	const getStandardFields = () => {
		if (classGroup === "5-7") {
			return [
				{ std: "5th", boysName: "std5Boys", girlsName: "std5Girls" },
				{ std: "6th", boysName: "std6Boys", girlsName: "std6Girls" },
				{ std: "7th", boysName: "std7Boys", girlsName: "std7Girls" },
			];
		} else if (classGroup === "8-10") {
			return [
				{ std: "8th", boysName: "std8Boys", girlsName: "std8Girls" },
				{ std: "9th", boysName: "std9Boys", girlsName: "std9Girls" },
				{ std: "10th", boysName: "std10Boys", girlsName: "std10Girls" },
			];
		} else if (classGroup === "college") {
			return [
				{ std: "11th", boysName: "std11Boys", girlsName: "std11Girls" },
				{ std: "12th", boysName: "std12Boys", girlsName: "std12Girls" },
				{ std: "College", boysName: "collegeBoys", girlsName: "collegeGirls" },
			];
		}
		return [];
	};

	const fields = getStandardFields();
	const groupLabel =
		classGroup === "5-7"
			? "STD 5-7"
			: classGroup === "8-10"
			? "STD 8-10"
			: "College";

	return (
		<fieldset className="border border-gray-700 rounded-lg p-6 bg-gray-800/50">
			<legend className="text-lg font-semibold text-orange-400 px-3">
				Number of Students - {groupLabel}
			</legend>
			<div className="mt-4 space-y-4">
				{fields.map((field) => (
					<div key={field.std} className="grid grid-cols-3 gap-4 items-center">
						<Label className="text-gray-300 font-medium">{field.std}</Label>
						<FormField
							control={control}
							name={field.boysName as any}
							render={({ field: formField }) => (
								<FormItem>
									<FormControl>
										<Input
											type="number"
											min="0"
											placeholder="Boys"
											{...formField}
											onChange={(e) =>
												formField.onChange(Number(e.target.value))
											}
											className="bg-gray-700 border-gray-600 text-gray-100 placeholder:text-gray-400 focus:ring-orange-500 focus:border-orange-500"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={control}
							name={field.girlsName as any}
							render={({ field: formField }) => (
								<FormItem>
									<FormControl>
										<Input
											type="number"
											min="0"
											placeholder="Girls"
											{...formField}
											onChange={(e) =>
												formField.onChange(Number(e.target.value))
											}
											className="bg-gray-700 border-gray-600 text-gray-100 placeholder:text-gray-400 focus:ring-orange-500 focus:border-orange-500"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				))}

				{/* Totals */}
				<div className="mt-6 pt-4 border-t border-gray-700">
					<div className="grid grid-cols-3 gap-4 text-lg font-semibold">
						<div className="text-orange-400">Total</div>
						<div className="text-blue-400 bg-blue-900/20 rounded-lg p-3 text-center">
							Boys:{" "}
							{isPending ? (
								<Loader2 className="h-4 w-4 animate-spin inline" />
							) : (
								studentCounts.totalBoys
							)}
						</div>
						<div className="text-pink-400 bg-pink-900/20 rounded-lg p-3 text-center">
							Girls:{" "}
							{isPending ? (
								<Loader2 className="h-4 w-4 animate-spin inline" />
							) : (
								studentCounts.totalGirls
							)}
						</div>
					</div>
					<div className="mt-3 text-center">
						<div className="bg-green-900/20 text-green-400 rounded-lg p-3 text-xl font-bold">
							Total Students:{" "}
							{isPending ? (
								<Loader2 className="h-4 w-4 animate-spin inline" />
							) : (
								studentCounts.totalStudents
							)}
						</div>
					</div>
				</div>
			</div>
		</fieldset>
	);
}