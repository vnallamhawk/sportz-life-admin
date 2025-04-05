import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";


const assignedAthletesSchema = z.object({
    athleteId: z.number(),
    assessmentId: z.number(),
    createdAt: z.date(),
    updatedAt: z.date()
})

// Now add this object into an array
const assignedAthletesInfoSchema = z.array(assignedAthletesSchema)


export const assessmentAssignedAthletesRouter = createTRPCRouter({

    createMany: publicProcedure
        .input(assignedAthletesInfoSchema)
        .mutation(async ({ input: data, ctx }) => {
            const response = await ctx.prisma.assessmentAssignedAthletes.createMany({
                data,
            });
            return response;
        }),
})