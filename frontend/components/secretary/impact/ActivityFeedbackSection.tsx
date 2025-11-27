"use client";

import {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
import { Sparkles, TrendingUp, ThumbsUp, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActivityFeedbackSectionProps {
	control: any;
}

const feedbackOptions = [
	{
		value: "excellent",
		label: "Excellent",
		subtitle: "Exceptional Impact",
		icon: Sparkles,
		gradient: "from-purple-500 via-pink-500 to-red-500",
		glowColor: "shadow-purple-500/50",
		stars: 5,
	},
	{
		value: "good",
		label: "Good",
		subtitle: "Strong Performance",
		icon: TrendingUp,
		gradient: "from-blue-500 via-cyan-500 to-teal-500",
		glowColor: "shadow-blue-500/50",
		stars: 4,
	},
	{
		value: "better",
		label: "Better",
		subtitle: "Room to Grow",
		icon: ThumbsUp,
		gradient: "from-orange-500 via-amber-500 to-yellow-500",
		glowColor: "shadow-orange-500/50",
		stars: 3,
	},
	{
		value: "satisfactory",
		label: "Satisfactory",
		subtitle: "Meets Standards",
		icon: CheckCircle2,
		gradient: "from-green-500 via-emerald-500 to-teal-500",
		glowColor: "shadow-green-500/50",
		stars: 2,
	},
];

export default function ActivityFeedbackSection({
	control,
}: ActivityFeedbackSectionProps) {
	return (
		<fieldset className="border border-gray-700/50 rounded-2xl p-8 bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur">
			<legend className="text-xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent px-4">
				Activity Rating
			</legend>

			<FormField
				control={control}
				name="remarks"
				render={({ field }) => (
					<FormItem className="mt-6">
						<FormLabel className="text-gray-300 text-base mb-6 block">
							How would you rate this activity?
						</FormLabel>
						<FormControl>
							<div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
								{feedbackOptions.map((option) => {
									const Icon = option.icon;
									const isSelected = field.value === option.value;

									return (
										<button
											key={option.value}
											type="button"
											onClick={() => field.onChange(option.value)}
											className={cn(
												"relative group overflow-hidden rounded-2xl p-6 transition-all duration-300",
												"border-2 bg-gray-800/50 backdrop-blur",
												isSelected
													? `border-transparent shadow-xl ${option.glowColor}`
													: "border-gray-700 hover:border-gray-600 hover:shadow-lg"
											)}
										>
											{/* Animated Gradient Background */}
											<div
												className={cn(
													"absolute inset-0 opacity-0 transition-opacity duration-300 bg-gradient-to-br",
													option.gradient,
													isSelected ? "opacity-20" : "group-hover:opacity-10"
												)}
											/>

											{/* Content */}
											<div className="relative z-10 flex flex-col items-center text-center space-y-3">
												{/* Icon */}
												<div
													className={cn(
														"p-3 rounded-xl transition-all duration-300",
														isSelected
															? `bg-gradient-to-br ${option.gradient} shadow-lg ${option.glowColor}`
															: "bg-gray-700/50 group-hover:bg-gray-700"
													)}
												>
													<Icon
														className={cn(
															"w-8 h-8 transition-colors duration-300",
															isSelected
																? "text-white"
																: "text-gray-400 group-hover:text-gray-300"
														)}
													/>
												</div>

												{/* Label */}
												<div>
													<h3
														className={cn(
															"font-bold text-lg transition-colors duration-300",
															isSelected
																? "text-white"
																: "text-gray-300 group-hover:text-white"
														)}
													>
														{option.label}
													</h3>
													<p className="text-xs text-gray-400 mt-1">
														{option.subtitle}
													</p>
												</div>

												{/* Stars */}
												<div className="flex gap-1 pt-2">
													{Array.from({ length: 5 }).map((_, i) => (
														<div
															key={i}
															className={cn(
																"w-2 h-2 rounded-full transition-all duration-300",
																i < option.stars
																	? isSelected
																		? `bg-gradient-to-r ${option.gradient}`
																		: "bg-gray-500 group-hover:bg-gray-400"
																	: "bg-gray-700/50"
															)}
														/>
													))}
												</div>
											</div>

											{/* Selection Ring */}
											{isSelected && (
												<div
													className={cn(
														"absolute inset-0 rounded-2xl border-2 animate-pulse",
														`bg-gradient-to-r ${option.gradient}`
													)}
													style={{
														WebkitMaskImage:
															"linear-gradient(transparent, transparent)",
														WebkitMaskComposite: "xor",
														maskComposite: "exclude",
													}}
												/>
											)}
										</button>
									);
								})}
							</div>
						</FormControl>
						<FormMessage className="mt-3" />
					</FormItem>
				)}
			/>
		</fieldset>
	);
}