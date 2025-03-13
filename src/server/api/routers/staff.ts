import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  // protectedProcedure,
} from "~/server/api/trpc";
import { GENDER_VALUES } from "~/types/coach";

// Now add this object into an array

export const staffRouter = createTRPCRouter({
  getAllStaffs: publicProcedure.input(z.object({ createdBy: z.number() })).query(async (opts) => {
    const allStaffs = await opts.ctx?.prisma?.staffs?.findMany({
      // include: {
      //   // StaffDesignation:true,
      //   Centers:true

      // },
    });
    return allStaffs;
  }),
  getStaffById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async (opts) => {
      const staff = await opts.ctx?.prisma?.staffs?.findUnique({
        where: {
          id: opts.input.id,
        },
        // include: {
        //   StaffDesignation:true

        // },
      });
      return staff;
    }),
  getAllStaffsByName: publicProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .query(async (opts) => {
      const staffs = await opts.ctx?.prisma?.staffs?.findMany({
        where: {
          name: {
            contains: opts.input.name,
          },
        },
        // include: {
        //   StaffDesignation:true,
        //   Centers:true

        // },
      });

      return staffs;
    }),
  createStaff: publicProcedure
    .input(
      z.object({
        name: z.string(),
        // designationId: z.number(),
        phone: z.string(),
        email: z.string(),
        // dateOfBirth: z.date(),
        // gender: z.enum(GENDER_VALUES),
        image: z.string(),
        // payrollId: z.number(),
        // centerId: z.number(),
        // createdBy: z.number(),
        createdAt: z.date(),
        updatedAt: z.date()
      })
    )
    .mutation(
      async ({
        input: {
          name,
          // designationId,
          phone,
          // dateOfBirth,
          email,
          // gender,
          // payrollId,
          // centerId,
          // createdBy,
          createdAt,
          updatedAt,
          image
        },
        ctx,
      }) => {
        const response = await ctx.prisma.staffs.create({
          data: {
            name: name,
            image: image,
            // designationId: designationId,
            email: email,
            phone: phone,
            // gender:gender,
            // payrollId:payrollId,
            // centerId:centerId,
            // dateOfBirth: dateOfBirth,
            // createdBy: createdBy,
            createdAt,
            updatedAt
          },
        });
        return response;
      }
    ),
  editStaff: publicProcedure
    .input(
      z.object({
        name: z.string(),
        designationId: z.number(),
        phone: z.string(),
        email: z.string(),
        // dateOfBirth: z.date(),
        // gender: z.enum(GENDER_VALUES),
        image: z.string(),
        // payrollId: z.number(),
        // centerId: z.number(),
        updatedAt: z.date(),
        staffId: z.number()
      })
    )
    .mutation(
      async ({
        input: {
          name,
          // designationId,
          phone,
          // dateOfBirth,
          email,
          // gender,
          // payrollId,
          // centerId,
          updatedAt,
          staffId,
          image
        },
        ctx,
      }) => {
        const response = await ctx.prisma.staffs.update({
          where: {
            id: staffId,
          },
          data: {
            name: name,
            image: image,
            // designationId: designationId,
            email: email,
            phone: phone,
            // gender:gender,
            // payrollId:payrollId,
            // centerId:centerId,
            // dateOfBirth: dateOfBirth,
            updatedAt
          },
        });

        return response;
      }
    ),
  deleteStaff: publicProcedure
    .input(
      z.object({
        staffId: z.number(),
        deletedAt: z.string(),
      })
    )
    .mutation(async ({ input: { staffId, deletedAt }, ctx }) => {
      const response = await ctx.prisma.staffs.update({
        where: {
          id: staffId,
        },
        data: {
          updatedAt: deletedAt,
        },
      });


      return response;
    }),
});
