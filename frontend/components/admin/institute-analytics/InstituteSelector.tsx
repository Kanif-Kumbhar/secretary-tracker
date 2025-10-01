// components/admin/institute-analytics/InstitutionSelector.tsx
"use client";
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
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
import { Button } from "@/components/ui/button";

export default function InstitutionSelector({
	onSelect,
}: {
	onSelect: (val: string) => void;
}) {
	const [open, setOpen] = React.useState(false);
	const [institutions, setInstitutions] = React.useState<
		{ id: number; name: string }[]
	>([]);
	const [selected, setSelected] = React.useState("");

	React.useEffect(() => {
		async function fetchInstitutions() {
			const res = await fetch("/api/institutions");
			const data = await res.json();
			setInstitutions(data);
		}
		fetchInstitutions();
	}, []);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button variant="outline" className="w-full justify-between">
					{selected || "Select Institution..."}
					<ChevronsUpDown className="opacity-50 ml-2" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-full p-0 bg-gray-900 border border-gray-700">
				<Command>
					<CommandInput
						placeholder="Search institution..."
						className="h-9 bg-gray-800 text-white"
						autoFocus
					/>
					<CommandList className="bg-gray-900 text-white">
						<CommandEmpty>No institution found.</CommandEmpty>
						<CommandGroup>
							{institutions.map((inst) => (
								<CommandItem
									key={inst.id}
									value={inst.name}
									onSelect={(val) => {
										setSelected(val);
										onSelect(val); // ✅ send selected institution back
										setOpen(false);
									}}
								>
									{inst.name}
									<Check
										className={`ml-auto ${
											selected === inst.name
												? "opacity-100 text-orange-500"
												: "opacity-0"
										}`}
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