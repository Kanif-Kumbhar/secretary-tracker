import {
	createRouter,
	RouterProvider,
	createRoute,
	createRootRoute,
	Outlet,
} from "@tanstack/react-router";
import Landing from "../pages/Landing";
import SignIn from "../pages/auth/Signin";
import SignUp from "../pages/auth/SignUp";

// Root route
const rootRoute = createRootRoute({
	component: () => (
		<div>
			<Outlet />
		</div>
	),
});

// Landing page route
const indexRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/",
	component: Landing,
});

// Auth parent route
const authRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "auth",
	component: () => <Outlet />, // needed to nest routes
});

// Auth children
const signInRoute = createRoute({
	getParentRoute: () => authRoute,
	path: "signin",
	component: SignIn,
});

const signUpRoute = createRoute({
	getParentRoute: () => authRoute,
	path: "signup",
	component: SignUp,
});

// Build the route tree
const routeTree = rootRoute.addChildren([
	indexRoute,
	authRoute.addChildren([signInRoute, signUpRoute]),
]);

// Create the router
const router = createRouter({ routeTree });

export default function AppRoutes() {
	return <RouterProvider router={router} />;
}