import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";


const postSchema = z.object({
    academyId: z.number(),
    title: z.string(),
    imageLink: z.string(),
    postDetails: z.string(),
    showPost: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date()
})


export const postRouter = createTRPCRouter({

    getAll: publicProcedure.query(({ ctx }) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        const response = ctx?.prisma?.posts?.findMany({
            where: {
                showPost: true,
                academyId: Number(ctx?.session?.user.academyId),
            }
        });
        return response;
    }),

    create: publicProcedure
        .input(postSchema)
        .mutation(async ({ input: data, ctx }) => {
            const response = await ctx.prisma.posts.create({
                data,
            });
            return response;
        }),
})