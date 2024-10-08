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
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        createdBy:ctx?.session?.token?.id
      },
      include: {
        StaffDesignation: true,
      },
    });
    return allPayroll;
  }),
  createStaffPayroll: publicProcedure
    .input(
      z.object({
        taxable:z.boolean(),
        grossSalary:z.number(),   
        slabId :z.number().optional(),
        designationId:z.number(),
        tax_percent:z.number().optional(),
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
        const obj:any={taxable,
          grossSalary,
          slabId,
          designationId,
          netSalary,
          createdBy}
          if(slabId && tax_percent){
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            obj.slabId=slabId
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            obj.tax_percent=tax_percent
          }
        const response = await ctx.prisma.staffPayroll.create({
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          data: obj,
        });
        return response;
      }
    ),
    deletePayroll: publicProcedure
    .input(
      z.object({
        payrollId: z.number(),
        deletedAt: z.string(),
      })
    )
    .mutation(
      async ({
        input: {
          payrollId,
          deletedAt
        },
        ctx,
      }) => {

        const response = await ctx.prisma.staffPayroll.update({
          where: {
            id: payrollId,
          },
          data: {
            deletedAt
          },
        });

        return response;
      }
    ),

});
