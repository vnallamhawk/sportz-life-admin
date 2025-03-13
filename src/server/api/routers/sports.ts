import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  // protectedProcedure,
} from "~/server/api/trpc";

export const sportRouter = createTRPCRouter({
  getAllSports: publicProcedure.query(({ ctx }) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const allSports = ctx?.prisma?.sports?.findMany({});
    return allSports;
  }),
  createSports: publicProcedure
    .input(
      z.object({
        name: z.string(),
        about: z.string(),
        image: z.string(),
        subTitle: z.string(),
        // createdBy:z.number(),
        createdAt: z.date(),
        updatedAt: z.date()

      })
    )
    .mutation(
      async ({
        input: {
          name,
          about,
          subTitle,
          // createdBy,
          createdAt,
          updatedAt
        },
        ctx,
      }) => {
        const response = await ctx.prisma.sports.create({
          data: {
            name,
            about,
            subTitle,
            image: 'image',
            icon: "dscsd",
            // createdBy,
            createdAt,
            updatedAt
          },
        });
        return response;
      }
    ),
});
