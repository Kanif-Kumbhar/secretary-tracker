import axios from "axios";
import { auth } from "@/auth";

const axiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:9000",
	headers: {
		"Content-Type": "application/json",
	},
});

axiosInstance.interceptors.request.use(async (config) => {
	const session = await auth();

	if (session?.backendToken) {
		config.headers.Authorization = `Bearer ${session.backendToken}`;
	}

	return config;
});

export default axiosInstance;