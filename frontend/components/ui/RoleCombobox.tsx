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

const roles = [
	{ value: "teacher", label: "Teacher" },
	{ value: "secretary", label: "Secretary" },
    {value: "warrior", label: "Warrior"},
] as const;

type RoleValue = (typeof roles)[number]["value"];

interface RoleComboboxProps {
	value: RoleValue | "";
	onChange: (val: RoleValue) => void;
}

export function RoleCombobox({ value, onChange }: RoleComboboxProps) {
	const [open, setOpen] = React.useState(false);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="w-full justify-between px-4 py-2"
				>
					{value
						? roles.find((r) => r.value === value)?.label
						: "Select role..."}
					<ChevronsUpDown className="opacity-50 ml-2" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-full p-0">
				<Command>
					<CommandInput
						placeholder="Search role..."
						className="h-9"
						autoFocus
					/>
					<CommandList>
						<CommandEmpty>No role found.</CommandEmpty>
						<CommandGroup>
							{roles.map((role) => (
								<CommandItem
									key={role.value}
									value={role.value}
									onSelect={(currentValue) => {
										onChange(currentValue as RoleValue);
										setOpen(false);
									}}
								>
									{role.label}
									<Check
										className={cn(
											"ml-auto",
											value === role.value ? "opacity-100" : "opacity-0"
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