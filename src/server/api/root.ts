import { exampleRouter } from "~/server/api/routers/example";
import { createTRPCRouter } from "~/server/api/trpc";
import { coachRouter } from "./routers/coach";
import { sportRouter } from "./routers/sports";
import { centerRouter } from "./routers/center";
import { batchRouter } from "./routers/batches";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  center: centerRouter,
  coach: coachRouter,
  sports: sportRouter,
  batches: batchRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
