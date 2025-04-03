import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";


const testsSchema = z.object({
    assignedTestBankId: z.number(),
    testId: z.number(),
    createdAt: z.date(),
    updatedAt: z.date()
})

// Now add this object into an array
const testsInfoSchema = z.array(testsSchema)


export const assignedTestsRouter = createTRPCRouter({

    createMany: publicProcedure
        .input(testsInfoSchema)
        .mutation(async ({ input: data, ctx }) => {
            const response = await ctx.prisma.assignedTests.createMany({
                data,
            });
            return response;
        }),
})