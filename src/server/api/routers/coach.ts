// import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  // protectedProcedure,
} from "~/server/api/trpc";

export const coachRouter = createTRPCRouter({
  getAllCoaches: publicProcedure.query(({ ctx }) => {
    const allCoaches = ctx?.prisma?.coach?.findMany({
      include: {
        batch: true,
        sports: true,
      },
    });
    return allCoaches;
  }),

  // getSecretMessage: protectedProcedure.query(() => {
  //   return "you can now see this secret message!";
  // }),
});
