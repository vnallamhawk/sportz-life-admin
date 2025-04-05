import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";


const testbanksSchema = z.object({
    assessmentId: z.number(),
    testBankId: z.number(),
    createdAt: z.date(),
    updatedAt: z.date()
})

// Now add this object into an array
const testbanksInfoSchema = z.array(testbanksSchema)


export const assignedTestBankRouter = createTRPCRouter({
    getAssignedTestBanksByAssessmentId: publicProcedure
        .input(
            z.object({
                id: z.number(),
            })
        )
        .query(async (opts) => {
            try {
                const assignedTestBanks = await opts.ctx?.prisma?.assignedTestBanks?.findMany({
                    where: {
                        assessmentId: opts.input.id,
                    }
                });

                return assignedTestBanks;
            } catch (error) { }
        }),

    createMany: publicProcedure
        .input(testbanksInfoSchema)
        .mutation(async ({ input: data, ctx }) => {
            const response = await ctx.prisma.assignedTestBanks.createMany({
                data,
            });
            return response;
        }),
})