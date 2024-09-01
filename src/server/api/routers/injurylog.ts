import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import {
  INJURY_LOG_BODY_PART,
  INJURY_LOG_BODY_PART_NAME,
  INJURY_LOG_ACTIVITY_TYPE,
  INJURY_LOG_INJURY_TYPE,
  INJURY_LOG_RECOVERY_TIME,
} from "~/types/injuryLog";

async function createInjuryLogChilds({ ctx, images, injuryLogId }: any) {
  if (!injuryLogId) {
    return;
  }
  const imagesToSave = images.map((url: string) => ({
    injuryId: injuryLogId,
    image: url,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));

  await ctx.prisma.injuryImages.createMany({
    data: imagesToSave,
    skipDuplicates: true,
  });
}

async function deleteInjuryLogChilds({ ctx, injuryLogId }: any) {
  if (!injuryLogId) {
    return;
  }
  await ctx.prisma.injuryImages.deleteMany({
    where: {
      injuryId: injuryLogId,
    },
  });
}

export const injuryLogRouter = createTRPCRouter({
  getAllInjuryLogs: publicProcedure
    .input(
      z.object({
        page: z.number().default(1),
        limit: z.number().default(10),
        search: z.string().optional(),
        injuryTypes: z.array(z.string()).optional(),
        statuses: z.array(z.string()).optional(),
      })
    )
    .query(({ ctx, input: { page, limit, search, injuryTypes, statuses } }) => {
      const listQuery: any = {
        skip: (page - 1) * limit,
        take: limit,
        where: {},
        include: {
          InjuryImages: true,
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
        listQuery.where.description = val;
        countQuery.where.description = val;
      }
      if (injuryTypes?.length) {
        const val = {
          in: injuryTypes,
        };
        listQuery.where.injuryType = val;
        countQuery.where.injuryType = val;
      }
      if (statuses?.length) {
        const val = {
          in: statuses,
        };
        listQuery.where.status = val;
        countQuery.where.status = val;
      }

      return Promise.all([
        // Query the database for total items
        ctx.prisma.injuryLogs.count(countQuery),

        // Query the database for paginated items
        ctx.prisma.injuryLogs.findMany(listQuery),
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
    }),
  getInjuryLogById: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(async (opts) => {
      try {
        const injuryLogs = await opts.ctx?.prisma?.injuryLogs?.findUnique({
          where: {
            id: opts.input.id,
          },
          include: {
            InjuryImages: true,
          },
        });

        return injuryLogs;
      } catch (error) {}
    }),
  createInjuryLog: publicProcedure
    .input(
      z.object({
        athleteId: z.number().optional(), // discussion - need to make optional
        description: z.string().optional(),
        bodyPart: z.enum(INJURY_LOG_BODY_PART),
        bodyPartName: z.enum(INJURY_LOG_BODY_PART_NAME),
        injuryDate: z.date(),
        injuryTime: z.date(),
        activityType: z.enum(INJURY_LOG_ACTIVITY_TYPE),
        injuryType: z.enum(INJURY_LOG_INJURY_TYPE),
        recoveryTime: z.enum(INJURY_LOG_RECOVERY_TIME),
        isAidDone: z.boolean(),
        medicalReport: z.string().optional(),
        status: z.string(),
        createdAt: z.date(),
        updatedAt: z.date(),
        coachId: z.number().optional(),
        images: z.array(z.string()),
      })
    )
    .mutation(
      async ({
        input: {
          athleteId, // discussion - need to make optional
          description,
          bodyPart,
          bodyPartName,
          injuryDate,
          injuryTime,
          activityType,
          injuryType,
          recoveryTime,
          isAidDone,
          medicalReport,
          status,
          createdAt,
          updatedAt,
          coachId,
          images,
        },
        ctx,
      }) => {
        const dataToSave: { [key: string]: any } = {
          bodyPart,
          bodyPartName,
          injuryDate,
          injuryTime,
          activityType,
          injuryType,
          recoveryTime,
          isAidDone,
          status,
          createdAt,
          updatedAt,
        };
        // discussion - need to make optional
        if (athleteId) {
          // discussion - need to make optional
          dataToSave.athleteId = athleteId;
        }
        if (description) {
          dataToSave.description = description;
        }
        if (medicalReport) {
          dataToSave.medicalReport = medicalReport;
        }
        if (coachId) {
          dataToSave.coachId = coachId;
        }
        const injuryLog = await ctx.prisma.injuryLog.create({
          data: dataToSave,
        });

        await createInjuryLogChilds({
          ctx,
          images,
          injuryLogId: injuryLog.id,
        });

        return injuryLog;
      }
    ),
  editInjuryLog: publicProcedure
    .input(
      z.object({
        injuryLogId: z.number(),
        athleteId: z.number().optional(), // discussion - need to make optional
        description: z.string().optional(),
        bodyPart: z.enum(INJURY_LOG_BODY_PART),
        bodyPartName: z.enum(INJURY_LOG_BODY_PART_NAME),
        injuryDate: z.date(),
        injuryTime: z.date(),
        activityType: z.enum(INJURY_LOG_ACTIVITY_TYPE),
        injuryType: z.enum(INJURY_LOG_INJURY_TYPE),
        recoveryTime: z.enum(INJURY_LOG_RECOVERY_TIME),
        isAidDone: z.boolean(),
        medicalReport: z.string().optional(),
        status: z.string(),
        createdAt: z.date(),
        updatedAt: z.date(),
        coachId: z.number().optional(),
        images: z.array(z.string()),
      })
    )
    .mutation(
      async ({
        input: {
          injuryLogId,
          athleteId, // discussion - need to make optional
          description,
          bodyPart,
          bodyPartName,
          injuryDate,
          injuryTime,
          activityType,
          injuryType,
          recoveryTime,
          isAidDone,
          medicalReport,
          status,
          createdAt,
          updatedAt,
          coachId,
          images,
        },
        ctx,
      }) => {
        const dataToSave: { [key: string]: any } = {
          bodyPart,
          bodyPartName,
          injuryDate,
          injuryTime,
          activityType,
          injuryType,
          recoveryTime,
          isAidDone,
          status,
          createdAt,
          updatedAt,
        };
        // discussion - need to make optional
        if (athleteId) {
          // discussion - need to make optional
          dataToSave.athleteId = athleteId;
        }
        if (description) {
          dataToSave.description = description;
        }
        if (medicalReport) {
          dataToSave.medicalReport = medicalReport;
        }
        if (coachId) {
          dataToSave.coachId = coachId;
        }
        const response = await ctx.prisma.injuryLogs.update({
          where: {
            id: injuryLogId,
          },
          data: dataToSave,
        });

        await deleteInjuryLogChilds({
          ctx,
          injuryLogId,
        });

        await createInjuryLogChilds({
          ctx,
          images,
          injuryLogId,
        });

        return response;
      }
    ),
  deleteInjuryLog: publicProcedure
    .input(
      z.object({
        injuryLogId: z.number(),
      })
    )
    .mutation(async ({ input: { injuryLogId }, ctx }) => {
      const response = await ctx.prisma.injuryLogs.delete({
        where: {
          id: injuryLogId,
        },
      });

      await deleteInjuryLogChilds({
        ctx,
        injuryLogId,
      });

      return response;
    }),
});
