import { db } from "@/db";
import { publicProcedure, router } from "../lib/trpc";

export const tagRouter = router({
	getAll: publicProcedure.query(async () => {
		return await db.query.tags.findMany();
	}),
});
