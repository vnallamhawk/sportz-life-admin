import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  // protectedProcedure,
} from "~/server/api/trpc";

// Now add this object into an array

export const staffRouter = createTRPCRouter({
  getAllStaffs: publicProcedure.query(({ ctx }) => {
    const allStaffs = ctx?.prisma?.staff?.findMany();
    return allStaffs;
  }),
  getAllStaffsByName: publicProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .query(async (opts) => {
      const staffs = await opts.ctx?.prisma?.staff?.findMany({
        where: {
          name: {
            contains: opts.input.name,
          },
        },
        include: {
          center: true,
        },
      });

      console.log(staffs);
      return staffs;
    }),
});
