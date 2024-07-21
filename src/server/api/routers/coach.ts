import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  // protectedProcedure,
} from "~/server/api/trpc";
import { EXPERIENCE_LEVEL, GENDER_VALUES, TRAINING_LEVEL } from "~/types/coach";

const certificatesSchema = z.array(
  z.object({
    instituteName: z.string(),
    name: z.string(),
    startDate: z.date(),
    endDate: z.date(),
  })
);

const coachingSportsSchema = z.array(
  z.object({
    label: z.string(),
    value: z.union([z.string(), z.number()]),
  })
);

// Now add this object into an array

export const coachRouter = createTRPCRouter({
  getAllCoaches: publicProcedure.query(({ ctx }) => {
    const allCoaches = ctx?.prisma.coaches?.findMany({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      where:{
        deletedAt:null,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        createdBy:ctx?.session?.token?.id
      },
    });
    return allCoaches;
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
            // CoachSportsMaps: true,
            // batches: true,
            // centers: true,
            // certificates: true,
          },
        });

        return coaches;
      } catch (error) {
        console.log("error are ", error);
      }
    }),
  getCoachesByName: publicProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .query(async (opts) => {
      const coaches = await opts.ctx?.prisma?.coaches?.findMany({
        where: {
          name: {
            contains: opts.input.name,
          },
        },
        include: {
          CoachSportsMaps: true,
          Centers: true,
          Batches: true,
          // sports: true,
          // batches: true,
          // centers: true,
        },
      });

      return coaches;
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
        createdBy:z.number()

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
          createdBy
        },
        ctx,
      }) => {

        const response = await ctx.prisma.coaches.create({
          data: {
            name: name,
             phone: phone,
            email: email,
            designation: designation,
            gender: gender.toLowerCase(),            
            dateOfBirth: dateOfBirth,
            trainingLevel: trainingLevel.toLowerCase(),
            createdBy
          },
        });
        return response;
      }
    ),
  editCoach: publicProcedure
    .input(
      z.object({
        name: z.string(),
        about: z.string(),
        contactNumber: z.string(),
        email: z.string(),
        designation: z.string(),
        gender: z.enum(GENDER_VALUES),
        certificates: certificatesSchema,
        dateOfBirth: z.date(),
        sports: coachingSportsSchema,
        trainingLevel: z.enum(TRAINING_LEVEL),
        experienceLevel: z.enum(EXPERIENCE_LEVEL),
        batchIds: z.array(z.number()),
        centerIds: z.array(z.number()),
        coachId: z.number(),
      })
    )
    .mutation(
      async ({
        input: {
          name,
          about,
          contactNumber,
          email,
          designation,
          gender,
          certificates,
          dateOfBirth,
          // sports,
          trainingLevel,
          experienceLevel,
          // batchIds,
          // centerIds,
          coachId,
        },
        ctx,
      }) => {
        const sportsId = sports.map(({ value }) => value);
        //eslint-disable-next-line no-console
        const response = await ctx.prisma.coaches.update({
          where: {
            id: coachId,
          },
          data: {
            name: name,
            about: about,
            contactNumber: contactNumber,
            email: email,
            designation: designation,
            gender: gender.toLowerCase(),
            // certificates: {
            //   create: certificates,
            // },
            // sports: {
            //   create: sportsId.map((id) => ({
            //     sport: {
            //       connect: {
            //         id: Number(id),
            //       },
            //     },
            //   })),
            // },
            // centers: {
            //   create: centerIds.map((id) => ({
            //     center: {
            //       connect: {
            //         id: Number(id),
            //       },
            //     },
            //   })),
            // },
            // batches: {
            //   create: batchIds.map((id) => ({
            //     batch: {
            //       connect: {
            //         id: Number(id),
            //       },
            //     },
            //   })),
            // },
            dateOfBirth: dateOfBirth,
            trainingLevel: "advanced",
            experienceLevel: "two_five",
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
