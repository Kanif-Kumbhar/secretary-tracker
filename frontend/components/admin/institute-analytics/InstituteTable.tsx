"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	Table,
	TableHeader,
	TableRow,
	TableHead,
	TableCell,
	TableBody,
} from "@/components/ui/table";
import { Pencil, Trash2, Eye, Plus } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { StateCombobox } from "@/components/ui/StateComboBox";

type Institution = {
	id: number;
	name: string;
	address: string;
	state: string;
};

export default function InstitutionTable() {
	const [institutions, setInstitutions] = useState<Institution[]>([]);
	const [loading, setLoading] = useState(true);

	// Modal states
	const [open, setOpen] = useState(false);
	type StateValue =
		| ""
		| "maharashtra"
		| "karnataka"
		| "punjab"
		| "gujarat"
		| "mp"
		| "up";

	const [formData, setFormData] = useState<{
		name: string;
		address: string;
		state: StateValue;
	}>({
		name: "",
		address: "",
		state: "",
	});

	useEffect(() => {
		async function fetchInstitutions() {
			const res = await fetch("/api/institutions");
			const data = await res.json();
			setInstitutions(data);
			setLoading(false);
		}
		fetchInstitutions();
	}, []);

	async function handleDelete(id: number) {
		if (!confirm("Are you sure you want to delete this institution?")) return;
		await fetch(`/api/institutions/${id}`, { method: "DELETE" });
		setInstitutions((prev) => prev.filter((inst) => inst.id !== id));
	}

	async function handleSubmit() {
		const res = await fetch("/api/institutions", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(formData),
		});
		const newInstitution = await res.json();
		setInstitutions((prev) => [...prev, newInstitution]);
		setFormData({ name: "", address: "", state: "" });
		setOpen(false);
	}

	return (
		<Card className="mb-4 shadow-lg border border-gray-700 bg-gray-900 text-white">
			<CardContent>
				{/* Header with Add Button */}
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-xl font-semibold text-white">
						Institution Management
					</h2>
					<Button
						onClick={() => setOpen(true)}
						className="bg-orange-600 hover:bg-orange-700 text-white"
					>
						<Plus className="w-4 h-4 mr-1" /> Add New Institution
					</Button>
				</div>

				{/* Table */}
				{loading ? (
					<p className="text-gray-400">Loading institutions...</p>
				) : (
					<Table>
						<TableHeader>
							<TableRow className="bg-gray-800 text-orange-400">
								<TableHead>Sr. No.</TableHead>
								<TableHead>Name</TableHead>
								<TableHead>Address</TableHead>
								<TableHead>State</TableHead>
								<TableHead className="text-center">Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{institutions.map((inst, idx) => (
								<TableRow
									key={inst.id}
									className="hover:bg-gray-800 transition-colors"
								>
									<TableCell>{idx + 1}</TableCell>
									<TableCell>{inst.name}</TableCell>
									<TableCell>{inst.address}</TableCell>
									<TableCell>{inst.state}</TableCell>
									<TableCell className="flex justify-center gap-2">
										<Button
											size="sm"
											variant="outline"
											className="border-gray-600 text-gray-200 hover:bg-gray-700"
											onClick={() => alert(`View details of ${inst.name}`)}
										>
											<Eye className="w-4 h-4 mr-1" /> View
										</Button>
										<Button
											size="sm"
											variant="outline"
											className="border-gray-600 text-gray-200 hover:bg-gray-700"
											onClick={() => alert(`Edit ${inst.name}`)}
										>
											<Pencil className="w-4 h-4 mr-1" /> Edit
										</Button>
										<Button
											size="sm"
											variant="destructive"
											className="bg-red-600 hover:bg-red-700 text-white"
											onClick={() => handleDelete(inst.id)}
										>
											<Trash2 className="w-4 h-4 mr-1" /> Delete
										</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				)}

				{/* Modal Form */}
				<Dialog open={open} onOpenChange={setOpen}>
					<DialogContent className="bg-gray-900 text-white border border-gray-700">
						<DialogHeader>
							<DialogTitle className="text-orange-400">
								Add New Institution
							</DialogTitle>
						</DialogHeader>

						<div className="space-y-4">
							<Input
								className="bg-gray-800 border border-gray-600 text-white placeholder-gray-400 
								focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
								placeholder="Institution Name"
								value={formData.name}
								onChange={(e) =>
									setFormData({ ...formData, name: e.target.value })
								}
							/>
							<Input
								className="bg-gray-800 border border-gray-600 text-white placeholder-gray-400 
								focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
								placeholder="Address"
								value={formData.address}
								onChange={(e) =>
									setFormData({ ...formData, address: e.target.value })
								}
							/>
							<StateCombobox
								value={formData.state}
								onChange={(val) => setFormData({ ...formData, state: val })}
                                className="bg-grey-800 border border-gray-600 text-white placeholder-gray-400 hover:bg-gray-700 focus:outline-none focus:ring-0.5 focus:ring-orange-500 focus:border-orange-500"
							/>
						</div>

						<DialogFooter>
							<Button
								onClick={() => setOpen(false)}
								variant="outline"
								className="border-gray-600 text-gray-600 hover:bg-gray-800 hover:text-white"
							>
								Cancel
							</Button>
							<Button
								onClick={handleSubmit}
								className="bg-orange-600 hover:bg-orange-700 text-white"
							>
								Save
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</CardContent>
		</Card>
	);
}