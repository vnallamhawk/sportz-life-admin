import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { FEE_PLAN_FEE_TYPE, FEE_PLAN_RECURRING_TYPE, LATE_FEE_TYPE } from "~/types/feePlan";

export const feePlanRouter = createTRPCRouter({
  getAllFeePlans: publicProcedure
    .input(
      z.object({
        page: z.number().default(1),
        limit: z.number().default(10),
        search: z.string().optional(),
        feeTypes: z.array(z.string()).optional(),
        recurringTypes: z.array(z.string()).optional(),
        isProrata: z.boolean().optional(),
        status: z.number().optional()
      })
    )
    .query(
      ({
        ctx,
        input: { page, limit, search, feeTypes, recurringTypes, isProrata, status },
      }) => {
        const listQuery: any = {
          skip: (page - 1) * limit,
          take: limit,
          where: {},
          orderBy: {
            createdAt: "desc",
          },
        };
        const countQuery: any = {
          where: {},
        };
        const trimmedSearch = search?.trim();
        if (trimmedSearch) {
          const val = {
            contains: trimmedSearch,
          };
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          listQuery.where.description = val;
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          countQuery.where.description = val;
        }
        if (feeTypes?.length) {
          const val = {
            in: feeTypes,
          };
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          listQuery.where.feeType = val;
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          countQuery.where.feeType = val;
        }
        if (recurringTypes?.length) {
          const val = {
            in: recurringTypes,
          };
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          listQuery.where.recurringType = val;
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          countQuery.where.recurringType = val;
        }
        if (typeof isProrata === "boolean") {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          listQuery.where.isProrata = isProrata;
        }

        if (status) {
          // eslint-disable-next-line
          listQuery.where.status = status
        }

        return Promise.all([
          // Query the database for total items
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          ctx.prisma.feePlans.count(countQuery),

          // Query the database for paginated items
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          ctx.prisma.feePlans.findMany({
            // ...listQuery,
            select: {
              id: true,
              name: true,
              amount: true,
              feeType: true,
              // isProrata: true,
              recurringType: true,
              // isLate: true,
              lateFeeType: true,
              lateFee: true,
              // createdBy: true,
              currency: true,
              status: true, // Ensure this field is explicitly selected
              createdAt: true,
              updatedAt: true,
            },
          }),
        ]).then((result) => {
          const totalItems = result[0];
          const data = result[1];

          // Calculate total pages
          const totalPages = Math.ceil(totalItems / limit);

          return {
            data,
            meta: {
              totalItems,
              itemCount: data.length,
              itemsPerPage: limit,
              totalPages,
              currentPage: page,
            },
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
    .input(
      z.object({
        name: z.string(),
        amount: z.number(),
        feeType: z.enum(FEE_PLAN_FEE_TYPE),
        isProrata: z.boolean().optional(),
        recurringType: z.enum(FEE_PLAN_RECURRING_TYPE),
        isLate: z.boolean().optional(),
        lateFeeType: z.enum(LATE_FEE_TYPE).optional(),
        lateFee: z.number().optional(),
        createdBy: z.number(),
        currency: z.string().optional(),
        status: z.number().optional()
      })
    )
    .mutation(
      async ({
        input: { name, amount, feeType, isProrata, recurringType, isLate, lateFeeType, lateFee, currency, createdBy, status },
        ctx,
      }) => {
        const dataToSave = {
          name,
          amount,
          feeType,
          // isProrata: !!isProrata,
          createdAt: new Date(),
          updatedAt: new Date(),
          recurringType,
          // isLate: !!isLate,
          lateFeeType,
          lateFee,
          currency: currency ?? "USD", // ✅ Provide a default value
          // createdBy,
          // status: status || 1
        };

        const feePlan = await ctx.prisma.feePlans.create({
          data: dataToSave,
        });

        return feePlan;
      }
    ),
  editFeePlan: publicProcedure
    .input(
      z.object({
        feePlanId: z.number(),
        name: z.string(),
        amount: z.number(),
        feeType: z.enum(FEE_PLAN_FEE_TYPE),
        isProrata: z.boolean().optional(),
        recurringType: z.enum(FEE_PLAN_RECURRING_TYPE).optional(),
      })
    )
    .mutation(
      async ({
        input: { feePlanId, name, amount, feeType, isProrata, recurringType },
        ctx,
      }) => {
        const dataToSave: { [key: string]: any } = {
          name,
          amount,
          feeType,
          isProrata: !!isProrata,
          updatedAt: new Date(),
        };

        if (recurringType) {
          dataToSave.recurringType = recurringType;
        }
        const response = await ctx.prisma.feePlans.update({
          where: {
            id: feePlanId,
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
