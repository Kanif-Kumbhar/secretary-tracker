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
	server: {
		host: "0.0.0.0", // needed to allow external access
		port: Number(process.env.PORT) || 5173, // use Render's PORT if available
		allowedHosts: [
			"secretary-tracker-1-xzpv.onrender.com", // allow Render host
		],
	},
});
