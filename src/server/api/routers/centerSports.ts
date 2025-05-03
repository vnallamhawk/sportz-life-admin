import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  // protectedProcedure,
} from "~/server/api/trpc";


const centerSportSchema = z.object({
  centerId: z.number(),
  sportId: z.number(),
  academyId: z.number(),
  id: z.number().optional(),
})

// Now add this object into an array
const centerSportInfoSchema = z.array(centerSportSchema)

// Now add this object into an array
export const centerSportsRouter = createTRPCRouter({
  getCenterSports: publicProcedure
    .input(
      z.object({
        centerId: z.number(),
      })
    )
    .query(async (opts) => {
      try {
        const centerSports = await opts.ctx?.prisma?.centerSports?.findMany({
          where: {
            centerId: opts.input.centerId,
          }
        });

        return centerSports;
      } catch (error) {
        console.error(error)
      }
    }),
  createCenterSports: publicProcedure.input(centerSportInfoSchema).mutation(async ({ input: data, ctx }) => {
    const upsertPromises = data.map((item) => {
      if (item.id) {
        // If `id` exists, perform upsert
        return ctx.prisma.centerSports.upsert({
          where: { id: item.id }, // Use `id` as a unique identifier
          create: item,
          update: item,
        });
      } else {
        // If `id` is missing, create a new record instead
        return ctx.prisma.centerSports.create({
          data: item,
        });
      }
    });

    // Execute all upserts and creates concurrently
    const response = await Promise.all(upsertPromises);

    return response;
  }),
});
