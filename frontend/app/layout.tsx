import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "@/lib/tanstack-query";

export const metadata: Metadata = {
	title: "Secretary Tracker",
	description: "Created with v0",
	generator: "v0.app",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className="font-sans">
				<QueryClientProvider client={queryClient}>
					<Toaster
						position="top-right"
						reverseOrder={false}
					/>
					{children}
				</QueryClientProvider>
			</body>

		</html>
	);
}
