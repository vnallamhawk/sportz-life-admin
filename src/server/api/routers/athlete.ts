import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  // protectedProcedure,
} from "~/server/api/trpc";
import { BLOOD_GROUPS, EXPERIENCE_LEVEL, GENDER_VALUES, TRAINING_LEVEL } from "~/types/coach";

// Now add this object into an array


export const athleteRouter = createTRPCRouter({
  getAllAthletes: publicProcedure.query(({ ctx }) => {
    const allAthletes = ctx?.prisma.athletes?.findMany({
      where: {
        deletedAt: null,
      },
    });
    return allAthletes;
  }),
  getAthleteById: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(async (opts) => {
      try {
        const athletes = await opts.ctx?.prisma?.athletes?.findUnique({
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

        return athletes;
      } catch (error) {}
    }),
  getAthleteByName: publicProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .query(async (opts) => {
      const athletes = await opts.ctx?.prisma?.athletes?.findMany({
        where: {
          name: {
            contains: opts.input.name,
          },
        },
        include: {
          Centers: true,
        },
      });

      return athletes;
    }),
  createAthlete: publicProcedure
    .input(
      z.object({
        name: z.string(),
        phone: z.string(),
        email: z.string(),
        bloodGroup: z.enum(BLOOD_GROUPS),
        gender: z.enum(GENDER_VALUES),
        dob: z.date(),
        height: z.number(),
        weight: z.number(),
        address:z.string(),
        centerId: z.number(),
        medicalHistory:z.array(z.object({message:z.string()})),
        fatherName:z.string()
      })
    )
    .mutation(
      async ({
        input: {
          name,
          phone,
          email,
          bloodGroup,
          gender,
          dob,
          height,
          weight,
          centerId,
          medicalHistory,
          address,
          fatherName
        },
        ctx,
      }) => {
        const response = await ctx.prisma.athletes.create({
          data: {
            name: name,
            phone: phone,
            email: email,
            bloodGroup: bloodGroup,
            gender: gender,
            height:height,
            weight:weight,
            medicalHistory,
            centerId: centerId,
            dob: dob,
            address,
            fatherName
          },
        });
        return response;
      }
    ),
  editAthlete: publicProcedure
    .input(
      z.object({
        name: z.string(),
        about: z.string(),
        contactNumber: z.string(),
        email: z.string(),
        designation: z.string(),
        gender: z.enum(GENDER_VALUES),
        dateOfBirth: z.date(),
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
          // certificates,
          dateOfBirth,
          // sports,
          // batchIds,
          // centerIds,
          coachId,
        },
        ctx,
      }) => {
        // const sportsId = sports.map(({ value }:{value:any}) => value);
        //eslint-disable-next-line no-console
        const response = await ctx.prisma.athletes.update({
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
  deleteAthlete: publicProcedure
    .input(
      z.object({
        athleteId: z.number(),
        deletedAt: z.string(),
      })
    )
    .mutation(async ({ input: { athleteId, deletedAt }, ctx }) => {
      const response = await ctx.prisma.athletes.update({
        where: {
          id: athleteId,
        },
        data: {
          deletedAt,
        },
      });

      return response;
    }),
  // getSecretMessage: protectedProcedure.query(() => {
  //   return "you can now see this secret message!";
  // }),
});
