import { CoachQualifications_certificateType, CoachQualifications_fileType } from "@prisma/client";
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

  getCoachesDataByAcademyId: publicProcedure.query(({ ctx }) => {
    const allAthletes = ctx?.prisma.coaches?.findMany({
      where: {
        academyId: Number(ctx?.session?.user.academyId)
      },
      include: {
        Centers: true,
        CoachSportsMaps: {
          include: {
            Sports: true
          }
        }
      },
    });
    return allAthletes;
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
      const { page, limit, sortOrder, name } = input;
      const skip = (page - 1) * limit;

      const whereCondition = {
        deletedAt: null,
        ...(name && {
          name: {
            contains: name,
          },
        }),
        academyId: Number(ctx?.session?.user.academyId),
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
                Sports: true,
              },
            },
            CoachQualifications: true,
            CoachCentersBatches: {
              include: {
                Centers: { select: { name: true } }, 
                Batches: { select: { name: true } },  
              },
            }
          },
        });
        
         // Keep all original data, but restructure CoachCentersBatches
    return {
      ...coaches,
      CoachCentersBatches: coaches?.CoachCentersBatches?.map((cb) => ({
        ...cb,
        centerName: cb.Centers?.name,
        batchName: cb.Batches?.name, 
      })),  
    };
      } catch (error) {
      }
    }),
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
        image: z.string().optional(),
        experience: z.string(),
        about: z.string(),
        experienceLevel: z.enum(EXPERIENCE_LEVEL),
        centerId: z.number(),
        sports: z.array(z.number()),
        coachQualifications: z.array(
          z.object({
            certificateType: z.nativeEnum(CoachQualifications_certificateType),
            startDate: z.date(),
            endDate: z.date(),
            fileUrl: z.string(),
            instituteName: z.string(),
            fileType: z.nativeEnum(CoachQualifications_fileType),
            fileName: z.string().nullable()
          })
        ),
        batches: z.array(z.number())
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
          centerId,
          sports,
          coachQualifications,
          batches
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
            centerId,
            CoachCentersBatches: {
              create: batches.map((batchId) => ({
                batchId,
                centerId,
                status: 1,
                createdAt,
                updatedAt,
              })),
            },
            CoachSportsMaps: {
              create: sports.map((sportId) => ({
                createdAt,
                updatedAt,
                Sports: { connect: { id: sportId } },
              })),
            },
            CoachQualifications: {
              create: coachQualifications.map(
                ({ startDate, endDate, certificateType, fileUrl, instituteName, fileType, fileName }) => ({
                  startDate,
                  endDate,
                  certificateType,
                  fileUrl,
                  instituteName,
                  fileType,
                  fileName,
                  createdAt,
                  updatedAt,
                })
              ),

            }

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
        experienceLevel: z.enum(EXPERIENCE_LEVEL),
        trainingLevel: z.enum(TRAINING_LEVEL),
        updatedAt: z.date(),
        academyId: z.number(),
        image: z.string().optional(),
        coachId: z.number(),
        createdAt: z.date(),
        coachQualifications: z.array(
          z.object({
            certificateType: z.nativeEnum(CoachQualifications_certificateType),
            startDate: z.date(),
            endDate: z.date(),
            fileUrl: z.string(),
            instituteName: z.string(),
            fileType: z.nativeEnum(CoachQualifications_fileType),
            fileName: z.string().nullable()
          })
        ),
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
          experienceLevel,
          updatedAt,
          academyId,
          image,
          coachId,
          coachQualifications,
          createdAt,
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
            experienceLevel: experienceLevel,
            updatedAt,
            academyId,
            image,
            CoachQualifications: coachQualifications && coachQualifications.length > 0
              ? {
                create: coachQualifications.map(
                  ({ startDate, endDate, certificateType, fileUrl, instituteName, fileType, fileName }) => ({
                    startDate,
                    endDate,
                    certificateType,
                    fileUrl,
                    instituteName,
                    fileType,
                    fileName,
                    createdAt,
                    updatedAt,
                  })
                ),
              }
              : undefined,
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
