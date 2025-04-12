import { z } from "zod";
import { FeePlanSchema } from "~/pages/feePlans/AddPlan/AddPlan";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { FEE_PLAN_FEE_TYPE, FEE_PLAN_RECURRING_TYPE, LATE_FEE_TYPE } from "~/types/feePlan";
import type { RouterInputs } from "~/utils/api";

type CreateFeePlanInput = RouterInputs["feePlan"]["createFeePlan"];

export const feePlanRouter = createTRPCRouter({
  getAllFeePlans: publicProcedure
    .input(
      z.object({
        page: z.number().default(1),
        limit: z.number().default(10),
        search: z.string().optional(),
        feeTypes: z.array(z.string()).optional(),
        recurringTypes: z.array(z.string()).optional(),
        is: z.boolean().optional(),
        status: z.number().optional()
      })
    )
    .query(
      ({
        ctx,
        input,
      }) => {
        const {limit, page} = input
      const skip = (page - 1) * limit;

        // const {
        //   page = 1,
        //   limit =,
        //   search,
        //   feeTypes,
        //   recurringTypes,
        //   isFractionalFee,
        //   status,
        // } = input;
        // const listQuery = {
        //   skip: (page - 1) * limit,
        //   take: limit,
        //   where: {},
        //   orderBy: {
        //     createdAt: "desc",
        //   },
        // };
        // const countQuery = {
        //   where: {},
        // };
        // const trimmedSearch = search?.trim();
        // if (trimmedSearch) {
          // const val = {
          //   contains: trimmedSearch,
          // };
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          // listQuery.where?.description = val;
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          // countQuery.where.description = val;
        // }
        // if (feeTypes?.length) {
        //   const val = {
        //     in: feeTypes,
        //   };
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          // listQuery.where.feeType = val;
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          // countQuery.where.feeType = val;
        // }
        // if (recurringTypes?.length) {
        //   const val = {
        //     in: recurringTypes,
        //   };
        //   // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        //   listQuery.where.recurringType = val;
        //   // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        //   countQuery.where.recurringType = val;
        // }
        // if (typeof isProrata === "boolean") {
        //   // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        //   listQuery.where.isProrata = isProrata;
        // }

        // if (status) {
        //   // eslint-disable-next-line
        //   listQuery.where.status = status
        // }

        return Promise.all([
          // Query the database for total items
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          ctx.prisma.feePlans.count(),

          // Query the database for paginated items
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          ctx.prisma.feePlans.findMany(
            // {
            // ...listQuery,
            // select: {
            //   id: true,
            //   name: true,
            //   amount: true,
            //   feeType: true,
            //   isFractionalFee: true,
            //   recurringType: true,
            //   lateFeeType: true,
            //   lateFee: true,
            //   currency: true,
            //   status: true, // Ensure this field is explicitly selected
            //   createdAt: true,
            //   updatedAt: true,
            // },
          // }
          {
            skip,
            take: limit,
            orderBy: {
              createdAt: 'desc' 
            }
          }
        ),
        ]).then((result) => {
          const totalItems = result[0];
          // const data = result[1];

          // Calculate total pages
          const totalPages = Math.ceil(totalItems / limit);

          return {
              data: result[1],
              totalItems,
              itemCount: result[1].length,
              itemsPerPage: limit,
              totalPages,
              currentPage: page,
          };
        });
      }
    ),
  getFeePlanById: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(async (opts) => {
      try {
        const feePlans = await opts.ctx?.prisma?.feePlans?.findUnique({
          where: {
            id: opts.input.id,
          },
        });

        return feePlans;
      } catch (error) { }
    }),
  createFeePlan: publicProcedure
    .input(FeePlanSchema)
    .mutation(
      async ({
        input: { name, amount, feeType, isFractionalFee, recurringType, isLateFee, lateFeeType, lateFee, currency, status },
        ctx,
      }) => {
        const dataToSave = {
          name,
          amount,
          feeType,
          isFractionalFee,
          createdAt: new Date(),
          updatedAt: new Date(),
          recurringType,
          lateFeeType,
          lateFee,
          currency: currency ?? "INR",
          isLateFee
        };

        const feePlan = await ctx.prisma.feePlans.create({
          data: dataToSave,
        });

        return feePlan;
      }
    ),
  editFeePlan: publicProcedure
    .input(FeePlanSchema)
    .mutation(
      async ({
        input: { id, name, amount, feeType, isFractionalFee, recurringType, isLateFee, lateFeeType, lateFee },
        ctx,
      }) => {
        const dataToSave = {
          name,
          amount,
          feeType,
          isLateFee,
          isFractionalFee: !!isFractionalFee,
          updatedAt: new Date(),
          createdAt: new Date(),
          lateFeeType,
          recurringType,
          lateFee
        };

        const response = await ctx.prisma.feePlans.update({
          where: {
            id: id,
          },
          data: dataToSave,
        });

        return response;
      }
    ),
  deleteFeePlan: publicProcedure
    .input(
      z.object({
        feePlanId: z.number(),
      })
    )
    .mutation(async ({ input: { feePlanId }, ctx }) => {
      const response = await ctx.prisma.feePlans.delete({
        where: {
          id: feePlanId,
        },
      });

      return response;
    }),
});
