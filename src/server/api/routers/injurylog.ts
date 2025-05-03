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
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  const imagesToSave = images.map((url: string) => ({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    injuryId: injuryLogId,
    image: url,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  await ctx.prisma.injuryImages.createMany({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    data: imagesToSave,
    skipDuplicates: true,
  });
}

async function deleteInjuryLogChilds({ ctx, injuryLogId }: any) {
  if (!injuryLogId) {
    return;
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  await ctx.prisma.injuryImages.deleteMany({
    where: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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
        type:z.string().optional()
      })
    )
    .query(({ ctx, input: { page, limit, search, injuryTypes, statuses ,type} }) => {
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
      if(type ){
        if(type==="athlete"){
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          listQuery.where={
            athleteId:{
              not:null
            }
          }
        }else{
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          listQuery.where={
            coachId:{
              not:null
            }
          }
        }
      }
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
      if (injuryTypes?.length) {
        const val = {
          in: injuryTypes,
        };
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        listQuery.where.injuryType = val;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        countQuery.where.injuryType = val;
      }
      if (statuses?.length) {
        const val = {
          in: statuses,
        };
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        listQuery.where.status = val;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        countQuery.where.status = val;
      }

      return Promise.all([
        // Query the database for total items
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        ctx.prisma.injuryLogs.count(countQuery),

        // Query the database for paginated items
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
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
      } catch (error) {
        console.error(error)
      }
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
          coachId,
          images,
        },
        ctx,
      }) => {
        const dataToSave:any = {
          bodyPart,
          bodyPartName,
          injuryDate,
          injuryTime,
          activityType,
          injuryType,
          recoveryTime,
          isAidDone,
          status,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        // discussion - need to make optional
        if (athleteId) {
          // discussion - need to make optional
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          dataToSave.athleteId = athleteId;
        }
        if (description) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          dataToSave.description = description;
        }
        if (medicalReport) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          dataToSave.medicalReport = medicalReport;
        }
        if (coachId) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          dataToSave.coachId = coachId;
        }
        const injuryLog = await ctx.prisma.injuryLogs.create({
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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
          updatedAt: new Date(),
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
