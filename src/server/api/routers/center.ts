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

export const centerRouter = createTRPCRouter({
  getAllCenters: publicProcedure.query(({ ctx }) => {
    const allCenters = ctx?.prisma.centers?.findMany({
      where: {
        deletedAt: null,
        createdBy: ctx?.session?.token?.id
      },
      include: {
        Batches: true,
        CenterSports: {
          include: {
            Sports: true
          }
        }
      },
    });
    return allCenters;
  }),
  getAllCentersWithPagination: publicProcedure
    .input(
      z.object({
        page: z.number().min(1), // Ensures the page is at least 1
        limit: z.number().min(1).max(100), // Controls the number of records per page
        sortOrder: z.enum(["asc", "desc"]).optional().default("desc"), // Sorting order
      })
    )
    .query(async ({ ctx, input }) => {
      const { page, limit, sortOrder } = input;
      const skip = (page - 1) * limit; // Calculate the offset

      const [centers, total] = await Promise.all([
        ctx.prisma.centers.findMany({
          where: {
            deletedAt: null,
            createdBy: ctx?.session?.token?.id,
          },
          include: {
            Batches: true,
            CenterSports: {
              include: {
                Sports: true,
              },
            },
          },
          skip,
          take: limit,
          orderBy: {
            createdAt: sortOrder, // Sort by createdAt (ascending or descending)
          },
        }),
        ctx.prisma.centers.count({
          where: {
            deletedAt: null,
            createdBy: ctx?.session?.token?.id,
          },
        }),
      ]);

      return {
        data: centers,
        total,
        page,
        totalPages: Math.ceil(total / limit),
      };
    }),

  getCenterById: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(async (opts) => {
      try {
        const centers = await opts.ctx?.prisma?.centers?.findUnique({
          where: {
            id: opts.input.id,
          },
          include: {
            CenterSports: {
              include: {
                Sports: true
              }
            },
            CenterInventories: {
              include: {
                Inventories: true
              }
            }

          },
        });

        return centers;
      } catch (error) {
      }
    }),
  getCentersByName: publicProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .query(async (opts) => {
      const centers = await opts.ctx?.prisma?.centers?.findMany({
        where: {
          name: {
            contains: opts.input.name,
          },
        },
        include: {
          // Centers: true,
          Batches: true,
          CenterSports: {
            include: {
              Sports: true
            }
          }
          // sports: true,
          // batches: true,
          // centers: true,
        },
      });

      return centers;
    }),
  createCenter: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string(),
        image: z.string(),
        mobile: z.string(),
        address: z.string(),
        createdBy: z.number(),
        academyId: z.number(),
        createdAt: z.date(),
        updatedAt: z.date()
      })
    )
    .mutation(
      async ({
        input: {
          name,
          mobile,
          email,
          address,
          createdBy,
          academyId,
          createdAt,
          updatedAt
        },
        ctx,
      }) => {
        const response = await ctx.prisma.centers.create({
          data: {
            name: name,
            email: email,
            mobile: mobile,
            address: address,
            // createdBy:createdBy,
            academyId: academyId,
            createdAt,
            updatedAt
          },
        });
        return response;
      }
    ),
  editCenter: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string(),
        image: z.string(),
        mobile: z.string(),
        address: z.string(),
        centerId: z.number(),
        updatedAt: z.date()
      })
    )
    .mutation(
      async ({
        input: {
          name,
          mobile,
          email,
          address,
          centerId,
          updatedAt
        },
        ctx,
      }) => {
        const response = await ctx.prisma.centers.update({
          where: {
            id: centerId,
          },
          data: {
            name: name,
            email: email,
            mobile: mobile,
            address: address,
            updatedAt: updatedAt
          },
        });

        return response;
      }
    ),
  deleteCenter: publicProcedure
    .input(
      z.object({

        centerId: z.number(),
        deletedAt: z.string(),
      })
    )
    .mutation(
      async ({
        input: {
          centerId,
          deletedAt
        },
        ctx,
      }) => {

        const response = await ctx.prisma.centers.update({
          where: {
            id: centerId,
          },
          data: {
            deletedAt
          },
        });

        return response;
      }
    ),
});
