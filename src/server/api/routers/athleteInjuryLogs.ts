import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  // protectedProcedure,
} from "~/server/api/trpc";

export const coachRouter = createTRPCRouter({
  getAllAthleteInjuries: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.injuryLogs.findMany()
  })
})
