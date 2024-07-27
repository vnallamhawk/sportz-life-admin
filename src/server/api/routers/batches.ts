import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const batchRouter = createTRPCRouter({
  getAllBatches: publicProcedure.query(({ ctx }) => {
    return ctx?.prisma?.batches?.findMany();
  }),
  createBatch: publicProcedure
  .input(
    z.object({
      name: z.string(),
      capacity:z.number(),                
      price:z.number(),                   
      sportId:z.number(),                
      centerId:z.number(),
      remainingSeat:z.number(),        
      academyId:z.number(),
      createdAt:z.date(),
      updatedAt:z.date(),
      occupiedSeat:z.number()
    })
  )
  .mutation(
    async ({
      input: {
        name,
        capacity,
        price,
        sportId,
        centerId,
        remainingSeat,        
        academyId,
        createdAt,
        updatedAt,
        occupiedSeat
      },
      ctx,
    }) => {
      const response = await ctx.prisma.batches.create({
        data: {
          name: name,
          capacity:capacity,
          price: price,
          sportId: sportId,
          centerId:centerId,
          remainingSeat,        
          academyId,
          createdAt,
          updatedAt,
          occupiedSeat
        },
      });
      return response;
    }
  ),
});
