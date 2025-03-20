import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  // protectedProcedure,
} from "~/server/api/trpc";
import { EXPERIENCE_LEVEL, GENDER_VALUES, TRAINING_LEVEL } from "~/types/coach";

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

export const coachRouter = createTRPCRouter({
  getAllCoaches: publicProcedure.query(({ ctx }) => {
    const allCoaches = ctx?.prisma.coaches?.findMany({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      where: {
        deletedAt: null,
      },
    });
    return allCoaches;
  }),

  getAllCoachesWithPagination: publicProcedure
    .input(
      z.object({
        page: z.number().min(1), // Ensures the page is at least 1
        limit: z.number().min(1).max(100), // Controls the number of records per page
        sortOrder: z.enum(["asc", "desc"]).optional().default("desc"), // Sorting order
        name: z.string().optional()
      })
    )
    .query(async ({ ctx, input }) => {
      const { page, limit, sortOrder, name} = input;
      const skip = (page - 1) * limit; 

      const whereCondition = {
        deletedAt: null,
        ...(name && {
          name: {
            contains: name,
          },
        }),
        academyId: Number(ctx?.session?. user.academyId),
      };

      const [coaches, total] = await Promise.all([
        ctx.prisma.coaches.findMany({
          where: whereCondition,
          include: {
            Centers: true,
            CoachCentersBatches: {
              include: {
                Batches: true, // Include Batches associated with the coach
              },
            },
            CoachSportsMaps: {
              include: {
                Sports: true, // Fetch the associated sports
              },
            },
            Batches: true, // Direct relation with batches
            CoachQualifications: true
          },
          skip,
          take: limit,
          orderBy: {
            createdAt: sortOrder, // Sort by createdAt (ascending or descending)
          },
        }),
        ctx.prisma.coaches.count({
          where: whereCondition
        }),
      ]);

      return {
        data: coaches,
        total,
        page,
        totalPages: Math.ceil(total / limit),
      };
    }),


  getCoachById: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(async (opts) => {
      try {
        const coaches = await opts.ctx?.prisma?.coaches?.findUnique({
          where: {
            id: opts.input.id,
          },
          include: {
            CoachSportsMaps: {
              include: {
                Sports: true, // Fetch the associated sports
              },
            },
            CoachQualifications: true
            // batches: true,
            // centers: true,
            // certificates: true,
          },
        });

        return coaches;
      } catch (error) {
      }
    }),
  // getCoachesByName: publicProcedure
  //   .input(
  //     z.object({
  //       name: z.string(),
  //     })
  //   )
  //   .query(async (opts) => {
  //     const coaches = await opts.ctx?.prisma?.coaches?.findMany({
  //       where: {
  //         name: {
  //           contains: opts.input.name,
  //         },
  //       },
  //       include: {
  //         CoachSportsMaps: true,
  //         Centers: true,
  //         Batches: true,
  //         // sports: true,
  //         // batches: true,
  //         // centers: true,
  //       },
  //     });

  //     return coaches;
  //   }),
  createCoach: publicProcedure
    .input(
      z.object({
        name: z.string(),
        phone: z.string(),
        email: z.string(),
        designation: z.string(),
        gender: z.enum(GENDER_VALUES),
        dateOfBirth: z.date(),
        trainingLevel: z.enum(TRAINING_LEVEL),
        createdBy: z.number(),
        createdAt: z.date(),
        updatedAt: z.date(),
        academyId: z.number(),
        image: z.string(),
        experience: z.string(),
        about: z.string(),
        experienceLevel: z.enum(EXPERIENCE_LEVEL),
        centerId: z.number()
      })
    )
    .mutation(
      async ({
        input: {
          name,
          phone,
          email,
          designation,
          gender,
          dateOfBirth,
          trainingLevel,
          createdAt,
          updatedAt,
          academyId,
          image,
          experience,
          about,
          experienceLevel,
          centerId
        },
        ctx,
      }) => {

        const response = await ctx.prisma.coaches.create({
          data: {
            name: name,
            phone: phone,
            email: email,
            designation: designation,
            gender: gender,
            dateOfBirth: dateOfBirth,
            trainingLevel: trainingLevel,
            createdAt,
            updatedAt,
            academyId,
            image,
            experience,
            about,
            experienceLevel,
            centerId
          },
        });
        return response;
      }
    ),
  editCoach: publicProcedure
    .input(
      z.object({
        name: z.string(),
        phone: z.string(),
        email: z.string(),
        designation: z.string(),
        gender: z.enum(GENDER_VALUES),
        dateOfBirth: z.date(),
        trainingLevel: z.enum(TRAINING_LEVEL),
        updatedAt: z.date(),
        academyId: z.number(),
        image: z.string(),
        coachId: z.number()
      })
    )
    .mutation(
      async ({
        input: {
          name,
          phone,
          email,
          designation,
          gender,
          dateOfBirth,
          trainingLevel,
          updatedAt,
          academyId,
          image,
          coachId
        },
        ctx,
      }) => {
        const response = await ctx.prisma.coaches.update({
          where: {
            id: coachId,
          },
          data: {
            name: name,
            phone: phone,
            email: email,
            designation: designation,
            gender: gender,
            dateOfBirth: dateOfBirth,
            trainingLevel: trainingLevel,
            updatedAt,
            academyId,
            image
          },
        });

        return response;
      }
    ),

  deleteCoach: publicProcedure
    .input(
      z.object({
        coachId: z.number(),
        deletedAt: z.string(),
      })
    )
    .mutation(
      async ({
        input: {
          coachId,
          deletedAt
        },
        ctx,
      }) => {

        const response = await ctx.prisma.coaches.update({
          where: {
            id: coachId,
          },
          data: {
            deletedAt
          },
        });

        return response;
      }
    ),

  // getSecretMessage: protectedProcedure.query(() => {
  //   return "you can now see this secret message!";
  // }),
});
