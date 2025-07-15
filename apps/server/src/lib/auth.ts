import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db";
// biome-ignore lint/performance/noNamespaceImport: Needed by better-auth
import * as schema from "../db/schema/auth";
import { resetPasswordHtml } from "./react-email";
import { resend } from "./resend";

// Helper to replace the domain in a URL with the CORS_ORIGIN env and remove '/api/auth' from the path
const replaceDomain = (originalUrl: string, newOrigin: string): string => {
	try {
		const urlObj = new URL(originalUrl);
		let path = urlObj.pathname;
		// Remove '/api/auth' prefix if present
		if (path.startsWith("/api/auth")) {
			path = path.replace("/api/auth", "");
			if (!path.startsWith("/")) {
				path = `/${path}`;
			}
		}
		const origin = newOrigin.endsWith("/") ? newOrigin.slice(0, -1) : newOrigin;
		return `${origin}${path}${urlObj.search}${urlObj.hash}`;
	} catch {
		return originalUrl;
	}
};

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg",
		schema,
	}),
	trustedOrigins: [process.env.CORS_ORIGIN || ""],
	emailAndPassword: {
		enabled: true,
		sendResetPassword: async ({ url, user }) => {
			const corsOrigin = process.env.CORS_ORIGIN || "";
			const resetUrl = corsOrigin ? replaceDomain(url, corsOrigin) : url;
			const { error } = await resend.emails.send({
				from: "Acme <onboarding@resend.dev>",
				to: ["delivered@resend.dev"], // TODO: change to user.email on production
				subject: "Reset your password",
				html: resetPasswordHtml(resetUrl, user.email),
			});

			if (error) {
				throw new Error(error.message);
			}
		},
	},
	secret: process.env.BETTER_AUTH_SECRET,
	baseURL: process.env.BETTER_AUTH_URL,
});
