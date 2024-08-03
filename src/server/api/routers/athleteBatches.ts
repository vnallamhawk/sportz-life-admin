import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  // protectedProcedure,
} from "~/server/api/trpc";


const athleteBatchesSchema = z.object({
  athleteId: z.number(),
  sportId:z.number(),
  batchId:z.number(),
  createdAt:z.date(),
  updatedAt:z.date(),
  })
  
  // Now add this object into an array
  const athleteBatchesInfoSchema = z.array(athleteBatchesSchema)

// Now add this object into an array

export const athleteBatchesRouter = createTRPCRouter({
  createAthletebatches: publicProcedure
    .input(athleteBatchesInfoSchema)
    .mutation(
      async ({
        input: data,
        ctx,
      }) => {
        const response = await ctx.prisma.athleteBatchesMaps.createMany({
          data,
        });
        return response;
      }
    )
});
