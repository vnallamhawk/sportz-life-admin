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


export const testBankRouter = createTRPCRouter({
    getAllTestBanks: publicProcedure.query(({ ctx }) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        const allTestBanks = ctx?.prisma?.testBanks?.findMany({});
        return allTestBanks;
    }),

    createMany: publicProcedure
        .input(testbanksInfoSchema)
        .mutation(async ({ input: data, ctx }) => {
            const response = await ctx.prisma.testBanks.createMany({
                data,
            });
            return response;
        }),
})