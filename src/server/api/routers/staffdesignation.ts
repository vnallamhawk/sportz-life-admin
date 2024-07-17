import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  // protectedProcedure,
} from "~/server/api/trpc";

export const staffDesignationRouter = createTRPCRouter({
  getAllDesignation: publicProcedure.query(({ ctx }) => {
    const allDesignation = ctx?.prisma.staffDesignation?.findMany({
      where: {
        deletedAt: null,
        createdBy: ctx.session.token.id,
      },
      // include: {
      //   CoachSportsMaps: true,
      // },
    });
    return allDesignation;
  }),
  createStaffDesignation: publicProcedure
    .input(
      z.object({
        designation: z.string(),
        createdBy: z.number(),
      })
    )
    .mutation(async ({ input: { designation, createdBy }, ctx }) => {
      const response = await ctx.prisma.staffDesignation.create({
        data: {
          designation,
          createdBy: createdBy,
        },
      });
      return response;
    }),
});
