import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  // protectedProcedure,
} from "~/server/api/trpc";


const centerSportSchema = z.object({
    centerId: z.number(),
    sportId:z.number()
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
        const response = await ctx.prisma.centerSports.createMany({
          data,
        });
        return response;
      }
    )
});
