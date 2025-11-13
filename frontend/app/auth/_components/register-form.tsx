"use client";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RoleCombobox } from "@/components/ui/RoleCombobox";
import { registerSchema } from "@/lib/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
type registerFormType = z.infer<typeof registerSchema>;

export default function RegisterForm() {
	const [isPending, startTransition] = useTransition();
	const registerForm = useForm<registerFormType>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			role: undefined,
			fullName: "",
			email: "",
			password: "",
			phoneNumber: "",
			college: "",
		},
	});
	async function handleRegister(formData: registerFormType) {
		startTransition(async () => {
			try {
				const validatedFields = registerSchema.safeParse(formData);
				if (!validatedFields.success) return;

				const response = await axios.post(
					`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/register`,
					validatedFields.data
				);
				toast.success(response.data);
				registerForm.reset();
			} catch (error: any) {
				toast.error(error.response.data ?? "Error Occurred");
			}
		});
	}
	return (
		<section>
			<h2 className="mb-6 text-3xl font-bold text-center text-gray-800">
				Create Account
			</h2>
			<Form {...registerForm}>
				<form
					className="space-y-6"
					onSubmit={registerForm.handleSubmit(handleRegister)}
				>
					<FormField
						control={registerForm.control}
						name="role"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<RoleCombobox
										disabledStatus={isPending}
										value={field.value}
										onChange={field.onChange}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={registerForm.control}
						name="fullName"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										type="text"
										placeholder="Full Name"
										{...field}
										disabled={isPending}
										className="bg-white placeholder-gray-400 text-gray-800 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={registerForm.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										type="email"
										placeholder="Email Address"
										disabled={isPending}
										{...field}
										className="bg-white placeholder-gray-400 text-gray-800 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={registerForm.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										type="password"
										{...field}
										placeholder="Password"
										disabled={isPending}
										className="bg-white placeholder-gray-400 text-gray-800 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={registerForm.control}
						name="phoneNumber"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										{...field}
										type="tel"
										placeholder="Contact No."
										disabled={isPending}
										className="bg-white placeholder-gray-400 text-gray-800 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={registerForm.control}
						name="college"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Select
										disabled={isPending}
										value={field.value}
										onValueChange={field.onChange}
									>
										<SelectTrigger className="w-full px-4 py-3 bg-white text-gray-800 placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
											<SelectValue placeholder="Select Your College" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="gcek">
												Government College of Engineering, Karad
											</SelectItem>
											<SelectItem value="coep">COE Pune</SelectItem>
											<SelectItem value="vjti">VJTI Mumbai</SelectItem>
											<SelectItem value="iitb">IIT Bombay</SelectItem>
											<SelectItem value="other">Other</SelectItem>
										</SelectContent>
									</Select>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button
						disabled={isPending}
						type="submit"
						className="w-full py-4 font-semibold text-white rounded-lg shadow-md bg-orange-500 hover:bg-orange-600"
					>
						{isPending ? "Loading..." : "Sign Up"}
					</Button>
				</form>
			</Form>
		</section>
	);
}
