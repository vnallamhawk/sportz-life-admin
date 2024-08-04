import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";


const batchTimingSchema = z.object({
  day:z.enum(["mon",
    "tue",
    "wed",
    "thu",
    "fri",
    "sat",
    "sun"]),                
  batchId:z.number(),                
  startTime: z.string(),
  endTime: z.string(),
  createdAt:z.date(),
  updatedAt:z.date(),
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
