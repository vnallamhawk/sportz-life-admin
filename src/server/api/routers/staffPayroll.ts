import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  // protectedProcedure,
} from "~/server/api/trpc";
// import { EXPERIENCE_LEVEL, GENDER_VALUES, TRAINING_LEVEL } from "~/types/coach";

// const certificatesSchema = z.array(
//   z.object({
//     instituteName: z.string(),
//     name: z.string(),
//     startDate: z.date(),
//     endDate: z.date(),
//   })
// );

// const coachingSportsSchema = z.array(
//   z.object({
//     label: z.string(),
//     value: z.union([z.string(), z.number()]),
//   })
// );

// Now add this object into an array

export const staffPayrollRouter = createTRPCRouter({
  getAllPayroll: publicProcedure.query(({ ctx }) => {
    const allPayroll = ctx?.prisma.staffPayroll?.findMany({
      where:{
        deletedAt:null,
        createdBy:ctx.session.token.id
      }
      // include: {
      //   CoachSportsMaps: true,
      // },
    });
    return allPayroll;
  }),
  createStaffPayroll: publicProcedure
    .input(
      z.object({
        taxable:z.boolean(),
        grossSalary:z.number(),   
        slabId :z.number(),
        designationId:z.number(),
        tax_percent:z.number(),
        netSalary:z.number(),
        createdBy:z.number()
      })
    )
    .mutation(
      async ({
        input: {
          taxable,
          grossSalary,
          slabId,
          designationId,
          tax_percent,
          netSalary,
          createdBy
        },
        ctx,
      }) => {
        const response = await ctx.prisma.staffPayroll.create({
          data: {
            taxable,
            grossSalary,
            slabId,
            designationId,
            tax_percent,
            netSalary,
            createdBy:createdBy
          },
        });
        return response;
      }
    )
});
