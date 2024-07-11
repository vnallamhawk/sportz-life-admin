import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  // protectedProcedure,
} from "~/server/api/trpc";

export const inventoryRouter = createTRPCRouter({
  getAllInventories: publicProcedure.query(({ ctx }) => {
    const allInventories = ctx?.prisma?.inventories?.findMany();
    return allInventories;
  }),
  createInventory: publicProcedure
  .input(
    z.object({
      name: z.string(),
      category:z.string(),
    })
  )
  .mutation(
    async ({
      input: {
        name,
        category
      },
      ctx,
    }) => {
      const response = await ctx.prisma.inventories.create({
        data: {
          name,
          category
        },
      });
      return response;
    }
  ),});
