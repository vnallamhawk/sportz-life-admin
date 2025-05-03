/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { TRAINING_LEVEL } from "~/types/coach";
import {
  ASSESSMENT_MODE,
  ASSESSMENT_INTERVAL,
  ASSESSMENT_STATUS,
} from "~/types/assessment";
import type { AssessmentAssignedAthletes, AssessmentBatches, AssessmentCenters, AssessmentSports } from "@prisma/client";

async function createAssessmentChilds({
  ctx,
  testBanks,
  assessmentId,
  participants,
}: any) {
  if (!assessmentId) {
    return;
  }
  // start of saving assessment test banks
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  const testBanksToSave = testBanks.map((id: number) => ({
    testBankId: id,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    assessmentId,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  await ctx.prisma.assignedTestBanks.createMany({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    data: testBanksToSave,
    skipDuplicates: true,
  });
  // end of saving assessment test banks

  // start of saving assessment athletes
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const athletesToSave: AssessmentAssignedAthletes[] = participants.map((item: AssessmentAssignedAthletes) => ({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    athleteId: item.athleteId,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    assessmentId,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  await ctx.prisma.assessmentAssignedAthletes.createMany({
    data: athletesToSave,
    skipDuplicates: true,
  });
  // end of saving assessment athletes

  // start of saving assessment batches
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
  const batchesToSave: AssessmentBatches[] = participants.map((item: AssessmentBatches) => ({
    batchId: item.batchId,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    assessmentId,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  await ctx.prisma.assessmentBatches.createMany({
    data: batchesToSave,
    skipDuplicates: true,
  });
  // end of saving assessment batches

  // start of saving assessment centers
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
  const centersToSave: AssessmentCenters[] = participants.map((item: AssessmentCenters) => ({
    centerId: item.centerId,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    assessmentId,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  await ctx.prisma.assessmentCenters.createMany({
    data: centersToSave,
    skipDuplicates: true,
  });
  // end of saving assessment centers

  // start of saving assessment sports
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
  const sportsToSave: AssessmentSports[] = participants.map((item: AssessmentSports) => ({
    sportId: item.sportId,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    assessmentId,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  await ctx.prisma.assessmentSports.createMany({
    data: sportsToSave,
    skipDuplicates: true,
  });
  // end of saving assessment sports
}

async function deleteAssessmentChilds({ ctx, assessmentId }: any) {
  if (!assessmentId) {
    return;
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  await ctx.prisma.assignedTestBanks.deleteMany({
    where: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      assessmentId,
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  await ctx.prisma.assessmentAssignedAthletes.deleteMany({
    where: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      assessmentId,
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  await ctx.prisma.assessmentBatches.deleteMany({
    where: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      assessmentId,
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  await ctx.prisma.assessmentCenters.deleteMany({
    where: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      assessmentId,
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  await ctx.prisma.assessmentSports.deleteMany({
    where: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      assessmentId,
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  await ctx.prisma.assessmentAssignedCoaches.deleteMany({
    where: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      assessmentId,
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  await ctx.prisma.assessmentResults.deleteMany({
    where: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      assessmentId,
    },
  });
}

export const assessmentRouter = createTRPCRouter({
  getAllAssessmentsWithPagination: publicProcedure
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
      const [assessments, total] = await Promise.all([
        ctx.prisma.assessments.findMany({
          skip,
          take: limit,
          include: {
            AssessmentAssignedAthletes: true,
            AssessmentAssignedCoaches: true,
            AssessmentBatches: true,
            AssessmentCenters: {
              include: {
                AssessmentCenterBatches: true,
                AssessmentCenterSports: true,
                Centers: true,
              },
            },
            AssessmentResults: true,
            AssessmentSports: true,
            Academies: true,
            Sports: true,
            AssignedTestBanks: true,
          },
          orderBy: {
            createdAt: sortOrder, // Sort by createdAt (ascending or descending)
          },
        }),
        ctx.prisma.assessments.count({
        }),
      ]);

      return {
        data: assessments,
        total,
        page,
        totalPages: Math.ceil(total / limit),
      };
    }),

  getAllAssessments: publicProcedure
    .input(
      z.object({
        page: z.number().default(1),
        limit: z.number().default(10),
        sports: z.array(z.number()).optional(),
        search: z.string().optional(),
        levels: z.array(z.string()).optional(),
        assessmentStatuses: z.array(z.string()).optional(),
      })
    )
    .query(
      ({
        ctx,
        input: { page, limit, sports, search, levels, assessmentStatuses },
      }) => {
        const listQuery: any = {
          skip: (page - 1) * limit,
          take: limit,
          where: {},
          include: {
            AssessmentSports: {
              include: {
                Sports: true,
              },
            },
          },
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
          listQuery.where.name = val;
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          countQuery.where.name = val;
        }
        if (sports?.length) {
          const val = {
            some: {
              sportId: {
                in: sports, // Filter by list of sport IDs
              },
            },
          };
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          listQuery.where.AssessmentSports = val;
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          countQuery.where.AssessmentSports = val;
        }
        if (levels?.length) {
          const val = {
            in: levels,
          };
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          listQuery.where.level = val;
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          countQuery.where.level = val;
        }
        if (assessmentStatuses?.length) {
          const val = {
            in: assessmentStatuses,
          };
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          listQuery.where.assessmentStatus = val;
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          countQuery.where.assessmentStatus = val;
        }

        return Promise.all([
          // Query the database for total items
          ctx.prisma.assessments.count(countQuery),

          // Query the database for paginated items
          ctx.prisma.assessments.findMany(listQuery),
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
  getAssessmentById: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(async (opts) => {
      try {
        const assessments = await opts.ctx?.prisma?.assessments?.findUnique({
          where: {
            id: opts.input.id,
          },
          include: {
            AssessmentSports: true,
            AssessmentAssignedAthletes: true,
            AssessmentAssignedCoaches: true,
            AssessmentBatches: true,
            AssessmentCenters: true,
            AssessmentResults: true,
            AssignedTestBanks: true,
          },
        });

        return assessments;
      } catch (error) {
        console.error(error)
       }
    }),
  createAssessmentByChild: publicProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        sportId: z.number(),
        academyId: z.number(),
        level: z.enum(TRAINING_LEVEL),
        testBanks: z.array(z.number()),
        isAthleteAssess: z.boolean(),
        isCoachAssess: z.boolean(),
        isStrengthAdded: z.boolean(),
        isWeaknessAdded: z.boolean(),
        isCommentsAdded: z.boolean(),
        mode: z.enum(ASSESSMENT_MODE),
        interval: z.enum(ASSESSMENT_INTERVAL),
        startDate: z.date(),
        endDate: z.date(),
        participants: z.array(
          z.object({
            centerId: z.number(),
            sportId: z.number(),
            batchId: z.number(),
            athleteId: z.number(),
          })
        ),
        // centerId: z.number(), // discussion
        assessmentStatus: z.enum(ASSESSMENT_STATUS), // discussion
        status: z.boolean(), // discussion
      })
    )
    .mutation(
      async ({
        input: {
          name,
          description,
          sportId,
          academyId,
          level,
          testBanks,
          isAthleteAssess,
          isCoachAssess,
          isStrengthAdded,
          isWeaknessAdded,
          isCommentsAdded,
          mode,
          interval,
          startDate,
          endDate,
          participants,
          // centerId, // discussion
          assessmentStatus, // discussion
          status, // discussion
        },
        ctx,
      }) => {
        const assessment = await ctx.prisma.assessments.create({
          data: {
            name,
            description,
            academyId,
            sportId,
            level,
            isAthleteAssess,
            isCoachAssess,
            isStrengthAdded,
            isWeaknessAdded,
            isCommentsAdded,
            mode,
            interval,
            startDate,
            endDate,
            createdAt: new Date(),
            updatedAt: new Date(),
            assessmentTime: new Date(),
            // centerId, // discussion
            assessmentStatus, // discussion
            status, // discussion
          },
        });

        await createAssessmentChilds({
          ctx,
          testBanks,
          assessmentId: assessment.id,
          participants,
        });

        return assessment;
      }
    ),
  editAssessment: publicProcedure
    .input(
      z.object({
        assessmentId: z.number(),
        name: z.string(),
        description: z.string(),
        sportId: z.number(),
        academyId: z.number(),
        level: z.enum(TRAINING_LEVEL),
        testBanks: z.array(z.number()),
        isAthleteAssess: z.boolean(),
        isCoachAssess: z.boolean(),
        isStrengthAdded: z.boolean(),
        isWeaknessAdded: z.boolean(),
        isCommentsAdded: z.boolean(),
        mode: z.enum(ASSESSMENT_MODE),
        interval: z.enum(ASSESSMENT_INTERVAL),
        startDate: z.date(),
        endDate: z.date(),
        participants: z.array(
          z.object({
            centerId: z.number(),
            sportId: z.number(),
            batchId: z.number(),
            athleteId: z.number(),
          })
        ),
        centerId: z.number(), // discussion
        assessmentStatus: z.enum(ASSESSMENT_STATUS), // discussion
        status: z.boolean(), // discussion
      })
    )
    .mutation(
      async ({
        input: {
          assessmentId,
          name,
          description,
          sportId,
          academyId,
          level,
          testBanks,
          isAthleteAssess,
          isCoachAssess,
          isStrengthAdded,
          isWeaknessAdded,
          isCommentsAdded,
          mode,
          interval,
          startDate,
          endDate,
          participants,
          // centerId, // discussion
          assessmentStatus, // discussion
          status, // discussion
        },
        ctx,
      }) => {
        const response = await ctx.prisma.assessments.update({
          where: {
            id: assessmentId,
          },
          data: {
            name,
            description,
            academyId,
            sportId,
            level,
            isAthleteAssess,
            isCoachAssess,
            isStrengthAdded,
            isWeaknessAdded,
            isCommentsAdded,
            mode,
            interval,
            startDate,
            endDate,
            updatedAt: new Date(),
            // centerId, // discussion
            assessmentStatus, // discussion
            status, // discussion
          },
        });

        await deleteAssessmentChilds({
          ctx,
          assessmentId,
        });

        await createAssessmentChilds({
          ctx,
          testBanks,
          assessmentId,
          participants,
        });

        return response;
      }
    ),
  deleteAssessment: publicProcedure
    .input(
      z.object({
        assessmentId: z.number(),
      })
    )
    .mutation(async ({ input: { assessmentId }, ctx }) => {
      const response = await ctx.prisma.assessments.delete({
        where: {
          id: assessmentId,
        },
      });

      await deleteAssessmentChilds({
        ctx,
        assessmentId,
      });

      return response;
    }),

  createAssessment: publicProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        academyId: z.number(),
        sportId: z.number(),
        startDate: z.date(),
        endDate: z.date(),
        level: z.enum(TRAINING_LEVEL),
        mode: z.enum(ASSESSMENT_MODE),
        interval: z.enum(ASSESSMENT_INTERVAL),
        assessmentStatus: z.enum(ASSESSMENT_STATUS),
      })
    )
    .mutation(
      async ({
        input: {
          name,
          description,
          academyId,
          sportId,
          startDate,
          endDate,
          level,
          mode,
          interval,
          assessmentStatus
        },
        ctx,
      }) => {
        const response = await ctx.prisma.assessments.create({
          data: {
            name: name,
            description: description,
            academyId: academyId,
            sportId: sportId,
            startDate: startDate,
            endDate: endDate,
            level: level,
            mode: mode,
            interval: interval,
            assessmentStatus: assessmentStatus,
            status: true,
            createdAt: new Date(),
            updatedAt: new Date(),
            assessmentTime: new Date()
          },
        });
        return response;
      }
    ),
});
