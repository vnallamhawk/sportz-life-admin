import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  // protectedProcedure,
} from "~/server/api/trpc";


const coachBatchesSchema = z.object({
  coachId: z.number(),
  batchId:z.number(),
  centerId :z.number(),   
  })
  
  // Now add this object into an array
  const coachBatchesInfoSchema = z.array(coachBatchesSchema)

// Now add this object into an array

export const coachBatchesRouter = createTRPCRouter({
  createCoachbatches: publicProcedure
    .input(coachBatchesInfoSchema)
    .mutation(
      async ({
        input: data,
        ctx,
      }) => {
        const response = await ctx.prisma.coachCentersBatches.createMany({
          data,
        });
        return response;
      }
    )
});
