import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  // protectedProcedure,
} from "~/server/api/trpc";
import { GENDER_VALUES } from "~/types/coach";

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
        CoachesOnBatches: true,
      },
    });
    return allCoaches;
  }),
  createCoach: publicProcedure
    .input(
      z.object({
        name: z.string(),
        contactNumber: z.string(),
        emailAddress: z.string(),
        designation: z.string(),
        gender: z.enum(GENDER_VALUES),
        certificates: certificatesSchema,
        dateOfBirth: z.date(),
        sports: coachingSportsSchema,
      })
    )
    .mutation(
      async ({
        input: {
          name,
          contactNumber,
          emailAddress,
          designation,
          gender,
          certificates,
          dateOfBirth,
          sports,
        },
        ctx,
      }) => {
        const sportsId = sports.map(({ value }) => value);
        const response = await ctx.prisma.coach.create({
          data: {
            name: name,
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
            dateOfBirth: dateOfBirth,
          },
        });
        return response;
      }
    ),

  // getSecretMessage: protectedProcedure.query(() => {
  //   return "you can now see this secret message!";
  // }),
});
