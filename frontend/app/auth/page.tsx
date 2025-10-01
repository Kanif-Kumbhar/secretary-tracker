"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { RoleCombobox } from "@/components/ui/RoleCombobox";

export default function AuthCard() {
	const [isSignIn, setIsSignIn] = useState(true);
	const [role, setRole] = React.useState<
		"" | "teacher" | "secretary" | "warrior"
	>("");
	const [college, setCollege] = useState("");
	const router = useRouter();

	const handleSignIn = (e: React.FormEvent) => {
		e.preventDefault();

		if (role === "teacher") {
			router.push("/teacher/dashboard");
		} else if (role === "secretary") {
			router.push("/secretary/dashboard");
		} else {
			router.push("/admin/dashboard");
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="relative w-full max-w-4xl overflow-hidden bg-white rounded-lg shadow-lg">
				<div className="flex w-full h-full">
					{/* Left Panel */}
					<motion.div
						key={isSignIn ? "left-signin" : "left-signup"}
						initial={{ x: isSignIn ? "100%" : "-100%", opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						exit={{ x: isSignIn ? "-100%" : "100%", opacity: 0 }}
						transition={{ duration: 0.6, ease: "easeInOut" }}
						className="hidden md:flex flex-col items-center justify-center w-1/2 p-12 text-center text-white bg-orange-500"
					>
						{isSignIn ? (
							<>
								<h1 className="mb-3 text-3xl font-bold">Welcome back!</h1>
								<p className="leading-relaxed max-w-sm">
									We’re so happy to see you again. Let’s get you signed in.
								</p>
								<Button
									onClick={() => setIsSignIn(false)}
									className="px-8 py-2 mt-8 font-semibold text-orange-500 transition duration-300 bg-white border-2 border-white rounded-full hover:bg-orange-600 hover:text-white"
								>
									Create a new account
								</Button>
							</>
						) : (
							<>
								<h1 className="mb-3 text-3xl font-bold">Hello, Friend!</h1>
								<p className="leading-relaxed max-w-sm">
									Enter your personal details and start your journey with us.
								</p>
								<Button
									onClick={() => setIsSignIn(true)}
									className="px-8 py-2 mt-8 font-semibold text-orange-500 transition duration-300 bg-white border-2 border-white rounded-full hover:bg-orange-600 hover:text-white"
								>
									Already have an account? Sign in
								</Button>
							</>
						)}
					</motion.div>

					{/* Right Panel */}
					<motion.div
						key={isSignIn ? "form-signin" : "form-signup"}
						initial={{ x: isSignIn ? "-100%" : "100%", opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						exit={{ x: isSignIn ? "100%" : "-100%", opacity: 0 }}
						transition={{ duration: 0.6, ease: "easeInOut" }}
						className="flex flex-col justify-center w-full px-8 py-12 md:w-1/2"
					>
						{isSignIn ? (
							<>
								<h2 className="mb-6 text-3xl font-bold text-center text-gray-800">
									Sign In
								</h2>
								<form className="space-y-6" onSubmit={handleSignIn}>
									<RoleCombobox value={role} onChange={setRole} />

									<Input
										type="text"
										placeholder="Username or Email"
										className="bg-white placeholder-gray-400 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-4 focus:ring-orange-500"
									/>

									<Input
										type="password"
										placeholder="Password"
										className="bg-white placeholder-gray-400 text-gray-800 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
									/>

									<Button
										type="submit"
										className="w-full py-4 font-semibold text-white rounded-lg shadow-md bg-orange-500 hover:bg-orange-600"
									>
										Sign In
									</Button>
								</form>
							</>
						) : (
							<>
								<h2 className="mb-6 text-3xl font-bold text-center text-gray-800">
									Create Account
								</h2>
								<form className="space-y-6">
									<RoleCombobox value={role} onChange={setRole} />

									<Input
										type="text"
										placeholder="Full Name"
										className="bg-white placeholder-gray-400 text-gray-800 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
									/>

									<Input
										type="email"
										placeholder="Email Address"
										className="bg-white placeholder-gray-400 text-gray-800 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
									/>

									<Input
										type="password"
										placeholder="Password"
										className="bg-white placeholder-gray-400 text-gray-800 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
									/>

									<Input
										type="tel"
										placeholder="Contact No."
										className="bg-white placeholder-gray-400 text-gray-800 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
									/>

									{/* College Dropdown */}
									<select
										value={college}
										onChange={(e) => setCollege(e.target.value)}
										className="w-full px-4 py-3 bg-white text-gray-800 placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
									>
										<option value="">Select College</option>
										<option value="gcek">
											Government College of Engineering, Karad
										</option>
										<option value="coep">COEP Pune</option>
										<option value="vjti">VJTI Mumbai</option>
										<option value="iitb">IIT Bombay</option>
										<option value="other">Other</option>
									</select>

									<Button
										type="submit"
										className="w-full py-4 font-semibold text-white rounded-lg shadow-md bg-orange-500 hover:bg-orange-600"
									>
										Sign Up
									</Button>
								</form>
							</>
						)}
					</motion.div>
				</div>
			</div>
		</div>
	);
}