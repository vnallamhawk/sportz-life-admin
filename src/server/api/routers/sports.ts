import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  // protectedProcedure,
} from "~/server/api/trpc";

export const sportRouter = createTRPCRouter({
  getAllSports: publicProcedure.query(({ ctx }) => {
    const allSports = ctx?.prisma?.sports?.findMany();
    return allSports;
  }),
  createSports: publicProcedure
  .input(
    z.object({
      name: z.string(),
      about:z.string(),
      image: z.string(),
      subTitle:z.string()
    })
  )
  .mutation(
    async ({
      input: {
        name,
        about,
        subTitle,
        image
      },
      ctx,
    }) => {
      const response = await ctx.prisma.sports.create({
        data: {
          name,
          about,
          subTitle,
          image: 'image',
          icon:"dscsd"
        },
      });
      return response;
    }
  ),});
