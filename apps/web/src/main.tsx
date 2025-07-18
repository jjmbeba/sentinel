import { QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider, useAuth } from "./auth";
import Loader from "./components/auth/common/loader";
import { routeTree } from "./routeTree.gen";
import { queryClient, trpc } from "./utils/trpc";

const router = createRouter({
	routeTree,
	defaultPreload: "intent",
	defaultPendingComponent: () => <Loader />,
	context: { trpc, queryClient, auth: undefined },
	Wrap({ children }: { children: React.ReactNode }) {
		return (
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		);
	},
});

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

function InnerApp() {
	const auth = useAuth();
	return <RouterProvider context={{ auth }} router={router} />;
}

function App() {
	return (
		<AuthProvider>
			<InnerApp />
		</AuthProvider>
	);
}

const rootElement = document.getElementById("app");

if (!rootElement) {
	throw new Error("Root element not found");
}

if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<React.StrictMode>
			<App />
		</React.StrictMode>
	);
}
