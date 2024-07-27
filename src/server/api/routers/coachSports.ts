import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  // protectedProcedure,
} from "~/server/api/trpc";


const coachSportSchema = z.object({
    coachId: z.number(),
    sportId:z.number(),
    createdAt:z.date(),
    updatedAt:z.date()
  })
  
  // Now add this object into an array
  const coachSportInfoSchema = z.array(coachSportSchema)

// Now add this object into an array

export const coachSportsRouter = createTRPCRouter({
  createCoachSports: publicProcedure
    .input(coachSportInfoSchema)
    .mutation(
      async ({
        input: data,
        ctx,
      }) => {
        const response = await ctx.prisma.coachSportsMaps.createMany({
          data,
        });
        return response;
      }
    )
});
