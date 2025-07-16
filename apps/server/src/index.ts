import "dotenv/config";
import { cors } from "@elysiajs/cors";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { Elysia } from "elysia";
import { auth } from "./lib/auth";
import { createContext } from "./lib/context";
import { appRouter } from "./routers/index";

const corsOrigin = process.env.CORS_ORIGIN || "";

const app = new Elysia()
	.use(
		cors({
			origin: corsOrigin,
			methods: ["GET", "POST", "OPTIONS"],
			allowedHeaders: ["Content-Type", "Authorization"],
			credentials: true,
		})
	)
	.get("/api/auth/callback/github", async (context) => {
		// Let Better Auth handle the OAuth callback first
		const { request } = context;
		const response = await auth.handler(request);

		// If Better Auth successfully processed the callback, redirect to frontend
		if (response.status === 200 || response.status === 302) {
			// Extract cookies from the Better Auth response
			const cookies = response.headers.getSetCookie
				? response.headers.getSetCookie()
				: response.headers.get("set-cookie");

			// Create redirect response with the session cookies
			const headers = new Headers();
			headers.set("Location", `${corsOrigin}/dashboard`);
			if (cookies) {
				if (Array.isArray(cookies)) {
					for (const cookie of cookies) {
						headers.append("Set-Cookie", cookie);
					}
				} else {
					headers.append("Set-Cookie", cookies);
				}
			}

			return new Response(null, {
				status: 302,
				headers,
			});
		}

		// If something went wrong, redirect to login
		return new Response(null, {
			status: 302,
			headers: {
				Location: `${corsOrigin}/login`,
			},
		});
	})
	.all("/api/auth/*", (context) => {
		const { request } = context;
		if (["POST", "GET"].includes(request.method)) {
			return auth.handler(request);
		}
		return context.error(405);
	})
	.all("/trpc/*", async (context) => {
		const res = await fetchRequestHandler({
			endpoint: "/trpc",
			router: appRouter,
			req: context.request,
			createContext: () => createContext({ context }),
		});
		return res;
	})
	.get("/", () => "OK")
	.listen(3000, () => {
		// Server is running on http://localhost:3000
	});
