import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  // protectedProcedure,
} from "~/server/api/trpc";

const certificatesSchema = z.array(
  z.object({
    instituteName: z.string(),
    name: z.string(),
    startDate: z.date(),
    endDate: z.date(),
  })
);
const inventorySchema = z.object({
    name: z.string(),
    quantity: z.number(),
    centerId: z.number()
  })
  
  // Now add this object into an array
  const inventoryInfoSchema = z.array(inventorySchema)
const coachingSportsSchema = z.array(
  z.object({
    label: z.string(),
    value: z.union([z.string(), z.number()]),
  })
);

// Now add this object into an array

export const inventoryRouter = createTRPCRouter({
  createInventory: publicProcedure
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
