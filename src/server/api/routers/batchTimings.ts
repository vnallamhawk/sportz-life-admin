import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const batchTimingRouter = createTRPCRouter({
  getAllBatchTimings: publicProcedure.query(({ ctx }) => {
    return ctx?.prisma?.batchSchedules?.findMany();
  }),
  createBatchTiming: publicProcedure
  .input(
    z.object({
      day:z.string(),                
      batchId:z.number(),                
      startTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/),
      endTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/),
    })
  )
  .mutation(
    async ({
      input: {
        day,
        batchId,
        startTime,
        endTime
      },
      ctx,
    }) => {
      const response = await ctx.prisma.batchSchedules.create({
        data: {
            day: day,
          batchId:batchId,
          startTime: startTime,
          endTime:endTime
        },
      });
      return response;
    }
  ),
});
