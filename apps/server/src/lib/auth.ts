import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db";
// biome-ignore lint/performance/noNamespaceImport: Needed by better-auth
import * as schema from "../db/schema/auth";
import { resetPasswordHtml } from "./react-email";
import { resend } from "./resend";
import { must, replaceDomain } from "./utils";

const corsOrigin = must(process.env.CORS_ORIGIN, "CORS_ORIGIN is required");
const githubClientId = must(
	process.env.GITHUB_CLIENT_ID,
	"GITHUB_CLIENT_ID is required"
);
const githubClientSecret = must(
	process.env.GITHUB_CLIENT_SECRET,
	"GITHUB_CLIENT_SECRET is required"
);
const secret = must(
	process.env.BETTER_AUTH_SECRET,
	"BETTER_AUTH_SECRET is required"
);
const baseURL = must(
	process.env.BETTER_AUTH_URL,
	"BETTER_AUTH_URL is required"
);

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg",
		schema,
	}),
	trustedOrigins: [corsOrigin],
	emailAndPassword: {
		enabled: true,
		sendResetPassword: async ({ url, user }) => {
			const resetUrl = replaceDomain(url, corsOrigin);
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
	socialProviders: {
		github: {
			clientId: githubClientId,
			clientSecret: githubClientSecret,
		},
	},
	secret,
	baseURL,
});
