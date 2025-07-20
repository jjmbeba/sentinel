import { protectedProcedure, publicProcedure, router } from "../lib/trpc";
import { tagRouter } from "./tag";
import { taskRouter } from "./task";

export const appRouter = router({
	healthCheck: publicProcedure.query(() => {
		return "OK";
	}),
	privateData: protectedProcedure.query(({ ctx }) => {
		return {
			message: "This is private",
			user: ctx.session.user,
		};
	}),
	task: taskRouter,
	tag: tagRouter,
});
export type AppRouter = typeof appRouter;
