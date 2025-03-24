import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { ATHELETE_TRAININGLEVEL } from "~/types/batch";

export const batchRouter = createTRPCRouter({
  getAllBatches: publicProcedure.query(({ ctx }) => {
    const academyId =  Number(ctx?.session?.user.academyId)
    return ctx?.prisma?.batches?.findMany({
      where: {
        academyId: academyId,
      },
    });
  }),
  createBatch: publicProcedure
    .input(
      z.object({
        name: z.string(),
        capacity: z.number(),
        // price:z.number(),                   
        sportId: z.number(),
        centerId: z.number(),
        remainingSeat: z.number(),
        academyId: z.number(),
        createdAt: z.date(),
        updatedAt: z.date(),
        occupiedSeat: z.number(),
        feePlanId: z.number(),
        trainingLevel: z.enum(ATHELETE_TRAININGLEVEL),
      })
    )
    .mutation(
      async ({
        input: {
          name,
          capacity,
          // price,
          sportId,
          centerId,
          remainingSeat,
          academyId,
          createdAt,
          updatedAt,
          occupiedSeat,
          feePlanId, // Ensure this is included
          trainingLevel, // Ensure this is included
        },
        ctx,
      }) => {
        const response = await ctx.prisma.batches.create({
          data: {
            name: name,
            capacity: capacity,
            // price: price,
            sportId: sportId,
            centerId: centerId,
            remainingSeat,
            academyId,
            createdAt,
            updatedAt,
            occupiedSeat,
            feePlanId, // Ensure this is included
            trainingLevel, // Ensure this is included
          },
        });
        return response;
      }
    ),
});
