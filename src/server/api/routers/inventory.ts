import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  // protectedProcedure,
} from "~/server/api/trpc";

export const inventoryRouter = createTRPCRouter({
  getAllInventories: publicProcedure.query(({ ctx }) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const allInventories = ctx?.prisma?.inventories?.findMany({where:{createdBy:ctx?.session?.token?.id}});
    return allInventories;
  }),
  createInventory: publicProcedure
  .input(
    z.object({
      name: z.string(),
      category:z.string(),
      createdBy:z.number().optional().default(undefined)
    })
  )
  .mutation(
    async ({
      input: {
        name,
        category,
        createdBy
      },
      ctx,
    }) => {
      const response = await ctx.prisma.inventories.create({
        data: {
          name,
          category,
          createdBy
        },
      });
      return response;
    }
  ),});
