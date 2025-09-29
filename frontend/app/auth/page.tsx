"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { RoleCombobox } from "@/components/ui/RoleCombobox";

export default function AuthCard() {
	const [isSignIn, setIsSignIn] = useState(true);
	const [role, setRole] = React.useState<"" | "teacher" | "secretary" | "warrior">("");
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
						className="hidden md:flex flex-col items-center justify-center w-1/2 p-12 text-center text-white bg-gradient-to-br from-orange-500 to-brand-primary"
					>
						{isSignIn ? (
							<>
								<h1 className="mb-3 text-3xl font-bold">Welcome back!</h1>
								<p className="leading-relaxed max-w-sm">
									We’re so happy to see you again. Let’s get you signed in.
								</p>
								<Button
									onClick={() => setIsSignIn(false)}
									className="px-8 py-2 mt-8 font-semibold text-white transition duration-300 bg-transparent border-2 border-white rounded-full hover:bg-white hover:text-brand-primary"
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
									className="px-8 py-2 mt-8 font-semibold text-black transition duration-300 bg-transparent border-2 border-white rounded-full hover:bg-white hover:text-brand-primary"
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
								<h2 className="mb-6 text-3xl font-bold text-center text-brand-text">
									Sign In
								</h2>
								<form className="space-y-6" onSubmit={handleSignIn}>
									<RoleCombobox value={role} onChange={setRole} />
									<Input
										type="text"
										placeholder="Username or Email"
										className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
									/>
									<Input
										type="password"
										placeholder="Password"
										className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
									/>
									<Button
										type="submit"
										className="relative group overflow-hidden w-full px-6 py-5 font-semibold text-white rounded-lg shadow-md bg-brand-primary"
									>
										<span className="relative z-10 text-xl">Sign In</span>
										<div className="absolute inset-0 z-0 transform -translate-x-full bg-brand-hover transition-transform duration-300 ease-in-out group-hover:translate-x-0" />
									</Button>
								</form>
							</>
						) : (
							<>
								<h2 className="mb-6 text-3xl font-bold text-center text-brand-text">
									Create Account
								</h2>
								<form className="space-y-6">
									<RoleCombobox value={role} onChange={setRole} />
									<Input
										type="text"
										placeholder="Full Name"
										className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
									/>
									<Input
										type="email"
										placeholder="Email Address"
										className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
									/>
									<Input
										type="password"
										placeholder="Password"
										className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
									/>
									<Button
										type="submit"
										className="relative group overflow-hidden w-full px-6 py-5 font-semibold text-white rounded-lg shadow-md bg-brand-primary"
									>
										<span className="relative z-10 text-xl">Sign Up</span>
										<div className="absolute inset-0 z-0 transform -translate-x-full bg-brand-hover transition-transform duration-300 ease-in-out group-hover:translate-x-0" />
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
