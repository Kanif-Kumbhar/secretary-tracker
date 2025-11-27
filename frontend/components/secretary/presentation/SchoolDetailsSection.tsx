"use client";

import {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface SchoolDetailsSectionProps {
	control: any;
}

export default function SchoolDetailsSection({
	control,
}: SchoolDetailsSectionProps) {
	return (
		<fieldset className="border border-gray-700 rounded-lg p-6 bg-gray-800/50">
			<legend className="text-lg font-semibold text-orange-400 px-3">
				School / College Details *
			</legend>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
				<FormField
					control={control}
					name="schoolName"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-gray-300">
								Name of School / College *
							</FormLabel>
							<FormControl>
								<Input
									placeholder="School / College Name"
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
					name="address"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-gray-300">Address *</FormLabel>
							<FormControl>
								<Input
									placeholder="Address"
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
					name="phoneNo"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-gray-300">Phone No *</FormLabel>
							<FormControl>
								<Input
									type="tel"
									placeholder="10-digit phone number"
									maxLength={10}
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
					name="emailId"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-gray-300">Email ID *</FormLabel>
							<FormControl>
								<Input
									type="email"
									placeholder="Email ID"
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
					name="principalName"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-gray-300">
								Principal / Coordinator Name *
							</FormLabel>
							<FormControl>
								<Input
									placeholder="Principal / Coordinator Name"
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
					name="medium"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-gray-300">Medium *</FormLabel>
							<FormControl>
								<Select value={field.value} onValueChange={field.onChange}>
									<SelectTrigger className="bg-gray-700 border-gray-600 text-gray-100 focus:ring-orange-500">
										<SelectValue placeholder="Select Medium" />
									</SelectTrigger>
									<SelectContent className="bg-gray-700 border-gray-600">
										<SelectItem
											value="english"
											className="text-gray-100 focus:bg-gray-600 focus:text-white"
										>
											English
										</SelectItem>
										<SelectItem
											value="hindi"
											className="text-gray-100 focus:bg-gray-600 focus:text-white"
										>
											Hindi
										</SelectItem>
										<SelectItem
											value="marathi"
											className="text-gray-100 focus:bg-gray-600 focus:text-white"
										>
											Marathi
										</SelectItem>
										<SelectItem
											value="urdu"
											className="text-gray-100 focus:bg-gray-600 focus:text-white"
										>
											Urdu
										</SelectItem>
									</SelectContent>
								</Select>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
		</fieldset>
	);
}