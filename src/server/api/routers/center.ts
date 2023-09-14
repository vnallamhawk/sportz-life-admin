import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const centerRouter = createTRPCRouter({
  getAllCenters: publicProcedure.query(({ ctx }) => {
    return ctx?.prisma?.center?.findMany();
  }),
});
