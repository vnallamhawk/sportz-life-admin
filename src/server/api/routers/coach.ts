import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  // protectedProcedure,
} from "~/server/api/trpc";

const certificatesSchema = z.array(
  z.object({
    instituteName: z.string(),
    name: z.string(),
  })
);

// Now add this object into an array

const genderValues = ["MALE", "FEMALE"] as const;
export const coachRouter = createTRPCRouter({
  getAllCoaches: publicProcedure.query(({ ctx }) => {
    const allCoaches = ctx?.prisma?.coach?.findMany({
      include: {
        batch: true,
        sports: true,
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
        gender: z.enum(genderValues),
        certificates: certificatesSchema,
        dateOfBirth: z.date(),
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
        },
        ctx,
      }) => {
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
