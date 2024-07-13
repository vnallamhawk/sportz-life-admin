import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  // protectedProcedure,
} from "~/server/api/trpc";

export const sportRouter = createTRPCRouter({
  getAllSports: publicProcedure.query(({ ctx }) => {
    const allSports = ctx?.prisma?.sports?.findMany({where:{createdBy:ctx.session.token.id}});
    return allSports;
  }),
  createSports: publicProcedure
  .input(
    z.object({
      name: z.string(),
      about:z.string(),
      image: z.string(),
      subTitle:z.string(),
      createdBy:z.number()
    })
  )
  .mutation(
    async ({
      input: {
        name,
        about,
        subTitle,
        image,createdBy
      },
      ctx,
    }) => {
      const response = await ctx.prisma.sports.create({
        data: {
          name,
          about,
          subTitle,
          image: 'image',
          icon:"dscsd",
          createdBy
        },
      });
      return response;
    }
  ),});
