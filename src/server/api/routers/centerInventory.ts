import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  // protectedProcedure,
} from "~/server/api/trpc";


const inventorySchema = z.object({
    inventoryId: z.number(),
    quantity: z.number(),
    centerId: z.number()
  })
  
  // Now add this object into an array
  const inventoryInfoSchema = z.array(inventorySchema)


// Now add this object into an array

export const centerInventoryRouter = createTRPCRouter({
  createCenterInventory: publicProcedure
    .input(inventoryInfoSchema)
    .mutation(
      async ({
        input: data,
        ctx,
      }) => {
        const response = await ctx.prisma.inventories.createMany({
          data,
        });
        return response;
      }
    )
});
