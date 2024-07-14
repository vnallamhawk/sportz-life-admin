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
      centerId:z.number() 
    })
  )
  .mutation(
    async ({
      input: {
        name,
        capacity,
        price,
        sportId,
        centerId
      },
      ctx,
    }) => {
      const response = await ctx.prisma.batches.create({
        data: {
          name: name,
          capacity:capacity,
          price: price,
          sportId: sportId,
          centerId:centerId
        },
      });
      return response;
    }
  ),
});
