import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db";
// biome-ignore lint/performance/noNamespaceImport: Needed by better-auth
import * as schema from "../db/schema/auth";
import { resetPasswordHtml } from "./react-email";
import { resend } from "./resend";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg",
		schema,
	}),
	trustedOrigins: [process.env.CORS_ORIGIN || ""],
	emailAndPassword: {
		enabled: true,
		sendResetPassword: async ({ url, user }) => {
			const { error } = await resend.emails.send({
				from: "Acme <onboarding@resend.dev>",
				to: ["delivered@resend.dev"], // TODO: change to user.email on production
				subject: "Reset your password",
				html: resetPasswordHtml(url, user.email),
			});

			if (error) {
				throw new Error(error.message);
			}
		},
	},
	secret: process.env.BETTER_AUTH_SECRET,
	baseURL: process.env.BETTER_AUTH_URL,
});
