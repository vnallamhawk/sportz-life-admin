import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  // protectedProcedure,
} from "~/server/api/trpc";

// Now add this object into an array

export const staffRouter = createTRPCRouter({
  getAllStaffs: publicProcedure.query(({ ctx }) => {
    const allStaffs = ctx?.prisma?.staffs?.findMany({
      where:{
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        createdBy:ctx?.session?.token.id

      },
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
        include: {
          center: true,
        },
      });

      return staffs;
    }),
  createStaff: publicProcedure
    .input(
      z.object({
        name: z.string(),
        designationId: z.number(),
        phone: z.string(),
        email: z.string(),
        dateOfBirth: z.date(),
        gender: z.string(),
        image: z.string(),
        payrollId: z.number(),
        centerId: z.number(),
        createdBy: z.number(),
      })
    )
    .mutation(
      async ({
        input: {
          name,
          designationId,
          phone,
          status,
          dateOfBirth,
          image,
          email,
          gender,
          payrollId,
          centerId,
          createdBy,
        },
        ctx,
      }) => {
        const response = await ctx.prisma.staffs.create({
          data: {
            name: name,
            image: "img1",
            designationId: designationId,
            email: email,
            phone: phone,
            gender:gender.toLowerCase(),
            payrollId:payrollId,
            centerId:centerId,
            dateOfBirth: dateOfBirth,
            createdBy: createdBy,
          },
        });
        return response;
      }
    ),
  editStaff: publicProcedure
    .input(
      z.object({
        name: z.string(),
        designation: z.string(),
        mobile: z.string(),
        email: z.string(),
        status: z.number(),
        age: z.string(),
        gender: z.string(),
        image: z.string(),
        payroll: z.string(),
        center: z.string(),
        createdBy: z.number(),
        staffId: z.number(),
      })
    )
    .mutation(
      async ({
        input: {
          name,
          designation,
          mobile,
          status,
          image,
          email,
          age,
          gender,
          payroll,
          center,
          createdBy,
          staffId,
        },
        ctx,
      }) => {
        const response = await ctx.prisma.staffs.update({
          where: {
            id: staffId,
          },
          data: {
            name: name,
            image: "img1",
            designation: designation,
            email: email,
            phone: mobile,
            status: status,
            age: age,
            createdBy: createdBy,
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
          deletedAt,
        },
      });

      return response;
    }),
});
