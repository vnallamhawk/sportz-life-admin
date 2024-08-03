import { z } from "zod";
import athlete from "~/pages/athlete";
import {
  createTRPCRouter,
  publicProcedure,
  // protectedProcedure,
} from "~/server/api/trpc";


const athleteSportSchema = z.object({
    athleteId: z.number(),
    sportsId:z.number(),
    trainingLevel:z.enum(["beginner",
  "intermediate",
  "advanced",
  "developer"]),
    createdAt:z.date(),
    updatedAt:z.date(),
    centerId:z.number(),
    batchId:z.number()
  })
  
  // Now add this object into an array
  const athleteSportInfoSchema = z.array(athleteSportSchema)

// Now add this object into an array

export const athleteSportsRouter = createTRPCRouter({
  createAthleteSports: publicProcedure
    .input(athleteSportInfoSchema)
    .mutation(
      async ({
        input: data,
        ctx,
      }) => {
        const response = await ctx.prisma.athleteSportsMaps.createMany({
          data,
        });
        return response;
      }
    )
});
