import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  // protectedProcedure,
} from "~/server/api/trpc";


const centerSportSchema = z.object({
    centerId: z.number(),
    sportId:z.number(),
    academyId:z.number(),
    id: z.number().optional(),
  })
  
  // Now add this object into an array
  const centerSportInfoSchema = z.array(centerSportSchema)

// Now add this object into an array

export const centerSportsRouter = createTRPCRouter({
    createCenterSports: publicProcedure
  .input(centerSportInfoSchema)
  .mutation(
    async ({
      input: data,
      ctx,
    }) => {
      // Perform an upsert for each item in the data array
      const upsertPromises = data.map((item) =>
        ctx.prisma.centerSports.upsert({
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
