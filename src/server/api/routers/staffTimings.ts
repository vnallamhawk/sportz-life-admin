import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";


const staffTimingSchema = z.object({
  day:z.string(), 
  shift:z.string(),                               
  staffId:z.number(),                
  startTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/),
  endTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/),
})

// Now add this object into an array
const staffTimingInfoSchema = z.array(staffTimingSchema)

export const staffTimingRouter = createTRPCRouter({
  getAllStaffTimings: publicProcedure.query(({ ctx }) => {
    return ctx?.prisma?.staffShifts?.findMany();
  }),
  createStaffTiming: publicProcedure
  .input(staffTimingInfoSchema)
  .mutation(
    async ({
      input: data,
      ctx,
    }) => {
      const response = await ctx.prisma.staffShifts.createMany({
        data,
      });
      return response;
    }
  ),
});
