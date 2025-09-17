import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src"),
		},
	},
	build: {
		// Raise the warning threshold (optional)
		chunkSizeWarningLimit: 1000,

		rollupOptions: {
			output: {
				// Split vendor libs into separate chunks
				manualChunks: {
					react: ["react", "react-dom"],
					radix: [
						"@radix-ui/react-avatar",
						"@radix-ui/react-dialog",
						"@radix-ui/react-dropdown-menu",
						"@radix-ui/react-popover",
					],
					utils: ["clsx", "date-fns"],
				},
			},
		},
	},
});
