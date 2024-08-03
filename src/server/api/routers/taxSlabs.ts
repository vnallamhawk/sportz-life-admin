import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  // protectedProcedure,
} from "~/server/api/trpc";


export const taxSlabRouter = createTRPCRouter({
  getAllTaxSlab: publicProcedure.query(({ ctx }) => {
    const allSlabs = ctx?.prisma.taxSlabs?.findMany({
      where:{
        deletedAt:null,
        createdBy:ctx?.session?.token?.id
      }
      // include: {
      //   CoachSportsMaps: true,
      // },
    });
    return allSlabs;
  }),
  createTaxSlab: publicProcedure
    .input(
      z.object({
        fromAmount:z.number(),
        toAmount:z.number(),
        percentage:z.number(),
        createdBy:z.number()
      })
    )
    .mutation(
      async ({
        input: {
          fromAmount,
          toAmount,
          percentage,
          createdBy
        },
        ctx,
      }) => {
        const response = await ctx.prisma.taxSlabs.create({
          data: {
            fromAmount,
          toAmount,
          percentage,
            createdBy:createdBy
          },
        });
        return response;
      }
    )
});
