import type { User } from "better-auth";
import type React from "react";
import { createContext, useContext } from "react";
import { useSession } from "./lib/auth-client";

export interface AuthContext {
	isAuthenticated: boolean;
	user: User | undefined;
}

export const AuthContext = createContext<AuthContext | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const { data: session, isPending } = useSession();
	const isAuthenticated = !!session && !isPending;

	return (
		<AuthContext.Provider value={{ isAuthenticated, user: session?.user }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}
