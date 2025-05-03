import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  // protectedProcedure,
} from "~/server/api/trpc";


const inventorySchema = z.object({
  inventoryId: z.number(),
  quantity: z.number(),
  centerId: z.number(),
  id: z.number().optional()
})

// Now add this object into an array
const inventoryInfoSchema = z.array(inventorySchema)


// Now add this object into an array

export const centerInventoryRouter = createTRPCRouter({
  getCenterInventories: publicProcedure
    .input(
      z.object({
        centerId: z.number(),
      })
    )
    .query(async (opts) => {
      try {
        const centerInventories = await opts.ctx?.prisma?.centerInventories?.findMany({
          where: {
            centerId: opts.input.centerId,
          },
          include: {
            Inventories: true
          }
        });

        return centerInventories;
      } catch (error) {
        console.error(error)
      }
    }),
  getAllCenterInventory: publicProcedure.query(({ ctx }) => {
    const getAllCenterInventories = ctx?.prisma?.centerInventories?.findMany({
      include: {
        Inventories: true
      }
    });
    return getAllCenterInventories;
  }),

  createCenterInventory: publicProcedure
    .input(inventoryInfoSchema)
    .mutation(
      async ({
        input: data,
        ctx,
      }) => {
        // Perform an upsert for each item in the data array
        const upsertPromises = data.map((item) =>
          ctx.prisma.centerInventories.upsert({
            where: {
              // Replace 'id' with the unique identifier for your centerSports model
              id: item.id,
            },
            create: item,
            update: item,
          })
        );

        // Execute all upserts concurrently
        const response = await Promise.all(upsertPromises);

        return response;
      }
    )
});
