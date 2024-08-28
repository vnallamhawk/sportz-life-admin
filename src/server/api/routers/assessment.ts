import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { TRAINING_LEVEL } from "~/types/coach";
import {
  ASSESSMENT_MODE,
  ASSESSMENT_INTERVAL,
  ASSESSMENT_STATUS,
} from "~/types/assessment";

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
  const testBanksToSave = testBanks.map((id: number) => ({
    testBankId: id,
    assessmentId,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));

  await ctx.prisma.assignedTestBanks.createMany({
    data: testBanksToSave,
    skipDuplicates: true,
  });
  // end of saving assessment test banks

  // start of saving assessment athletes
  const athletesToSave = participants.map((item: any) => ({
    athleteId: item.athleteId,
    assessmentId,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));

  await ctx.prisma.assessmentAssignedAthletes.createMany({
    data: athletesToSave,
    skipDuplicates: true,
  });
  // end of saving assessment athletes

  // start of saving assessment batches
  const batchesToSave = participants.map((item: any) => ({
    batchId: item.batchId,
    assessmentId,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));

  await ctx.prisma.assessmentBatches.createMany({
    data: batchesToSave,
    skipDuplicates: true,
  });
  // end of saving assessment batches

  // start of saving assessment centers
  const centersToSave = participants.map((item: any) => ({
    centerId: item.centerId,
    assessmentId,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));

  await ctx.prisma.assessmentCenters.createMany({
    data: centersToSave,
    skipDuplicates: true,
  });
  // end of saving assessment centers

  // start of saving assessment sports
  const sportsToSave = participants.map((item: any) => ({
    sportId: item.sportId,
    assessmentId,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));

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
  await ctx.prisma.assignedTestBanks.deleteMany({
    where: {
      assessmentId,
    },
  });

  await ctx.prisma.assessmentAssignedAthletes.deleteMany({
    where: {
      assessmentId,
    },
  });

  await ctx.prisma.assessmentBatches.deleteMany({
    where: {
      assessmentId,
    },
  });

  await ctx.prisma.assessmentCenters.deleteMany({
    where: {
      assessmentId,
    },
  });

  await ctx.prisma.assessmentSports.deleteMany({
    where: {
      assessmentId,
    },
  });

  await ctx.prisma.assessmentAssignedCoaches.deleteMany({
    where: {
      assessmentId,
    },
  });

  await ctx.prisma.assessmentResults.deleteMany({
    where: {
      assessmentId,
    },
  });
}

export const assessmentRouter = createTRPCRouter({
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
          listQuery.where.name = val;
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
          listQuery.where.AssessmentSports = val;
          countQuery.where.AssessmentSports = val;
        }
        if (levels?.length) {
          const val = {
            in: levels,
          };
          listQuery.where.level = val;
          countQuery.where.level = val;
        }
        if (assessmentStatuses?.length) {
          const val = {
            in: assessmentStatuses,
          };
          listQuery.where.assessmentStatus = val;
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
      } catch (error) {}
    }),
  createAssessment: publicProcedure
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
        centerId: z.number(), // discussion
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
          centerId, // discussion
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
            centerId, // discussion
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
          centerId, // discussion
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
            centerId, // discussion
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
});
