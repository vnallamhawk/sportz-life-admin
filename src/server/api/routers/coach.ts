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
  })
);

const coachingSportsSchema = z.array(
  z.object({
    label: z.string(),
    value: z.string(),
  })
);

// Now add this object into an array

export const coachRouter = createTRPCRouter({
  getAllCoaches: publicProcedure.query(({ ctx }) => {
    const allCoaches = ctx?.prisma?.coach?.findMany({
      include: {
        sports: true,
        batches: true,
        centers: true,
      },
    });
    return allCoaches;
  }),
  getCoachesByName: publicProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .query(async (opts) => {
      const coaches = await opts.ctx?.prisma?.coach?.findMany({
        where: {
          name: {
            contains: opts.input.name,
          },
        },
        include: {
          sports: true,
          batches: true,
          centers: true,
        },
      });

      return coaches;
    }),
  createCoach: publicProcedure
    .input(
      z.object({
        name: z.string(),
        about: z.string(),
        contactNumber: z.string(),
        emailAddress: z.string(),
        designation: z.string(),
        gender: z.enum(GENDER_VALUES),
        certificates: certificatesSchema,
        dateOfBirth: z.date(),
        sports: coachingSportsSchema,
        trainingLevel: z.enum(TRAINING_LEVEL),
        experienceLevel: z.enum(EXPERIENCE_LEVEL),
        batchIds: z.array(z.number()),
      })
    )
    .mutation(
      async ({
        input: {
          name,
          about,
          contactNumber,
          emailAddress,
          designation,
          gender,
          certificates,
          dateOfBirth,
          sports,
          trainingLevel,
          experienceLevel,
          batchIds,
        },
        ctx,
      }) => {
        const sportsId = sports.map(({ value }) => value);
        const response = await ctx.prisma.coach.create({
          data: {
            name: name,
            about: about,
            contactNumber: contactNumber,
            email: emailAddress,
            designation: designation,
            gender: gender,
            certificates: {
              create: certificates,
            },
            sports: {
              create: sportsId.map((id) => ({
                sport: {
                  connect: {
                    id: Number(id),
                  },
                },
              })),
            },
            batches: {
              create: batchIds.map((id) => ({
                batch: {
                  connect: {
                    id: Number(id),
                  },
                },
              })),
            },
            dateOfBirth: dateOfBirth,
            trainingLevel: trainingLevel,
            experienceLevel: experienceLevel,
          },
        });
        return response;
      }
    ),

  // getSecretMessage: protectedProcedure.query(() => {
  //   return "you can now see this secret message!";
  // }),
});
