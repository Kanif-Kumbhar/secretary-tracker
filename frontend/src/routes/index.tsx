import {
	createRouter,
	RouterProvider,
	createRoute,
	createRootRoute,
	Outlet,
} from "@tanstack/react-router";

import Landing from "../pages/Landing";
import Auth from "../pages/auth/Auth";

// Admin pages
import AdminLayout from "../pages/admin/AdminLayout";
import AdminDashboard from "../pages/admin/Dashboard";
import InstituteAnalytics from "../pages/admin/InstituteAnalytics";
import ReportVerification from "../pages/admin/ReportVerification";
// Add other admin pages here

// Root route
const rootRoute = createRootRoute({
	component: () => <Outlet />,
});

// Landing
const indexRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/",
	component: Landing,
});

// Auth
const authRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "auth",
	component: Auth,
});

// Admin layout route (sidebar + header)
const adminRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "admin",
	component: AdminLayout,
});

// Nested admin routes
const dashboardRoute = createRoute({
	getParentRoute: () => adminRoute,
	path: "dashboard",
	component: AdminDashboard,
});

const analyticsRoute = createRoute({
	getParentRoute: () => adminRoute,
	path: "analytics",
	component: InstituteAnalytics,
});

const reportVerificationRoute = createRoute({
	getParentRoute: () => adminRoute,
	path: "report-verification",
	component: ReportVerification,
});

// Build route tree
const routeTree = rootRoute.addChildren([
	indexRoute,
	authRoute,
	adminRoute.addChildren([
		dashboardRoute,
		analyticsRoute,
		reportVerificationRoute,
		// Add other nested admin routes here
	]),
]);

const router = createRouter({ routeTree });

export default function AppRoutes() {
	return <RouterProvider router={router} />;
}