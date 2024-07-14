import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";


const batchTimingSchema = z.object({
  day:z.string(),                
  batchId:z.number(),                
  startTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/),
  endTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/),
})

// Now add this object into an array
const batchTimingInfoSchema = z.array(batchTimingSchema)

export const batchTimingRouter = createTRPCRouter({
  getAllBatchTimings: publicProcedure.query(({ ctx }) => {
    return ctx?.prisma?.batchSchedules?.findMany();
  }),
  createBatchTiming: publicProcedure
  .input(batchTimingInfoSchema)
  .mutation(
    async ({
      input: data,
      ctx,
    }) => {
      const response = await ctx.prisma.batchSchedules.createMany({
        data,
      });
      return response;
    }
  ),
});
