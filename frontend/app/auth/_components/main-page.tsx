"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import LoginForm from "./login-form";
import RegisterForm from "./register-form";

export default function AuthCard() {
	const [isSignIn, setIsSignIn] = useState(true);
	return (
		<section className="flex items-center justify-center min-h-screen bg-gray-100">
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
									{"We’re so happy to see you again. Let’s get you signed in."}
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
							<LoginForm />
						) : (
							<RegisterForm />
						)}
					</motion.div>
				</div>
			</div>
		</section>
	);
}