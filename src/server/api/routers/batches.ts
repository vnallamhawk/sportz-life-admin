import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const batchRouter = createTRPCRouter({
  getAllBatches: publicProcedure.query(({ ctx }) => {
    return ctx?.prisma?.batches?.findMany();
  }),
});
