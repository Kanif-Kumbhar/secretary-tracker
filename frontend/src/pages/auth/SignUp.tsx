import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SignUp() {
	return (
		<div className="flex items-center justify-center h-screen w-screen bg-gray-100">
			<main className="flex w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
				{/* Left Side - Form */}
				<div className="flex flex-col justify-center w-full px-8 py-12 md:w-1/2">
					<h2 className="mb-6 text-3xl font-bold text-center text-brand-text">
						Create Account
					</h2>

					<form action="#" className="space-y-6">
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
							className="
                relative group overflow-hidden
                w-full px-6 py-5 font-semibold text-white rounded-lg shadow-md
              bg-brand-primary"
						>
							<span className="relative z-10 text-xl">Sign Up</span>
							<div
								className="
                  absolute inset-0 z-0
                  transform -translate-x-full
                bg-brand-hover
                  transition-transform duration-300 ease-in-out
                  group-hover:translate-x-0"
							/>
						</Button>
					</form>
				</div>

				{/* Right Side - Welcome Message */}
				<div className="hidden md:flex flex-col items-center justify-center w-1/2 p-12 text-center text-white bg-gradient-to-br from-orange-500 to-brand-primary">
					<h1 className="mb-3 text-3xl font-bold">Hello, Friend!</h1>
					<p className="leading-relaxed">
						Enter your personal details and start your journey with us.
					</p>
					<a
						href="/auth/signin"
						className="px-8 py-2 mt-8 font-semibold text-white transition duration-300 bg-transparent border-2 border-white rounded-full hover:bg-white hover:text-brand-primary"
					>
						Already have an account? Signin.
					</a>
				</div>
			</main>
		</div>
	);
}
