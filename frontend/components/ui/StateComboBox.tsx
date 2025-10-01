"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

const states = [
	{ value: "maharashtra", label: "Maharashtra" },
	{ value: "karnataka", label: "Karnataka" },
	{ value: "punjab", label: "Punjab" },
	{ value: "gujarat", label: "Gujarat" },
	{ value: "mp", label: "Madhya Pradesh" },
	{ value: "up", label: "Uttar Pradesh" },
] as const;

export type StateValue = (typeof states)[number]["value"];

interface StateComboboxProps {
	value: StateValue | "";
	onChange: (val: StateValue) => void;
	className?: string; // ✅ Allow custom className
}

export function StateCombobox({
	value,
	onChange,
	className,
}: StateComboboxProps) {
	const [open, setOpen] = React.useState(false);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className={cn(
						"w-full justify-between px-4 py-2 bg-gray-800 text-white border border-gray-700 hover:bg-gray-700",
						className // ✅ merge passed className
					)}
				>
					{value
						? states.find((s) => s.value === value)?.label
						: "Select state..."}
					<ChevronsUpDown className="opacity-50 ml-2" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-full p-0 bg-gray-900 border border-gray-700">
				<Command className="bg-gray-900 text-white">
					<CommandInput
						placeholder="Search state..."
						className={cn(
							"h-9 bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:border-orange-500 focus:ring-2 focus:ring-orange-500",
							className
						)}
						autoFocus
					/>
					<CommandList className="bg-gray-900 text-white">
						<CommandEmpty className="text-gray-400">
							No state found.
						</CommandEmpty>
						<CommandGroup>
							{states.map((state) => (
								<CommandItem
									key={state.value}
									value={state.value}
									className={cn(
										"text-white hover:bg-gray-800",
										value === state.value && "bg-gray-800"
									)}
									onSelect={(currentValue) => {
										onChange(currentValue as StateValue);
										setOpen(false);
									}}
								>
									{state.label}
									<Check
										className={cn(
											"ml-auto",
											value === state.value
												? "opacity-100 text-orange-500"
												: "opacity-0"
										)}
									/>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}