import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  // protectedProcedure,
} from "~/server/api/trpc";


const athleteBatchesSchema = z.object({
  athleteId: z.number(),
  sportId: z.number(),
  batchId: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
  centerId: z.number()
})

// Now add this object into an array
const athleteBatchesInfoSchema = z.array(athleteBatchesSchema)

// Now add this object into an array

export const athleteBatchesRouter = createTRPCRouter({
  // Create athlete batches
  createAthletebatches: publicProcedure
    .input(athleteBatchesInfoSchema)
    .mutation(async ({ input: data, ctx }) => {
      const response = await ctx.prisma.athleteBatchesMaps.createMany({
        data,
      });
      return response;
    }),

  // Get athletes based on batchId
  getAthletesByBatchId: publicProcedure
    .query(async ({ ctx }) => {
      const athletes = await ctx.prisma.athleteBatchesMaps.findMany({
        include: {
          Athletes: true, // Assuming you have an `athlete` relation in Prisma
        },
      });

      return athletes.map((athleteBatch) => ({
        id: athleteBatch.Athletes.id,
        name: athleteBatch.Athletes.name, // Adjust fields based on your DB schema
        batchId: athleteBatch.batchId,
      }));
    }),
});
