import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";



export const testsRouter = createTRPCRouter({
    getAllTests: publicProcedure.query(({ ctx }) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        const allTests = ctx?.prisma?.tests?.findMany({});
        return allTests;
    }),

    getTestByAcademyId: publicProcedure
        .input(
            z.object({
                id: z.number(),
            })
        )
        .query(async (opts) => {
            try {
                const resp = await opts.ctx?.prisma?.tests?.findMany({
                    where: {
                        academyId: opts.input.id,
                    },
                    include: {
                        Sports: true
                    }
                });

                return resp;
            } catch (error) { 
                console.error(error)
            }
        }),

})